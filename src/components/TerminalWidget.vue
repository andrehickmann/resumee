<template>
  <section class="section" id="terminal">
    <div class="section-header">
      <h2>{{ copy.terminalTitle }}</h2>
      <p>{{ copy.terminalIntro }}</p>
    </div>
    <div class="terminal">
      <div class="terminal-output">
        <div v-for="(line, index) in lines" :key="index" class="terminal-line">
          <span v-if="line.prompt" class="prompt">$</span>
          <span>{{ line.text }}</span>
        </div>
      </div>
      <form class="terminal-input" @submit.prevent="run">
        <span class="prompt">$</span>
        <input
          v-model="input"
          type="text"
          :placeholder="copy.terminalPlaceholder"
          aria-label="Terminal input"
        />
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Line = { text: string; prompt?: boolean };

type StackItem = { title: string; tools: string };

type CopyShape = {
  terminalTitle: string;
  terminalIntro: string;
  terminalPlaceholder: string;
  terminalHelp: string[];
  contactEmail: string;
  stackItems: StackItem[];
};

const props = defineProps<{
  copy: CopyShape;
  projectCount: number;
  industryCount: number;
}>();

const input = ref('help');
const lines = ref<Line[]>([
  { text: 'Type "help" to list commands.' },
  { text: 'help', prompt: true },
  { text: props.copy.terminalHelp.join(' · ') }
]);

function push(line: Line) {
  lines.value.push(line);
  const container = document.querySelector('.terminal-output');
  if (container) {
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }
}

function run() {
  const cmd = input.value.trim().toLowerCase();
  if (!cmd) return;
  push({ text: cmd, prompt: true });
  if (cmd === 'help') {
    push({ text: props.copy.terminalHelp.join(' · ') });
  } else if (cmd === 'projects') {
    push({ text: `Projects: ${props.projectCount}` });
  } else if (cmd === 'industries') {
    push({ text: `Industries: ${props.industryCount}` });
  } else if (cmd === 'stack') {
    const names = props.copy.stackItems.map((item) => item.title).join(' · ');
    push({ text: names });
  } else if (cmd === 'contact') {
    push({ text: props.copy.contactEmail });
  } else if (cmd === 'clear') {
    lines.value = [];
  } else {
    push({ text: 'Unknown command. Type "help".' });
  }
  input.value = '';
}
</script>
