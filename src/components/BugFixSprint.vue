<template>
  <section class="section" id="bug-sprint">
    <div class="section-header">
      <h2>{{ copy.sprintTitle }}</h2>
      <p>{{ copy.sprintIntro }}</p>
    </div>
    <div class="sprint">
    <div class="sprint-panel">
      <div class="sprint-stat">
        <span>{{ copy.sprintScore }}</span>
        <strong>{{ score }}</strong>
      </div>
      <div class="sprint-stat">
        <span>{{ copy.sprintHighscore }}</span>
        <strong>{{ highScore }}</strong>
      </div>
      <div class="sprint-stat">
        <span>{{ copy.sprintCombo }}</span>
        <strong>x{{ combo }}</strong>
      </div>
      <div class="sprint-stat">
        <span>{{ copy.sprintTime }}</span>
        <strong>{{ timeLeft }}s</strong>
      </div>
      <button class="primary" @click="start" :disabled="running">
          {{ running ? copy.sprintRunning : copy.sprintStart }}
        </button>
      </div>
      <div class="sprint-field" ref="field">
        <button
          v-for="bug in bugs"
          :key="bug.id"
          class="bug"
          :style="{ left: bug.x + '%', top: bug.y + '%', animationDuration: bug.speed + 'ms' }"
          @click="hit(bug.id)"
        >
          🐞
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

type Bug = { id: number; x: number; y: number; speed: number };

type CopyShape = {
  sprintTitle: string;
  sprintIntro: string;
  sprintScore: string;
  sprintTime: string;
  sprintStart: string;
  sprintRunning: string;
};

const props = defineProps<{ copy: CopyShape }>();
props;

const bugs = ref<Bug[]>([]);
const score = ref(0);
const highScore = ref(0);
const timeLeft = ref(10);
const running = ref(false);
const combo = ref(0);
let timer: number | null = null;
let spawner: number | null = null;
let bugId = 0;

function spawnBug() {
  const bug: Bug = {
    id: bugId++,
    x: Math.random() * 90,
    y: Math.random() * 80,
    speed: 400 + Math.random() * 800
  };
  bugs.value.push(bug);
  setTimeout(() => {
    bugs.value = bugs.value.filter((b) => b.id !== bug.id);
  }, 1200);
}

function start() {
  if (running.value) return;
  running.value = true;
  score.value = 0;
  combo.value = 0;
  timeLeft.value = 10;
  bugs.value = [];
  highScore.value = Number(localStorage.getItem('bugfix_highscore') || 0);
  spawner = window.setInterval(spawnBug, 450);
  timer = window.setInterval(() => {
    timeLeft.value -= 1;
    if (timeLeft.value <= 0) {
      stop();
    }
  }, 1000);
}

function stop() {
  running.value = false;
  if (timer) window.clearInterval(timer);
  if (spawner) window.clearInterval(spawner);
  timer = null;
  spawner = null;
  if (score.value > highScore.value) {
    highScore.value = score.value;
    localStorage.setItem('bugfix_highscore', String(highScore.value));
  }
  combo.value = 0;
}

function hit(id: number) {
  if (!running.value) return;
  combo.value += 1;
  score.value += 1 + Math.min(combo.value, 5);
  bugs.value = bugs.value.filter((bug) => bug.id !== id);
}

highScore.value = Number(localStorage.getItem('bugfix_highscore') || 0);

onUnmounted(() => {
  stop();
});
</script>
