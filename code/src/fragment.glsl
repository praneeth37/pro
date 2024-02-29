#version 300 es
precision mediump float;

uniform sampler2D uDiffuse;

in vec3 vColor;
in vec2 vTextureCoord;

out vec4 fragColor;

void main(void) {
  fragColor = texture(uDiffuse, vTextureCoord);
}
