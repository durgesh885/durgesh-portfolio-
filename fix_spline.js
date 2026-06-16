const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// The line we need to replace is: <div id="canvas-container" ref={canvasContainerRef}></div>
const oldDiv = '<div id="canvas-container" ref={canvasContainerRef}></div>';
const newDiv = `
      <div id="canvas-container">
        <Spline 
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
        />
      </div>
`;
content = content.replace(oldDiv, newDiv);

// Just in case we missed removing the ref declaration, remove it:
content = content.replace("const canvasContainerRef = useRef(null);", "");

fs.writeFileSync('src/app/page.js', content);
console.log("Fixed page.js");
