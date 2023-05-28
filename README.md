# Template for generation of minecraft-style characters in Three.js

This is a template that can be used to create couple / characters in a minecraft-like geometry using *Three.js*.    
You can check a live demo [here](https://minecraft-anniversary.netlify.app/). You can rotate, zoom in and zoom out the scene.   

<img src="recording.gif" width="450" height="300"/>

### Development notes:

You can easily modify the characters' appearance by changing the colours and positions of the Mesh groups.  
Building blocks are BoxGometry elements of *Three.js*.  
Initial coordinates of personas are around (0,0,0) and there is no rotation.  
Later in the code, each persona is rotated using quaternions in the following line of code:
```javascript
let quaternion = new THREE.Quaternion();
boy['body'].quaternion.premultiply(quaternion);
```

For ease of coordinates interpretation you can render coordinate axes by the following code: 
```javascript
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);
```

#### Each persona consists of the following mesh groups:
- head (includes face and hair cubes)
- t-shirt
- hands
- sleeves
- pants
- shoes

#### Setting for each person (pass to the draw_persona() method):
- colours for hair, skin, eyes, mouth, pants, t-shirt, shoes
- sizes for t-shirt, sleeves, hands, pants, shoes
- hair coordinates
- positions for each body element group
- rotations for body element group if any

To run the code:
1. Start the local server in the directory with *index.html* file. For example like this: ```python -m SimpleHTTPServer 8000.``` 
2. Open  ```localhost:8000/index.html``` in browser.

#### :clipboard: To-Do:
- optimize the cubes geometry into voxel geometry mentioned in this article: https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html

P.S. Current proteges of the characters are my beloved one and me. Set of brown cubes in girl's hands is an Esterhazy cake :cake:.



