
var MyEffect = function ( sound ) {

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

		var scale = sound.getFreqRange( 10, 20 ) * 200 + 100;

		context.fillStyle = '#ff0044';

		context.clearRect( 0, 0, canvas.width, canvas.height );
		context.beginPath();
		context.arc( canvas.width * 0.5, canvas.height * 0.5, scale, 0, 2 * Math.PI, false );
		context.fill();

	};

};
