
export const loadShader = async (gl, { v = 'vertex', f = 'fragment', attributes = [], uniforms = [], } = {}) => {
  // load vertex and fragment shaders + create program
  const vertex = await window.loadShader({ gl, name: v, type: gl.VERTEX_SHADER });
  const fragment = await window.loadShader({ gl, name: f, type: gl.FRAGMENT_SHADER });
  
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Could not init shaders: ${gl.getProgramInfoLog(program)}`);
    return;
  }

  program.attributes = {
    position: gl.getAttribLocation(program, 'aVertexPosition'),
    uv: gl.getAttribLocation(program, 'aTextureCoord'),
    color: gl.getAttribLocation(program, 'aVertexColor'),
  };

  for (const { key, name, } of attributes) {
    program.attributes[key] = gl.getAttribLocation(program, name);
  }

  program.uniforms = {
    P: gl.getUniformLocation(program, "uProjectionMatrix"),
    MV: gl.getUniformLocation(program, "uModelViewMatrix"),
    Color: gl.getUniformLocation(program, "uColor"),
    Diffuse: gl.getUniformLocation(program, "uDiffuse"),
  };

  for (const { key, name, } of uniforms) {
    program.uniforms[key] = gl.getUniformLocation(program, name);
  }

  return program;
};
