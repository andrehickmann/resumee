<template>
  <div class="construction-page">
    <div class="construction-container">
      <div class="construction-icon">🚧</div>
      <h1>{{ $t('construction.title') }}</h1>
      <p class="construction-message">{{ $t('construction.message') }}</p>
      <div class="construction-info">
        <p>{{ $t('construction.contact') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Under construction page
</script>

<style scoped>
.construction-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.construction-container {
  text-align: center;
  color: white;
  max-width: 600px;
}

.construction-icon {
  font-size: 6rem;
  margin-bottom: 2rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.construction-container h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.construction-message {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.construction-info {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
}

.construction-info p {
  opacity: 0.9;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .construction-icon {
    font-size: 4rem;
  }
  
  .construction-container h1 {
    font-size: 2rem;
  }
  
  .construction-message {
    font-size: 1.1rem;
  }
}
</style>
