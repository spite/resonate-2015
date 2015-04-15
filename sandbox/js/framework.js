/*

	Effect

*/

function Effect() {

}

Effect.prototype.init = function() {

	console.log( 'init' );

}

Effect.prototype.update = function() {

}

Effect.prototype.render = function() {

}

Effect.prototype.resize = function( width, height ) {

}

/*

	Sound analyser and reactive component
	
*/

window.AudioContext = ( window.AudioContext 
							|| window.webkitAudioContext 
							|| window.mozAudioContext
							|| window.msAudioContext );

navigator.getUserMedia = ( navigator.getUserMedia
                           || navigator.webkitGetUserMedia 
                           || navigator.mozGetUserMedia 
                           || navigator.msGetUserMedia );

function ReactiveSound( settings ) {

	this.context = new AudioContext(), 

	this.analyser = this.context.createAnalyser(), 
	this.analyser.smoothingTimeConstant = 0;
	this.analyser.fftSize = 512;

	this.frequencyData = new Float32Array( .5 * this.analyser.fftSize );

	this.settings = settings;
	this.easing = .1;

	if( this.settings.microphone ) this.connectToMicrophone();
	if( this.settings.track ) this.loadAudioTrack( this.settings.track );

}

ReactiveSound.prototype.connectToMicrophone = function() {

	function onMediaStream( stream ) {
		var r = this.context.createMediaStreamSource( stream );
		r.connect( this.analyser );
	};

	navigator.getUserMedia( 
		{ audio: true }, 
		onMediaStream.bind( this ), 
		function( err ) { console.log( 'getUserMedia error: ' + err ) } 
	);

}

ReactiveSound.prototype.loadAudioTrack = function( file ) {

	var a = new Audio();
	var ext = '';
	if( ( a.canPlayType && a.canPlayType( 'audio/ogg; codecs="vorbis"' ).replace( /no/, '' ) ) ) ext = 'ogg';
	if( ( a.canPlayType && a.canPlayType( 'audio/mpeg;' ).replace( /no/, '') ) ) ext = 'mp3';

	var processData = function( buffer ) {

		this.context.decodeAudioData( buffer,
				
			function( buffer ) {

				var source = this.context.createBufferSource();
				source.connect( this.analyser );
				source.loop = true;
				source.buffer = buffer;
				source.start( 1 );
				
				this.analyser.connect( this.context.destination );

			}.bind( this ),

			function() {
				console.log( 'Unable to decode audio data' );
			}

		);

	}.bind( this );

	var oReq = new XMLHttpRequest();
	oReq.open( 'GET', file + '.' + ext, true);
	oReq.responseType = 'arraybuffer';
	oReq.onload = function (oEvent) {

		var arrayBuffer = oReq.response;
		if( arrayBuffer ){
			processData( arrayBuffer );
		}

	};
	oReq.send(null);

}

ReactiveSound.prototype.update = function() {

	var freqByteData = new Uint8Array( this.analyser.frequencyBinCount );
	this.analyser.getByteFrequencyData( freqByteData );
	
	for( var j = 0; j < freqByteData.length; j++ ) {
		this.frequencyData[ j ] += ( freqByteData[ j ] - this.frequencyData[ j ] ) * this.easing;
	}
}

ReactiveSound.prototype.getFreqRange = function( from, to ) {

	var v = 0;
    for( var j = from; j < to; j++ ) {
        v += this.frequencyData[ j ];
    }
    return v / ( to - from );

}

//var reactive = new ReactiveSound( { track: 'assets/track' } );
var reactive = new ReactiveSound( { microphone: true } );

function Circle() {

}

Circle.prototype = Object.create( Effect.prototype );

Circle.prototype.init = function() {

	this.canvas = document.createElement( 'canvas' );
	this.canvas.width = 512;
	this.canvas.height = 512;
	this.canvas.style.width = this.canvas.width + 'px';
	this.canvas.style.height = this.canvas.height + 'px';
	this.canvas.style.border = '1px solid red';
	document.body.appendChild( this.canvas );

	this.context = this.canvas.getContext( '2d' );

	this.radiusX = this.radiusY = 0;

}

Circle.prototype.update = function( radiusX, radiusY, color ) {

	this.radiusX = radiusX;
	this.radiusY = radiusY;

}

Circle.prototype.render = function() {

	this.context.save();

	this.context.fillStyle = '#ff00ff';

	this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

	this.context.beginPath();
	this.context.translate( .5 * this.canvas.width - this.radiusX, .5 * this.canvas.height - this.radiusY );
	this.context.scale( this.radiusX, this.radiusY );
	this.context.arc( 0, 0, 100, 0, 2 * Math.PI, false );
	this.context.fill();

	this.context.restore();


}

function Sphere() {

}

Sphere.prototype = Object.create( Effect.prototype );

Sphere.prototype.init = function() {

	this.canvas = document.createElement( 'canvas' );
	this.canvas.width = 512;
	this.canvas.height = 512;
	this.canvas.style.width = this.canvas.width + 'px';
	this.canvas.style.height = this.canvas.height + 'px';
	this.canvas.style.border = '1px solid red';
	document.body.appendChild( this.canvas );

	this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialiasing: true } );
	this.renderer.setSize( this.canvas.width, this.canvas.height );

	this.sphere = new THREE.Mesh(
		new THREE.BoxGeometry( 10, 10, 10 ),
		new THREE.MeshNormalMaterial( {
			shading: THREE.FlatShading
		} )
	);

	this.scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera( 75, this.canvas.width / this.canvas.height, 1, 1000 );
	this.camera.position.z = 100;

	this.scene.add( this.sphere );

}

Sphere.prototype.update = function( angleX, angleY, scale ) {

	this.sphere.scale.set( scale, scale, scale );
	this.sphere.rotation.x = angleX;
	this.sphere.rotation.y = angleY;

}

Sphere.prototype.render = function() {

	this.camera.lookAt( this.sphere.position );
	this.renderer.render( this.scene, this.camera );

}

