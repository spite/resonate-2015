window.AudioContext = ( window.AudioContext
							|| window.webkitAudioContext
							|| window.mozAudioContext
							|| window.msAudioContext );

navigator.getUserMedia = ( navigator.getUserMedia
                           || navigator.webkitGetUserMedia
                           || navigator.mozGetUserMedia
                           || navigator.msGetUserMedia );

function Sound( settings ) {

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

Sound.prototype.connectToMicrophone = function() {

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

Sound.prototype.loadAudioTrack = function( file ) {

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

Sound.prototype.update = function() {

	var freqByteData = new Uint8Array( this.analyser.frequencyBinCount );
	this.analyser.getByteFrequencyData( freqByteData );

	for( var j = 0; j < freqByteData.length; j++ ) {
		this.frequencyData[ j ] += ( freqByteData[ j ] - this.frequencyData[ j ] ) * this.easing;
	}
}

Sound.prototype.getFreqRange = function( from, to ) {

	var v = 0;
    for( var j = from; j < to; j++ ) {
        v += this.frequencyData[ j ];
    }
    return v / ( to - from );

}

// var reactive = new ReactiveSound( { track: 'assets/track' } );
// var reactive = new ReactiveSound( { microphone: true } );

function Mouse() {

	this.x = 0;
	this.y = 0;

	document.addEventListener( 'mousemove', function( e ) {

		this.x = e.pageX;
		this.y = e.pageY;

	}.bind( this ) );

}

// var mouse = new Mouse();
