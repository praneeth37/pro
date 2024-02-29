// The <canvas /> DOM element, set after page load.
let _canvas;

// The last frame time, used to calculate delta time (dt).
let _lastFrameTime;

// A flag to indicate if the init() function has been called.
let _hasInited = false;

// The render loop. This is where all the magic happens.
const loop = async (time) => {
  if (!_lastFrameTime) {
    _lastFrameTime = time;
  }

  // Calculate delta time (dt) and update the last frame time.
  const dt = time - _lastFrameTime;
  _lastFrameTime = time;

  // Resize the canvas to fill the screen.
  if (_canvas) {
    _canvas.width = _canvas.clientWidth
    _canvas.height = _canvas.clientHeight;
  }

  // Call the init() function once and only once.
  if (!_hasInited) {
    if (window.init) {
      _hasInited = true;
      
      const v = window.init(_canvas);
      if (v instanceof Promise) {
        await v;
      }
    }
  }

  // Call the loop() function every frame.
  if (window.loop) {
    window.loop(dt, _canvas);
  }

  window.requestAnimationFrame(loop);
};

// Adds a script tag to the DOM with our solution.
const attachScript = async () => {
  await import('./solution.js');
};

window.loadShader = async ({ gl, name, type }) => {
  const res = await fetch(`./src/${name}.glsl`);
  const source = await res.text();
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
};

// Add a listener to the global window object for the page load.
// See: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
window.onload = () => {
  // get the <canvas /> DOM element
  _canvas = document.getElementById('canvas');

  // attach the solution script
  attachScript();

  // start render loop
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  window.requestAnimationFrame(loop);
};
