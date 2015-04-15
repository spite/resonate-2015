var MyEffect = function() {

	Effect.call( this );

	this.circle = new Circle();
	this.sphere = new Sphere();

} 

MyEffect.prototype = Object.create( Effect.prototype );

MyEffect.prototype.init = function() {

	Effect.prototype.init.call( this )

	/* Add you init code */

	this.circle.init();
	this.sphere.init();

}

MyEffect.prototype.update = function() {

	Effect.prototype.update.call( this )

	/* Add you update code */

	reactive.update();
	this.circle.update( .01 * reactive.getFreqRange( 0, 10 ), .01 * reactive.getFreqRange( 10, 20 ), 0 );
	this.sphere.update( .01 * reactive.getFreqRange( 0, 10 ), .01 * reactive.getFreqRange( 10, 20 ), 1 + .01 * reactive.getFreqRange( 20, 30  ) );

}

MyEffect.prototype.render = function() {

	Effect.prototype.render.call( this )

	/* Add you render code */

	this.circle.render();
	this.sphere.render();

}