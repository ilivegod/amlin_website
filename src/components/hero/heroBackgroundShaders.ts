export const HERO_BG_CONFIG = {
  density: 2.4,
  aperture: 0.62,
  tilt: 0.42,
  exposure: 1.35,
  grain: 0.03,
  parallax: 0.55,
  maxPixelRatio: 1.75,
} as const;

export const heroBgVertexShader = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const heroBgFragmentShader = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
uniform float uDensity;
uniform float uAperture;
uniform float uTilt;
uniform float uExposure;
uniform float uGrain;

#define TAPS 14
#define GOLDEN 2.39996323

const vec2 HS = vec2(1.0, 1.7320508);

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec4 hexCoords(vec2 p) {
  vec4 hC = floor(vec4(p, p - vec2(0.5, 1.0)) / HS.xyxy) + 0.5;
  vec4 h = vec4(p - hC.xy * HS, p - (hC.zw + 0.5) * HS);
  return dot(h.xy, h.xy) < dot(h.zw, h.zw) ? vec4(h.xy, hC.xy) : vec4(h.zw, hC.zw + 0.5);
}

float hexEdge(vec2 p) {
  p = abs(p);
  return max(dot(p, HS * 0.5), p.x);
}

vec3 grille(vec2 q) {
  vec4 hc = hexCoords(q);
  float e = hexEdge(hc.xy);
  float id = hash21(hc.zw + 11.7);

  float wall = smoothstep(0.29, 0.45, e);
  float cavity = mix(0.05, 1.0, wall);

  vec2 dir = normalize(hc.xy + vec2(1e-4));
  float slope = wall * (1.0 - wall) * 4.0;
  vec3 n = normalize(vec3(dir * slope * 1.7, 1.0));

  vec3 L = normalize(vec3(-0.5, 0.66, 0.56));
  float dif = max(dot(n, L), 0.0);
  float spe = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 26.0);

  float metal = mix(0.82, 1.16, id);
  vec3 base = vec3(0.9, 0.93, 1.0);
  return base * cavity * metal * (0.06 + 0.54 * dif) + vec3(spe * wall * 0.9);
}

vec3 defocused(vec2 q, float coc, float seed) {
  if (coc < 0.004) return grille(q);
  vec3 acc = vec3(0.0);
  float a = seed * 6.2831853;
  for (int i = 0; i < TAPS; i++) {
    float fi = float(i) + 0.5;
    float r = sqrt(fi / float(TAPS));
    float th = fi * GOLDEN + a;
    vec3 c = grille(q + vec2(cos(th), sin(th)) * r * coc);
    acc += c * c;
  }
  return sqrt(acc / float(TAPS));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float T = uTime;

  vec3 ro = vec3(0.0);
  vec3 rd = normalize(vec3(uv, -1.35));

  vec3 nrm = normalize(vec3(
    -uTilt + 0.03 * sin(T * 0.11) + uPointer.x * 0.05,
     0.12 + 0.025 * cos(T * 0.09) - uPointer.y * 0.04,
     1.0));
  float dist = 2.35 + 0.12 * sin(T * 0.07);

  float denom = min(dot(rd, nrm), -0.05);
  float t = -dist / denom;

  vec3 hit = ro + rd * t;
  vec3 tx = normalize(cross(vec3(0.0, 1.0, 0.0), nrm));
  vec3 ty = cross(nrm, tx);
  vec2 pw = vec2(dot(hit, tx), dot(hit, ty)) + vec2(T * 0.014, T * 0.006);
  vec2 q = pw * uDensity;

  vec3 frd = normalize(vec3(-0.42, 0.10, -1.35));
  float tFocus = -dist / min(dot(frd, nrm), -0.05);

  float behind = step(tFocus, t);
  float coc = min(uAperture * mix(1.0, 0.45, behind) * abs(t - tFocus), 1.0);
  float seed = hash21(gl_FragCoord.xy + fract(T) * 137.0);

  vec3 col = defocused(q, coc, seed);

  col *= exp(-max(t - tFocus, 0.0) * 0.45);
  col *= mix(0.72, 1.3, vnoise(pw * 0.55 + 3.1));
  col *= uExposure;

  col = col / (col + 0.85) * 1.32;
  col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
  col = max(col - 0.008, 0.0);

  float vig = smoothstep(1.55, 0.30, length(uv * vec2(1.0, 1.22)));
  col *= mix(0.58, 1.0, vig);

  float g = hash21(gl_FragCoord.xy * 1.7 + fract(T) * vec2(97.1, 61.7));
  col += (g - 0.5) * uGrain;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("hero-bg shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createHeroBgProgram(
  gl: WebGLRenderingContext
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, heroBgVertexShader);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, heroBgFragmentShader);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("hero-bg link:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

export type HeroBgUniforms = {
  uRes: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uPointer: WebGLUniformLocation | null;
  uDensity: WebGLUniformLocation | null;
  uAperture: WebGLUniformLocation | null;
  uTilt: WebGLUniformLocation | null;
  uExposure: WebGLUniformLocation | null;
  uGrain: WebGLUniformLocation | null;
};

export function getHeroBgUniforms(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): HeroBgUniforms {
  const names = [
    "uRes",
    "uTime",
    "uPointer",
    "uDensity",
    "uAperture",
    "uTilt",
    "uExposure",
    "uGrain",
  ] as const;

  const uniforms = {} as HeroBgUniforms;
  for (const name of names) {
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return uniforms;
}
