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

	if( this.settings.debug ) this.enableDebugMode();

}

Sound.prototype.start = function () {

	var loop = function() {
		requestAnimationFrame( loop );
		this.update();
	}.bind( this );

	loop();

}

Sound.prototype.connectToMicrophone = function() {

	function onMediaStream( stream ) {
		var r = this.context.createMediaStreamSource( stream );
		r.connect( this.analyser );
		this.start();
	};

	navigator.getUserMedia(
		{ audio: true },
		onMediaStream.bind( this ),
		function( err ) { console.log( 'getUserMedia error: ' + err ) }
	);

}

Sound.prototype.loadAudioTrack = function( file ) {

	var a = new Audio();

	var processData = function( buffer ) {

		this.context.decodeAudioData( buffer,

			function( buffer ) {

				var source = this.context.createBufferSource();
				source.connect( this.analyser );
				source.loop = true;
				source.buffer = buffer;
				source.start( 1 );

				this.analyser.connect( this.context.destination );

				this.start();

			}.bind( this ),

			function() {
				console.log( 'Unable to decode audio data' );
			}

		);

	}.bind( this );

	var oReq = new XMLHttpRequest();
	oReq.open( 'GET', file, true );
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

	if( this.settings.debug ) this.drawDebug();

}

Sound.prototype.getFreqRange = function( from, to ) {

	var v = 0;
    for( var j = from; j < to; j++ ) {
        v += this.frequencyData[ j ];
    }
    v /= 255;
    return v / ( to - from );

}

Sound.prototype.enableDebugMode = function() {

	this.spectrumCanvas = document.createElement( 'canvas' );
    this.spectrumCanvas.width = 256;
    this.spectrumCanvas.height = 128;
    this.spectrumCanvas.setAttribute( 'id', 'spectrumCanvas' );
    this.spectrumCanvas.style.position = 'absolute';
    this.spectrumCanvas.style.left = 0;
    this.spectrumCanvas.style.position = 0;
    this.spectrumCtx = this.spectrumCanvas.getContext( '2d' );

    document.body.appendChild( this.spectrumCanvas );

}

Sound.prototype.drawDebug = function() {

	var step = 10;
	this.spectrumCtx.clearRect( 0, 0, this.spectrumCanvas.width, this.spectrumCanvas.height );
	var h = this.spectrumCanvas.height - 25;

    for( var j = 0; j < this.frequencyData.length; j+= step ) {
        var v = 255 * this.getFreqRange( j, j + step );
        this.spectrumCtx.fillStyle = 'rgb(255,' + j + ',' + j + ')';
        this.spectrumCtx.beginPath();
        this.spectrumCtx.fillRect( j, h, step, - v * h / 256 );
        this.spectrumCtx.font = "normal 10px Arial";
        this.spectrumCtx.save();
        this.spectrumCtx.rotate( Math.PI / 2 );
        this.spectrumCtx.beginPath();
        this.spectrumCtx.fillText( j, this.spectrumCanvas.height - 20, -j );
        this.spectrumCtx.restore();
    }

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
