<template>
  <div class="loading-page">
    <div class="loading-animation">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>
  
<style scoped>
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
}

.loading-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: dotAnimation 0.8s infinite ease-in-out;
}

.dot:nth-child(1) {
  background-color: #ff3d00;
  animation-delay: 0.1s;
}

.dot:nth-child(2) {
  background-color: #e65100;
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  background-color: #ff6d00;
  animation-delay: 0.3s;
}

@keyframes dotAnimation {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
    background-color: #ff8f00;
  }

  100% {
    transform: translateY(0);
  }
}
</style>
  