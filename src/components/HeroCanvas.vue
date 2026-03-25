<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const canvas_ref = ref<HTMLCanvasElement | null>(null)
const reduced_motion = usePreferredReducedMotion()

let frame_id = 0
let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let start_time = 0
let pointer_x = 0.5
let pointer_y = 0.5
let resize_handler: (() => void) | null = null
let pointer_leave_handler: (() => void) | null = null
let pointer_move_handler: ((event: PointerEvent) => void) | null = null
let position_buffer: WebGLBuffer | null = null
let texture_coord_buffer: WebGLBuffer | null = null
let index_buffer: WebGLBuffer | null = null

const vertex_shader_source = `
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;
void main() {
  gl_Position = aVertexPosition;
  vTextureCoord = aTextureCoord;
}`

// Integrated from Shader Reminder source (Shader #2: Ether).
const fragment_shader_source = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform bool hasActiveReminders;
uniform bool hasUpcomingReminders;
uniform bool disableCenterDimming;
varying vec2 vTextureCoord;

// Ether by nimitz 2014
#define t iTime
mat2 m(float a){float c=cos(a), s=sin(a);return mat2(c,-s,s,c);}
float map(vec3 p, bool isActive, bool isUpcoming){
    p.xz*= m(t*0.4);p.xy*= m(t*0.3);
    vec3 q = p*2.+t;
    return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = fragCoord.xy/min(iResolution.x, iResolution.y) - vec2(.9, .5);
    p.x += 0.4;
    
    vec3 cl = vec3(0.);
    float d = 2.5;
    
    for(int i=0; i<=5; i++) {
        vec3 p3d = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
        float rz = map(p3d, hasActiveReminders, hasUpcomingReminders);
        float f = clamp((rz - map(p3d+.1, hasActiveReminders, hasUpcomingReminders))*0.5, -.1, 1.);
        
        vec3 baseColor;
        if(hasActiveReminders) {
            baseColor = vec3(0.05, 0.2, 0.5) + vec3(4.0, 2.0, 5.0)*f;
        } else if(hasUpcomingReminders) {
            baseColor = vec3(0.05, 0.3, 0.1) + vec3(2.0, 5.0, 1.0)*f;
        } else {
            baseColor = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0)*f;
        }
        
        cl = cl*baseColor + smoothstep(2.5, .0, rz)*.7*baseColor;
        d += min(rz, 1.);
    }
    
    float mouseInfluence = 0.0;
    if(iMouse.x > 0.0 || iMouse.y > 0.0) {
        vec2 mousePos = iMouse.xy;
        float mouseDist = length(p - (mousePos*2.0-vec2(1.0))*0.5);
        mouseInfluence = smoothstep(0.6, 0.0, mouseDist);
        if(hasActiveReminders) {
            cl += vec3(0.2, 0.4, 1.0) * mouseInfluence * 0.3;
        } else if(hasUpcomingReminders) {
            cl += vec3(0.2, 1.0, 0.4) * mouseInfluence * 0.3;
        } else {
            cl += vec3(0.5, 0.3, 0.7) * mouseInfluence * 0.3;
        }
    }
    
    vec2 center = iResolution.xy * 0.5;
    float dist = distance(fragCoord, center);
    float radius = min(iResolution.x, iResolution.y) * 0.5;
    float centerDim = disableCenterDimming ? 1.0 : smoothstep(radius * 0.3, radius * 0.5, dist);
    
    fragColor = vec4(cl, 1.0);
    if (!disableCenterDimming) {
        fragColor.rgb = mix(fragColor.rgb * 0.3, fragColor.rgb, centerDim);
    }
}

void main() {
    vec2 fragCoord = vTextureCoord * iResolution;
    vec4 color;
    mainImage(color, fragCoord);
    gl_FragColor = color;
}`

function create_shader(
  context: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = context.createShader(type)
  if (!shader) return null
  context.shaderSource(shader, source)
  context.compileShader(shader)
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    return null
  }
  return shader
}

function init_gl(canvas: HTMLCanvasElement): boolean {
  gl = canvas.getContext('webgl', { alpha: false })
  if (!gl) return false

  const vertex_shader = create_shader(gl, gl.VERTEX_SHADER, vertex_shader_source)
  const fragment_shader = create_shader(gl, gl.FRAGMENT_SHADER, fragment_shader_source)
  if (!vertex_shader || !fragment_shader) return false

  program = gl.createProgram()
  if (!program) return false
  gl.attachShader(program, vertex_shader)
  gl.attachShader(program, fragment_shader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
  gl.useProgram(program)
  gl.clearColor(0.02, 0.02, 0.02, 1.0)

  position_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
    gl.STATIC_DRAW,
  )

  texture_coord_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, texture_coord_buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    gl.STATIC_DRAW,
  )

  index_buffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)

  const position_loc = gl.getAttribLocation(program, 'aVertexPosition')
  gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer)
  gl.vertexAttribPointer(position_loc, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(position_loc)

  const texture_loc = gl.getAttribLocation(program, 'aTextureCoord')
  gl.bindBuffer(gl.ARRAY_BUFFER, texture_coord_buffer)
  gl.vertexAttribPointer(texture_loc, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(texture_loc)

  return true
}

function sync_canvas_size(canvas: HTMLCanvasElement): void {
  const pixel_ratio = Math.min(window.devicePixelRatio, 2)
  const width = Math.floor(canvas.clientWidth * pixel_ratio)
  const height = Math.floor(canvas.clientHeight * pixel_ratio)
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    gl?.viewport(0, 0, width, height)
  }
}

function render_frame(now: number): void {
  const canvas = canvas_ref.value
  if (!canvas || !gl || !program) return
  sync_canvas_size(canvas)
  const time_sec = (now - start_time) / 1000
  const motion_factor = reduced_motion.value ? 0.6 : 1.0

  gl.useProgram(program)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.uniform2f(gl.getUniformLocation(program, 'iResolution'), canvas.width, canvas.height)
  gl.uniform1f(gl.getUniformLocation(program, 'iTime'), time_sec * motion_factor)
  gl.uniform2f(gl.getUniformLocation(program, 'iMouse'), pointer_x, pointer_y)
  gl.uniform1i(gl.getUniformLocation(program, 'hasActiveReminders'), 0)
  gl.uniform1i(gl.getUniformLocation(program, 'hasUpcomingReminders'), 0)
  gl.uniform1i(gl.getUniformLocation(program, 'disableCenterDimming'), 1)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer)
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
  frame_id = window.requestAnimationFrame(render_frame)
}

function handle_pointer_move(event: PointerEvent): void {
  const canvas = canvas_ref.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  pointer_x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  pointer_y = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height))
}

onMounted(() => {
  const canvas = canvas_ref.value
  if (!canvas) return
  if (!init_gl(canvas)) {
    canvas.style.background = '#050505'
    return
  }
  start_time = performance.now()
  frame_id = window.requestAnimationFrame(render_frame)
  resize_handler = () => sync_canvas_size(canvas)
  window.addEventListener('resize', resize_handler)
  pointer_move_handler = (event: PointerEvent) => handle_pointer_move(event)
  window.addEventListener('pointermove', pointer_move_handler, { passive: true })
  pointer_leave_handler = () => {
    pointer_x = 0.5
    pointer_y = 0.5
  }
  canvas.addEventListener('pointerleave', pointer_leave_handler)
})

onUnmounted(() => {
  window.cancelAnimationFrame(frame_id)
  if (resize_handler) {
    window.removeEventListener('resize', resize_handler)
  }
  if (pointer_move_handler) {
    window.removeEventListener('pointermove', pointer_move_handler)
  }
  if (pointer_leave_handler) {
    canvas_ref.value?.removeEventListener('pointerleave', pointer_leave_handler)
  }
  if (gl && program) {
    gl.deleteProgram(program)
  }
  if (gl) {
    if (position_buffer) gl.deleteBuffer(position_buffer)
    if (texture_coord_buffer) gl.deleteBuffer(texture_coord_buffer)
    if (index_buffer) gl.deleteBuffer(index_buffer)
  }
})
</script>

<template>
  <canvas ref="canvas_ref" class="hero_canvas" />
</template>

<style scoped>
.hero_canvas {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0.98;
}
</style>
