const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// 1. Add import
content = content.replace(
  'import * as THREE from "three";',
  'import * as THREE from "three";\nimport { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";'
);

// 2. Replace the scene building
const startMarker = "// Dynamic Server Monitor screen texture (real live scroll canvas texture)";
const endMarker = "// 5. Nebula Ambient Dust Particles";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `
    let mixer;
    const clock = new THREE.Clock();
    
    // Load Actual Heavy-Duty 3D Model (Quantum Server / Cloud Node)
    const loader = new GLTFLoader();
    loader.load('/quantum_server.glb', (gltf) => {
      const model = gltf.scene;
      
      // Enhance model materials for realistic look
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.metalness = Math.max(0.7, child.material.metalness || 0);
            child.material.roughness = Math.min(0.3, child.material.roughness || 1);
          }
        }
      });
      
      model.scale.set(0.65, 0.65, 0.65);
      model.position.set(0, -0.2, 0);
      
      infraGroup.add(model);
      
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }
    });

    `;
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
}

// 3. Replace the animation loop logic
const animStartMarker = "// 1. Rotate server cabinet slowly";
const animEndMarker = "// Layout positioning on scroll";

const animStartIndex = content.indexOf(animStartMarker);
const animEndIndex = content.indexOf(animEndMarker);

if (animStartIndex !== -1 && animEndIndex !== -1) {
  const animReplacement = `
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      
      // Rotate the entire heavy model group slowly
      infraGroup.rotation.y = time * 0.15;
      
      `;
  content = content.substring(0, animStartIndex) + animReplacement + content.substring(animEndIndex);
}

fs.writeFileSync('src/app/page.js', content);
console.log("Patch applied successfully.");
