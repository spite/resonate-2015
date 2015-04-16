
var MyEffect = function () {

	// sound

	var sound = new Sound( { /* microphone: true,*/ track: 'assets/track', debug: true } );

	// canvas

	var canvas = document.createElement( 'canvas' );
	var context = canvas.getContext( '2d' );

	//

	this.dom = canvas;

	this.resize = function ( width, height ) {

		canvas.width = width;
		canvas.height = height;

	};

	this.update = function () {

		sound.update();

		var scale = 200 * sound.getFreqRange( 10, 20 ) + 50;

		context.fillStyle = '#ff00ff';

		context.clearRect( 0, 0, canvas.width, canvas.height );
		context.beginPath();
		context.arc( canvas.width * 0.5, canvas.height * 0.5, scale, 0, 2 * Math.PI, false );
		context.fill();

	};

};
