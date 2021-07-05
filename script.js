var scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
	renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//const axesHelper = new THREE.AxesHelper( 20 ); // enable to see the coordinates
//scene.add( axesHelper );

scene.background = new THREE.Color( 0xbfe3dd );

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { OrbitControls } from './orbit_controls.js';

function draw_cake() {
	let coordinates = [
			[0,0,0],[1,0,0], [2,0,0], [3,0,0],
			[0,0,1],[1,0,1], [2,0,1], [3,0,1],
			[0,0,2],[1,0,2], [2,0,2], [3,0,2],
			[0,0,3],[1,0,3], [2,0,3], [3,0,3],
			[1,0,-1], [2,0,-1],
			[-1,0,1], [-1,0,2],
			[1,0,4], [2,0,4],
			[4, 0, 1], [4, 0, 2],
			[0.5, 0, -0.5], [-0.5,0,0.5],
			[-0.5,0,2.5], [0.5,0,3.5],
			[2.5,0,3.5], [3.5,0,2.5],
			[3.5, 0, 0.5], [2.5, 0, 0],

			[0,1,0],[1,1,0], [2,1,0], [3,1,0],
			[0,1,1],[1,1,1], [2,1,1], [3,1,1],
			[0,1,2],[1,1,2], [2,1,2], [3,1,2],
			[0,1,3],[1,1,3], [2,1,3], [3,1,3],
			[1,1,-1], [2,1,-1],
			[-1,1,1], [-1,1,2],
			[1,1,4], [2,1,4],
			[4, 1, 1], [4, 1, 2],
			[0.5, 1, -0.5], [-0.5,1,0.5],
			[-0.5,1,2.5], [0.5,1,3.5],
			[2.5,1,3.5], [3.5,1,2.5],
			[3.5, 1, 0.5], [2.5, 1, 0],
		],

		cake_color = new THREE.MeshBasicMaterial( { color: '#622c08' } ),
		group = new THREE.Group();

	coordinates.forEach(function(item, index, array) {
		let cake = new THREE.BoxGeometry(1, 1, 1),
			mesh = new THREE.Mesh(cake, cake_color);
		let edges = new THREE.EdgesGeometry( cake );
		let line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'white' } ) );
		mesh.position.set(item[0] - 5 - 6, item[1] - 9, item[2] + 3.7 - 87)
		line.position.set(item[0] - 5 - 6, item[1] - 9, item[2] + 3.7 - 87)
		group.add(mesh)
		group.add(line)
	})

	scene.add(group)
	return group
}

function draw_hearts() {
	let coordinates = [
			[-5, 5, -5], [-5, 5, -6], [-5, 5, -7], [-5, 5, -8], [-5, 5, -4], [-5, 5, -3], [-5, 5, -2], [-5, 5, -8.5], [-5, 5, -1.5],
			[-5, 6, -6], [-5, 6, -7], [-5, 6, -8], [-5, 6, -4], [-5, 6, -3], [-5, 6, -2],[-5, 6, -5],
			[-5, 6.6, -6], [-5, 7, -7], [-5, 6.6, -4], [-5, 7, -3],
			[-5, 4, -6], [-5, 4, -7], [-5, 4, -8], [-5, 4, -4], [-5, 4, -3], [-5, 4, -2],[-5, 4, -5],
			[-5, 3, -6], [-5, 3, -7], [-5, 3, -4], [-5, 3, -3], [-5, 3, -5],
			[-5, 2, -6], [-5, 2, -4], [-5, 2, -5],
			[-5, 1, -5]
		],
		heart_color = new THREE.MeshBasicMaterial( { color: 'violet' } ),
		group = new THREE.Group();

	coordinates.forEach(function(item, index, array) {
		let heart = new THREE.BoxGeometry(1, 1, 1),
			mesh = new THREE.Mesh(heart, heart_color);
		mesh.position.set(item[0], item[1], item[2])
		group.add(mesh)
	})

	scene.add(group)
	return group
}

function draw_persona(x_shift, z_shift, settings) {
	let group_head = new THREE.Group(),
		group_body = new THREE.Group(),
		group_left_leg = new THREE.Group(),
		group_right_leg = new THREE.Group(),
		group_right_hand = new THREE.Group(),
		group_left_hand = new THREE.Group();

	let hair_coordinates = []
	let ponytail = [
		[2, 7, -1], [3, 7, -1], [4, 7, -1], [5, 7, -1],
		[2, 8, -1], [3, 8, -1], [4, 8, -1], [5, 8, -1],
		[2, 7, -2], [3, 7, -2], [4, 7, -2], [5, 7, -2],
		[2, 8, -2], [3, 8, -2], [4, 8, -2], [5, 8, -2],
	]

	for (let x=0;x<8;x++) {
		for (let y=0;y<8;y++) {
			for (let z=0;z<8;z++) {
				hair_coordinates.push([x, y, z])
			}
		}
	}

	let tshirt_gem = new THREE.BoxGeometry( settings.tshirt_size[0], settings.tshirt_size[1], settings.tshirt_size[2]),
		sleeves_gem = new THREE.BoxGeometry( settings.sleeves_size[0], settings.sleeves_size[1], settings.sleeves_size[2] ),
		hands_gem = new THREE.BoxGeometry( settings.hands_size[0], settings.hands_size[1], settings.hands_size[2]),
		pants_gem = new THREE.BoxGeometry( settings.pants_size[0], settings.pants_size[1], settings.pants_size[2] ),
		shoes_gem = new THREE.BoxGeometry( settings.shoes_size[0], settings.shoes_size[1], settings.shoes_size[2] ),
		hair = new THREE.MeshBasicMaterial( { color: settings.hair_color } ),
		shoe_color = new THREE.MeshBasicMaterial( { color: settings.shoe_color } ),
		skin = new THREE.MeshBasicMaterial( { color: settings.skin_color } ),
		white_color = new THREE.MeshBasicMaterial( { color: 'white' } ),
		t_shirt_color = new THREE.MeshBasicMaterial( { color: settings.tshirt_color} ),
		eyes_green = new THREE.MeshBasicMaterial( { color: settings.eyes_color } ),
		mouth = new THREE.MeshBasicMaterial( { color: settings.mouth_color } ),
		pants_color = new THREE.MeshBasicMaterial( { color: settings.pants_color  } ),
		cheeks_color = new THREE.MeshBasicMaterial( { color: settings.skin_color } );


	hair_coordinates = hair_coordinates.concat(settings.ponytail_coordinates)

	let cheek_meshes = [];

	hair_coordinates.forEach(function(item, index, array) {
		let gem = new THREE.BoxGeometry( 1, 1, 1 ),
			c,
			white_eyes = [
				[1, 4, 7], [6, 4, 7],
			],
			green_eyes = [
				[2, 4, 7], [5, 4, 7],
			],
			mouth_list = [
				[3, 1, 7], [4, 1, 7],
			],
			cheeks = [ //#ffdae0
				[1, 2, 7], [6, 2, 7],
			];
		let head_skin_cubes = [
			[4, 6, 7], [5, 6, 7], [2, 6, 7], [3, 4, 7], [4, 4, 7], [5, 4, 7], // front
			[4, 5, 7], [2, 5, 7], [3, 5, 7], [4, 5, 7], [5, 5, 7], [1, 5, 7], [6, 5, 7],
			[0, 3, 7], [0, 2, 7], [0, 1, 7], [0, 0, 7], [0, 4, 5], [0, 3, 5], [0, 2, 5], [0, 1, 5], [0, 0, 5],
			[0, 3, 6], [0, 2, 6], [0, 1, 6], [0, 0, 6],
			[0, 3, 4], [0, 2, 4], [0, 1, 4], [0, 0, 4], [0, 0, 3], // left side
			[0, 0, 7], [0, 1, 7], [0, 2, 7], [0, 3, 7],
			[1, 0, 7], [1, 1, 7], [1, 2, 7], [1, 3, 7],
			[2, 0, 7], [2, 1, 7], [2, 2, 7], [2, 3, 7],
			[3, 0, 7], [3, 2, 7], [3, 3, 7], [3, 4, 7],
			[4, 0, 7], [4, 2, 7], [4, 3, 7],
			[5, 0, 7], [5, 1, 7], [5, 2, 7], [5, 3, 7], [5, 4, 7], [5, 5, 7],
			[6, 0, 7], [6, 1, 7], [6, 2, 7], [6, 3, 7], [6, 4, 7],
			[7, 0, 7], [7, 1, 7], [7, 2, 7], [7, 3, 7], [7, 4, 7], // front
			[7, 3, 7], [7, 2, 7], [7, 1, 7], [7, 0, 7], [7, 4, 5], [7, 3, 5], [7, 2, 5], [7, 1, 5], [7, 0, 5],
			[7, 3, 6], [7, 2, 6], [7, 1, 6], [7, 0, 6],
			[7, 2, 4], [7, 1, 4], [7, 0, 4], [7, 0, 3], // right siide

		]
		function checkAvailability(arr, val) {
		  return arr.some(function(arrVal) {
		    return val[0] === arrVal[0] && val[1] === arrVal[1] && val[2] === arrVal[2];
		  });
		}
		let is_hair = true;
		if (checkAvailability(head_skin_cubes, item)) {
			c = new THREE.Mesh( gem, skin);
			is_hair = false;
		}

		if (checkAvailability(mouth_list, item)) {
			c = new THREE.Mesh( gem, mouth);
			is_hair = false;
		}

		if (checkAvailability(green_eyes, item)) {
			c = new THREE.Mesh( gem, eyes_green);
			is_hair = false;
		}

		if (checkAvailability(white_eyes, item)) {
			c = new THREE.Mesh( gem, white_color);
			is_hair = false;
		}

		if (checkAvailability(cheeks, item)) {
			c = new THREE.Mesh( gem, cheeks_color);
			is_hair = false;
			cheek_meshes.push(c)
		}

		if (is_hair) {
			c = new THREE.Mesh( gem, hair);
		}

		group_head.add(c);
		c.position.x = item[0] + x_shift
		c.position.y = item[1]
		c.position.z = item[2] + z_shift

	})


	let tshirt = new THREE.Mesh( tshirt_gem, t_shirt_color),
		sleeve_left = new THREE.Mesh( sleeves_gem, t_shirt_color),
		sleeve_right = new THREE.Mesh( sleeves_gem, t_shirt_color),
		hand_right = new THREE.Mesh( hands_gem, skin),
		hand_left = new THREE.Mesh( hands_gem, skin),
		pants_right = new THREE.Mesh( pants_gem, pants_color),
		pants_left = new THREE.Mesh( pants_gem, pants_color),
		shoes_right = new THREE.Mesh( shoes_gem, shoe_color),
		shoes_left = new THREE.Mesh( shoes_gem, shoe_color);

	let mesh_collection = [
		{'object': tshirt, 'key': 'tshirt'},
		{'object': sleeve_left, 'key': 'sleeve_left'},
		{'object': sleeve_right, 'key': 'sleeve_right'},
		{'object': hand_right, 'key': 'hand_right'},
		{'object': hand_left, 'key': 'hand_left'},
		{'object': pants_right, 'key': 'pants_right'},
		{'object': pants_left, 'key': 'pants_left'},
		{'object': shoes_right, 'key': 'shoes_right'},
		{'object': shoes_left, 'key': 'shoes_left'},
	]

	mesh_collection.forEach(function(item, index, array) {
		item['object'].position.y = settings.positions[item.key][0]
		item['object'].position.x = settings.positions[item.key][1] + x_shift
		item['object'].position.z = settings.positions[item.key][2] + z_shift
		if (item.key in settings.rotations) {
			item['object'].rotation.x = settings.rotations[item.key][0]
			item['object'].rotation.y = settings.rotations[item.key][1]
			item['object'].rotation.z = settings.rotations[item.key][2]
		}
	})

	group_body.add(tshirt)
	group_left_leg.add(pants_left)
	group_left_leg.add(shoes_left)
	group_right_leg.add(pants_right)
	group_right_leg.add(shoes_right)
	group_right_hand.add(sleeve_right)
	group_right_hand.add(hand_right)
	group_left_hand.add(hand_left)
	group_left_hand.add(sleeve_left)

	scene.add(group_body);
	scene.add(group_left_leg);
	scene.add(group_right_leg);
	scene.add(group_right_hand);
	scene.add(group_left_hand);
	scene.add(group_head);

	return {
		'body': group_body,
		'left_leg': group_left_leg,
		'right_leg': group_right_leg,
		'left_hand': group_left_hand,
		'right_hand': group_right_hand,
		'head': group_head,
		'cheeks': cheek_meshes
	}
}


let boy_settings = {
		"hair_color": "#a0785a",
		"skin_color": "#ffdbac",
		"eyes_color": "#4b5d16",
		"mouth_color": "#e5acb6",
		"pants_color": "#add8e6",
		"in_dress": false,
		"shoe_color": "white",
		"tshirt_color": "white",
		"tshirt_size": [8, 9, 4],
		"sleeves_size": [4, 4, 4],
		"hands_size": [4, 7, 4],
		"pants_size": [3, 9, 4],
		"shoes_size": [3, 1.5, 4],
		"ponytail_coordinates": [
			[2, 7, -1], [3, 7, -1], [4, 7, -1], [5, 7, -1],
			[2, 8, -1], [3, 8, -1], [4, 8, -1], [5, 8, -1],
			[2, 7, -2], [3, 7, -2], [4, 7, -2], [5, 7, -2],
			[2, 8, -2], [3, 8, -2], [4, 8, -2], [5, 8, -2]
		],
		"positions": {
			"tshirt": [-5, 3.7, 3.7],
			"sleeve_left": [-2.5, -2, 3.5],
			"sleeve_right": [-2.5, 9, 3.5],
			"hand_left": [-8, -2, 3.5],
			"hand_right": [-8, 9, 3.5],
			"pants_right": [-14, 1.5, 3.7],
			"pants_left": [-14, 5.5, 3.7],
			"shoes_left": [-19.5,1.5,3.7],
			"shoes_right": [-19.5, 5.5, 3.7]
		},
		"rotations": {
			"sleeve_right": [0, 0,0],
			"hand_right": [0, 0, 0]
		}
	},
	girl_settings = {
		"hair_color": "orange",
		"skin_color": "#FCE1D5",
		"eyes_color": "#4b5d16",
		"mouth_color": "#ff748c",
		"pants_color": "#FCE1D5",
		"in_dress": false,
		"tshirt_color": "#bab86c", // #4b5d16
		"shoe_color": "#bab86c",
		"tshirt_size": [6, 17, 4],
		"sleeves_size": [3, 3, 3],
		"hands_size": [3, 6, 3],
		"pants_size": [2, 5, 4],
		"shoes_size": [2, 1, 4],
		"ponytail_coordinates": [
			[2, 0, -1], [3, 0, -1], [4, 0, -1], [5, 0, -1],
			[2, 1, -1], [3, 1, -1], [4, 1, -1], [5, 1, -1],
			[2, 0, -2], [3, 0, -2], [4, 0, -2], [5, 0, -2],
			[2, 1, -2], [3, 1, -2], [4, 1, -2], [5, 1, -2],
			[2, 0, -3], [3, 0, -3], [4, 0, -3], [5, 0, -3],
			[2, 1, -3], [3, 1, -3], [4, 1, -3], [5, 1, -3],
			[2, 2, -3], [3, 2, -3], [4, 2, -3], [5, 2, -3],
			[2, 2, -2], [3, 2, -2], [4, 2, -2], [5, 2, -2],
		],
		"positions": {
			"tshirt": [-5, 3.7, 3.7],
			"sleeve_left": [-2.5, -0.5, 3.5],
			"sleeve_right": [-2.5, 7, 3.5],
			"hand_left": [-7, -0.5, 3.5],
			"hand_right": [-7, 7, 3.5],
			"pants_right": [-16, 5.2, 3.7],
			"pants_left": [-16, 2.5, 3.7],
			"shoes_left": [-19,2.5,3.7],
			"shoes_right": [-19, 5.2, 3.7]
		},
		"rotations": {
			"hand_left": [-Math.PI/4, 0, 0],
			"hand_right": [-Math.PI/4, 0, 0]
		}
	};


let boy = draw_persona(-6, -50,  boy_settings),
	girl = draw_persona(-12, -90, girl_settings),
	cake = draw_cake()


let quaternion = new THREE.Quaternion(),
	quaternion2 = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), 45);
quaternion2.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), -90);

cake.quaternion.premultiply(quaternion2);

girl['head'].quaternion.premultiply(quaternion2);
girl['body'].quaternion.premultiply(quaternion2);
girl['left_hand'].quaternion.premultiply(quaternion2);
girl['right_hand'].quaternion.premultiply(quaternion2);
girl['left_leg'].quaternion.premultiply(quaternion2);
girl['right_leg'].quaternion.premultiply(quaternion2);

boy['head'].quaternion.premultiply(quaternion);
boy['body'].quaternion.premultiply(quaternion);
boy['left_hand'].quaternion.premultiply(quaternion);
boy['right_hand'].quaternion.premultiply(quaternion);
boy['left_leg'].quaternion.premultiply(quaternion);
boy['right_leg'].quaternion.premultiply(quaternion);


let zoom = 0.5

camera.position.z = 85*zoom;
camera.position.x = -48*zoom;
camera.position.y = 6*zoom;

renderer.render( scene, camera );

var controls = new OrbitControls( camera, renderer.domElement );

animate();

controls.listenToKeyEvents( window ); // optional
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 200;
controls.maxPolarAngle = Math.PI / 2;

let heart_drawn = false;
var angle = 0, radius = 10;

function animate() {
	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	if (girl['head'].position.x > -65) {
		let x_shift_girl = 0.6,
			x_shift_boy = 0.3/1.2,
			z_shift_girl = 0.24,
			z_shift_boy = 0.12/1.2;
		girl['head'].position.x = girl['head'].position.x - x_shift_girl
		cake.position.x = cake.position.x - x_shift_girl
		boy['head'].position.x = boy['head'].position.x + x_shift_boy
		girl['left_hand'].position.x = girl['left_hand'].position.x - x_shift_girl
		boy['left_hand'].position.x = boy['left_hand'].position.x + x_shift_boy
		girl['right_hand'].position.x = girl['right_hand'].position.x - x_shift_girl
		boy['right_hand'].position.x = boy['right_hand'].position.x + x_shift_boy
		girl['right_leg'].position.x = girl['right_leg'].position.x - x_shift_girl
		boy['right_leg'].position.x = boy['right_leg'].position.x + x_shift_boy
		girl['left_leg'].position.x = girl['left_leg'].position.x - x_shift_girl
		boy['left_leg'].position.x = boy['left_leg'].position.x + x_shift_boy
		girl['body'].position.x = girl['body'].position.x - x_shift_girl
		boy['body'].position.x = boy['body'].position.x + x_shift_boy

		girl['head'].position.z = girl['head'].position.z - z_shift_girl
		cake.position.z = cake.position.z - z_shift_girl
		boy['head'].position.z = boy['head'].position.z + z_shift_boy
		girl['body'].position.z = girl['body'].position.z - z_shift_girl
		boy['body'].position.z = boy['body'].position.z + z_shift_boy
		girl['left_hand'].position.z = girl['left_hand'].position.z - z_shift_girl
		boy['left_hand'].position.z = boy['left_hand'].position.z + z_shift_boy
		girl['right_hand'].position.z = girl['right_hand'].position.z - z_shift_girl
		boy['right_hand'].position.z = boy['right_hand'].position.z + z_shift_boy
		girl['right_leg'].position.z = girl['right_leg'].position.z - z_shift_girl
		boy['right_leg'].position.z = boy['right_leg'].position.z + z_shift_boy
		girl['left_leg'].position.z = girl['left_leg'].position.z - z_shift_girl
		boy['left_leg'].position.z = boy['left_leg'].position.z + z_shift_boy

		//camera.rotation.y  += 10
	} else {
		if (!heart_drawn) {

			setTimeout(function(){
				girl['cheeks'].forEach(function(item, index, array) {
					item.material.color.set('#ffc0cb');
				})
				boy['cheeks'].forEach(function(item, index, array) {
					item.material.color.set('#ffc0cb');
				})
			 }, 1000);


			setTimeout(function(){
				let heart_group = draw_hearts(),
					q = new THREE.Quaternion();
					q.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), 45);

					//boy['head'].position.applyQuaternion(quaternion);
					//girl['head'].position.applyQuaternion(quaternion);

					heart_group.quaternion.premultiply(q);
					heart_group.position.z = heart_group.position.z - 5
					heart_group.position.x = heart_group.position.x + 7
					heart_drawn = true;
				}, 2000);

		}
	}

	renderer.render( scene, camera );

}