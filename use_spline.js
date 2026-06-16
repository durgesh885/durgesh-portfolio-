const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// 1. Remove three.js imports and add Spline import
content = content.replace(
  'import * as THREE from "three";\nimport { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";',
  "import Spline from '@splinetool/react-spline';"
);
content = content.replace('import * as THREE from "three";', "import Spline from '@splinetool/react-spline';");

// 2. Remove the Three.js useEffect block
// The block starts at: // Three.js CloudOps infrastructure scene
const threejsStart = content.indexOf("// Three.js CloudOps infrastructure scene");
const handleNavClickStart = content.indexOf("// Smooth scroll handler");

if (threejsStart !== -1 && handleNavClickStart !== -1) {
  content = content.substring(0, threejsStart) + content.substring(handleNavClickStart);
}

// 3. Remove the ref canvasContainerRef
content = content.replace("const canvasContainerRef = useRef(null);", "");

// 4. Update the JSX to render the Spline component instead of an empty div
const jsxStart = '<div ref={canvasContainerRef} className="webgl-container"></div>';
const jsxReplacement = `
      <div className="webgl-container">
        <Spline 
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
`;
content = content.replace(jsxStart, jsxReplacement);

fs.writeFileSync('src/app/page.js', content);
console.log("Spline component integrated successfully.");
