#version 300 es
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

in vec3 aVertexPosition;
in vec3 aVertexColor;
in vec2 aTextureCoord;

out vec3 vColor;
out vec2 vTextureCoord;

void main(void) {
  vColor = aVertexColor;
  vTextureCoord = aTextureCoord;

  vec3 v = aVertexPosition;
  gl_Position = uProjectionMatrix
    * uModelViewMatrix
    * vec4(v, 1.0);
}
