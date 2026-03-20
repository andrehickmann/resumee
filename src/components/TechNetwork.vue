<template>
  <div class="tech-network">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationId: number;
let nodes: Node[] = [];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  color: string;
}

const techLabels = [
  'Docker',
  'PHP',
  'Java',
  'TypeScript',
  'Vue.JS',
  'PostgreSQL',
  'Redis',
  'Kubernetes',
  'AWS',
  'Node.js',
  'React',
  'MySQL',
  'Git',
  'Linux',
  'Scala',
  'PostGis',
  'GIS',
  'Requirements Engineering',
  'AI Driven Development',
  'SCRUM',
  'OpenAPI',
  'REST',
  'GraphQL',
  'Testdriven Development',
  'Angular',
  'Zend Framework',
  'Doctrine',
  'iOS',
  'Flutter',
  'Play Framework',
  'Symfony',
  'FastAPI',
  'Python',
  'Codex',
  'Copilot CLI',
  'Claude CLI',
  'Playwright',
  'Cypress',
  'Jira/Confluence',
  'Agile',
];

// Generate color from string hash
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash % 360);
  const s = 65 + (Math.abs(hash) % 20); // 65-85% saturation
  const l = 55 + (Math.abs(hash >> 8) % 15); // 55-70% lightness

  return `hsl(${h}, ${s}%, ${l}%)`;
}

const techs = techLabels.map((label) => ({
  label,
  color: stringToColor(label),
}));

const props = defineProps<{
  avatarCenter?: { x: number; y: number };
  avatarRadius?: number;
}>();

function initNodes() {
  if (!canvas.value) return;
  const w = canvas.value.width;
  const h = canvas.value.height;
  const padding = 60; // Padding for text labels

  nodes = techs.map((tech) => ({
    x: padding + Math.random() * (w - padding * 2),
    y: padding + Math.random() * (h - padding * 2),
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    label: tech.label,
    color: tech.color,
  }));
}

function drawNetwork() {
  if (!ctx || !canvas.value) return;
  const w = canvas.value.width;
  const h = canvas.value.height;

  ctx.clearRect(0, 0, w, h);

  // Draw connections
  nodes.forEach((node, i) => {
    nodes.slice(i + 1).forEach((other) => {
      const dx = other.x - node.x;
      const dy = other.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
        const opacity = (1 - dist / 200) * 0.5;
        ctx!.strokeStyle = `rgba(249, 115, 22, ${opacity})`;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(node.x, node.y);
        ctx!.lineTo(other.x, other.y);
        ctx!.stroke();
      }
    });
  });

  // Draw nodes
  nodes.forEach((node) => {
    // Glow effect
    ctx!.shadowBlur = 10;
    ctx!.shadowColor = node.color;

    ctx!.fillStyle = node.color;
    ctx!.beginPath();
    ctx!.arc(node.x, node.y, 5, 0, Math.PI * 2);
    ctx!.fill();

    ctx!.shadowBlur = 0;

    // Label with crisp shadow
    ctx!.font = 'bold 13px Space Grotesk, sans-serif';
    ctx!.textAlign = 'center';
    ctx!.textBaseline = 'middle';

    // Shadow for readability
    ctx!.shadowBlur = 3;
    ctx!.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx!.shadowOffsetX = 1;
    ctx!.shadowOffsetY = 1;

    ctx!.fillStyle = node.color;
    ctx!.fillText(node.label, node.x, node.y - 14);

    ctx!.shadowBlur = 0;
    ctx!.shadowOffsetX = 0;
    ctx!.shadowOffsetY = 0;
  });
}

function updateNodes() {
  if (!canvas.value) return;
  const w = canvas.value.width;
  const h = canvas.value.height;
  const padding = 60;

  nodes.forEach((node, index) => {
    // Minimum speed to keep nodes moving
    const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    const minSpeed = 0.2;

    if (currentSpeed < minSpeed) {
      const angle = Math.random() * Math.PI * 2;
      node.vx += Math.cos(angle) * 0.1;
      node.vy += Math.sin(angle) * 0.1;
    }

    node.x += node.vx;
    node.y += node.vy;

    // Avatar center (right side, middle)
    const avatarX = w * 0.75;
    const avatarY = h * 0.5;
    const avatarRadius = 120;

    // Distance to avatar center
    const dx = node.x - avatarX;
    const dy = node.y - avatarY;
    const distToAvatar = Math.sqrt(dx * dx + dy * dy);

    // Gentle attraction/repulsion to create flowing effect
    if (distToAvatar < avatarRadius + 200) {
      const angle = Math.atan2(dy, dx);

      // Some nodes orbit, others float away
      const orbitDirection = index % 3 === 0 ? 1 : -1;
      const force = 0.03 * (1 - distToAvatar / (avatarRadius + 200));

      node.vx += Math.cos(angle + (Math.PI / 2) * orbitDirection) * force;
      node.vy += Math.sin(angle + (Math.PI / 2) * orbitDirection) * force;
    }

    // Repulsion between nodes to prevent clumping
    nodes.forEach((other, otherIndex) => {
      if (index === otherIndex) return;
      const odx = other.x - node.x;
      const ody = other.y - node.y;
      const dist = Math.sqrt(odx * odx + ody * ody);

      if (dist < 80 && dist > 0) {
        const repelForce = 0.5 / dist;
        node.vx -= (odx / dist) * repelForce;
        node.vy -= (ody / dist) * repelForce;
      }
    });

    // Bounce off edges with padding
    if (node.x < padding || node.x > w - padding) node.vx *= -1;
    if (node.y < padding || node.y > h - padding) node.vy *= -1;

    // Keep in bounds with padding
    node.x = Math.max(padding, Math.min(w - padding, node.x));
    node.y = Math.max(padding, Math.min(h - padding, node.y));

    // Speed limit
    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    if (speed > 0.8) {
      node.vx = (node.vx / speed) * 0.8;
      node.vy = (node.vy / speed) * 0.8;
    }

    // Very light friction (less than before to keep movement)
    node.vx *= 0.995;
    node.vy *= 0.995;
  });
}

function animate() {
  updateNodes();
  drawNetwork();
  animationId = requestAnimationFrame(animate);
}

function resize() {
  if (!canvas.value) return;
  const rect = canvas.value.parentElement?.getBoundingClientRect();
  if (rect) {
    canvas.value.width = rect.width;
    canvas.value.height = rect.height;
    initNodes();
  }
}

onMounted(() => {
  if (!canvas.value) return;
  ctx = canvas.value.getContext('2d');
  resize();
  animate();
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
});
</script>

<style scoped>
.tech-network {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  z-index: 0;
  overflow: visible;
  opacity: 0.3;
  pointer-events: none;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
