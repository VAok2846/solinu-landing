import { useRef, useEffect } from 'react'

const VERT = `#version 300 es
precision highp float;
in vec2 a_pos;
out vec2 vUv;
void main(){
  vUv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
out vec4 fragColor;
in vec2 vUv;

// --- simplex 2D noise ---
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1;i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m;m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

float fbm(vec2 p){
  float f=0.0;
  f+=0.5000*snoise(p); p*=2.01;
  f+=0.2500*snoise(p); p*=2.02;
  f+=0.1250*snoise(p); p*=2.03;
  f+=0.0625*snoise(p);
  return f;
}

void main(){
  vec2 uv = vUv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_time * 0.18;

  // Mouse influence (subtle warp)
  vec2 mouse = u_mouse * 0.15;
  p += mouse * 0.3;

  // Layered organic noise
  float n1 = fbm(p * 1.2 + vec2(t * 0.7, t * 0.5));
  float n2 = fbm(p * 0.8 + vec2(-t * 0.4, t * 0.6) + n1 * 0.5);
  float n3 = fbm(p * 1.5 + vec2(t * 0.3, -t * 0.8) + n2 * 0.3);

  // Brand colors
  vec3 purple = vec3(0.6, 0.271, 1.0);    // #9945FF
  vec3 gold   = vec3(1.0, 0.843, 0.0);    // #FFD700
  vec3 green  = vec3(0.078, 0.945, 0.584); // #14F195
  vec3 dark   = vec3(0.024, 0.024, 0.04);  // #06060a

  // Color mixing based on noise
  float mix1 = smoothstep(-0.3, 0.6, n1);
  float mix2 = smoothstep(-0.2, 0.7, n2);
  float mix3 = smoothstep(0.0, 0.8, n3);

  vec3 c1 = mix(purple, gold, mix1);
  vec3 c2 = mix(c1, green, mix2 * 0.45);
  vec3 color = mix(dark, c2, mix3 * 0.38);

  // Concentrated glow spots
  float glow1 = exp(-2.5 * length(uv - vec2(0.3 + sin(t) * 0.12, 0.4 + cos(t * 0.7) * 0.12)));
  float glow2 = exp(-3.0 * length(uv - vec2(0.7 + cos(t * 0.8) * 0.1, 0.6 + sin(t * 0.5) * 0.1)));
  float glow3 = exp(-3.5 * length(uv - vec2(0.5 + sin(t * 0.6) * 0.15, 0.3 + cos(t * 0.9) * 0.08)));
  color += purple * glow1 * 0.14;
  color += gold * glow2 * 0.12;
  color += green * glow3 * 0.08;

  // Soft vignette
  float vig = 1.0 - 0.2 * length(uv - 0.5);
  color *= vig;

  // Slight grain for texture
  float grain = (fract(sin(dot(uv * u_time * 0.01, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.015;
  color += grain;

  fragColor = vec4(max(color, 0.0), 1.0);
}`

export default function HeroBg() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) return

    // Compile shaders
    function createShader(type, src) {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
        gl.deleteShader(s)
        return null
      }
      return s
    }

    const vs = createShader(gl.VERTEX_SHADER, VERT)
    const fs = createShader(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    // Fullscreen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse tracking
    const onMouse = (e) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Render loop
    const start = performance.now()
    const render = () => {
      resize()
      const m = mouseRef.current
      m.x += (m.tx - m.x) * 0.03
      m.y += (m.ty - m.y) * 0.03

      const t = (performance.now() - start) / 1000
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, m.x, m.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
