var camera, scene, renderer;


$(document).ready(function(){
	$("#scroll-container").on("wheel", function(event) {
		console.log("Rueda del ratón movida.");
		this.scrollBy(0, +event.originalEvent.deltaY);
		event.preventDefault();
	});
});
var texture_placeholder,
isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 90, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0,
target = new THREE.Vector3();

init();
animate();

function init() {

	var container, mesh;

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

	scene = new THREE.Scene();

	texture_placeholder = document.createElement( 'canvas' );
	texture_placeholder.width = 128;
	texture_placeholder.height = 128;

	var context = texture_placeholder.getContext( '2d' );
	context.fillStyle = 'rgb( 200, 200, 200 )';
	context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );

	var materials = [

					loadTexture( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space4.jpg' ), // right
					loadTexture( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space2.jpg' ), // left
					loadTexture( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space1.jpg' ), // top
					loadTexture( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space6.jpg' ), // bottom
					loadTexture( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space3.jpg' ), // back
					loadTexture( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space5.jpg' ) // front

					];

	mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
	mesh.scale.x = - 1;
	scene.add( mesh );

	for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

		var vertex = mesh.geometry.vertices[ i ];

		vertex.normalize();
		vertex.multiplyScalar( 550 );

	}

	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				//document.addEventListener( 'wheel', onDocumentMouseWheel, false );

	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function loadTexture( path ) {

	var texture = new THREE.Texture( texture_placeholder );
	var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

	var image = new Image();
	image.onload = function () {

		texture.image = this;
		texture.needsUpdate = true;

	};
	image.src = path;

	return material;

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	isUserInteracting = true;

	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;

	onPointerDownLon = lon;
	onPointerDownLat = lat;

}

function onDocumentMouseMove( event ) {

	if ( isUserInteracting === true ) {

		lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
		lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}
}

function onDocumentMouseUp( event ) {

	isUserInteracting = false;

}

		//	function onDocumentMouseWheel( event ) {

			//	camera.fov += event.deltaY * 0.05;
			//	camera.updateProjectionMatrix();

		//	}

function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		onPointerDownPointerX = event.touches[ 0 ].pageX;
		onPointerDownPointerY = event.touches[ 0 ].pageY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
		lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}

}

function animate() {

	requestAnimationFrame( animate );
	update();

}

function update() {

	if ( isUserInteracting === false ) {

		lon += 0.1;

	}

	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.Math.degToRad( 90 - lat );
	theta = THREE.Math.degToRad( lon );

	target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	target.y = 500 * Math.cos( phi );
	target.z = 500 * Math.sin( phi ) * Math.sin( theta );

	camera.position.copy( target ).negate();
	camera.lookAt( target );

	renderer.render( scene, camera );

}

const tilt = document.querySelectorAll(".tilt");

VanillaTilt.init(tilt, {
	reverse: true,
	max: 15,
	speed: 300,
	scale: 1.12,
	glare: true,
	reset: true,
	perspective: 500,
	transition: true,
	"max-glare": 0.45,
	"glare-prerender": false,
	gyroscope: true,
	gyroscopeMinAngleX: -45,
	gyroscopeMaxAngleX: 45,
	gyroscopeMinAngleY: -45,
	gyroscopeMaxAngleY: 45
});

function toggleScenes() {
	console.log("s");
	var scene1 = document.getElementById('scene1');
	var scene2 = document.getElementById('scene2');

	if (scene1.classList.contains('active')) {
		scene1.classList.remove('active');
		scene1.style.opacity = '0';
		scene1.style.position = 'relative';
		scene2.classList.add('active');
		scene2.style.opacity = '1';
	} else {
		scene2.classList.remove('active');
		scene2.style.opacity = '0';
		scene1.classList.add('active');
		scene1.style.opacity = '1';
	}
}



function playAnimation() {

	var audio = document.getElementById('morgan-audio');
	var botonaudio = document.getElementById('boton-audio');
	var bote = document.getElementById('trash-can');
	var morganFreeman = document.getElementById('morgan-freeman');
		

  // Iniciar reproducción de audio
	audio.play();
	botonaudio.style.display = 'none';

	setTimeout(function() {

	bote.style.display = 'block';


	}, 15000);

  // Iniciar animación de desplazamiento horizontal
  morganFreeman.style.left = 'calc(200% + 400px)'; // Desplazar imagen hacia la derecha
  
  // Restablecer la posición de la imagen después de cierto tiempo
  setTimeout(function() {
    morganFreeman.style.left = '-400px'; // Regresar imagen fuera de la pantalla
  }, 15000); // Duración de la animación (en milisegundos)
}
