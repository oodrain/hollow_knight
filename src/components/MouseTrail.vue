<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const particles: Particle[] = [];
let animationId: number;

// Hollow Knight style colors: White, Pale Grey, faint Soul Blue
const colors = [
  'rgba(255, 255, 255, 0.8)', 
  'rgba(220, 220, 220, 0.6)', 
  'rgba(200, 210, 230, 0.4)' // Slight cool tint
];

const createParticle = (x: number, y: number) => {
  const size = Math.random() * 4 + 1; // 1-5px
  const speedX = (Math.random() - 0.5) * 0.8;
  const speedY = (Math.random() - 0.5) * 0.8;
  const life = Math.random() * 30 + 15;
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  particles.push({
    x,
    y,
    size,
    speedX,
    speedY,
    life,
    maxLife: life,
    color,
  });
};

const updateParticles = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY; // Gravity? No, floating dust/soul feels better. maybe slight drift upward
    p.y -= 0.2; // Slight upward float
    p.life--;
    
    if (p.life <= 0 || p.size <= 0.1) {
      particles.splice(i, 1);
      i--;
      continue;
    }
    
    // Fade out
    const opacity = p.life / p.maxLife;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Shrink slightly
    p.size *= 0.96;
  }
  ctx.globalAlpha = 1.0;
};

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  updateParticles(ctx);
  animationId = requestAnimationFrame(animate);
};

const handleMouseMove = (e: MouseEvent) => {
    // Spawn particles
    const count = 2; // particles per event
    for(let i=0; i<count; i++) {
        // Add some jitter to position
        const offsetX = (Math.random() - 0.5) * 5;
        const offsetY = (Math.random() - 0.5) * 5;
        createParticle(e.clientX + offsetX, e.clientY + offsetY);
    }
};

const handleResize = () => {
    if (canvasRef.value) {
        canvasRef.value.width = window.innerWidth;
        canvasRef.value.height = window.innerHeight;
    }
}

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
  }
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationId);
});
</script>

<template>
  <canvas ref="canvasRef" class="mouse-trail-canvas"></canvas>
</template>

<style scoped>
.mouse-trail-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* Let clicks pass through */
  z-index: 9999; /* On top of everything */
}
</style>