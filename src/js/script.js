// let gui = new dat.GUI();
//   gui.add(model.position, "x", -10, 10, 0.01);
//   gui.add(model.position, "y", -10, 10, 0.01);
//   gui.add(model.position, "z", -10, 10, 0.01);

let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const idArr = ['cont1', 'cont2', 'cont3'];
const figArr = ['figure1', 'figure2', 'figure3'];

// base(idArr[0], figArr[0]);
// base(idArr[1], figArr[1]);
// base(idArr[2], figArr[2]);

for( let i = 0; i < idArr.length; i++ ) {
  base(idArr[i], figArr[i]);
}

function base(id, figure) {

  let container = document.getElementById(id);

  /* Scene */
  const scene = new THREE.Scene();

  /* Camera */
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3);

  scene.add(camera);

  /* Lights */
  const ambientLight = new THREE.AmbientLight("#F5B060", 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("#B1D3F5", 1.2);
  directionalLight.position.set(-2, 1.4, 5);

  scene.add(directionalLight);

  /* Model Import */
  const gltfLoader = new THREE.GLTFLoader();

  gltfLoader.load(`models/${figure}.gltf`, (gltf) => {
    const model = gltf.scene;
    model.position.set(0, -1, 0);

    model.scale.set(0.2, 0.2, 0.2);

    scene.add(model);
  });

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onDocumentMouseMove);

  window.addEventListener("resize", onWindowResize);

  function animate() {
    requestAnimationFrame(animate);

    camera.position.x = (-mouseX - camera.position.x) * 0.001;
    camera.position.y = (mouseY - camera.position.y) * 0.001;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function createAmbientLight(color, intensity) {
  const ambientLight = new THREE.AmbientLight(color, intensity);
  ambientLight.position.set(-2, 1.4, 5);
}

function createDirectionalLight(color, intensity) {
  const directionalLight = new THREE.DirectionalLight(color, intensity);
  directionalLight.position.set(-2, 1.4, 5);

  scene.add(directionalLight);
}
