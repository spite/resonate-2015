
var MyEffect = function ( sound ) {

	// renderer

	var renderer = new THREE.WebGLRenderer( { antialias: true } );

	// camera

	var camera = new THREE.PerspectiveCamera( 75, 1, 1, 1000 );
	camera.position.z = 500;

	// scene

	var scene = new THREE.Scene();

	var sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 1, 40, 20 ),
		new THREE.MeshPhongMaterial( { color: 0xff00ff, shading: THREE.FlatShading } )
	);
	scene.add( sphere );

	var light = new THREE.HemisphereLight();
	light.position.set( 1, 1, 1 );
	scene.add( light );

	//

	this.dom = renderer.domElement;

	this.resize = function ( width, height ) {

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize( width, height );

	};

	this.update = function ( time ) {

		sphere.rotation.x = sound.getFreqRange( 10, 20 ) * 5;
		sphere.rotation.y = time * 0.001;

		var scale = sound.getFreqRange( 10, 20 ) * 200 + 100;

		sphere.scale.set( scale, scale, scale );

		sphere.material.color.b = Math.pow( sound.getFreqRange( 30, 40 ), 2 ) * 2;

		renderer.render( scene, camera );

	};

};
