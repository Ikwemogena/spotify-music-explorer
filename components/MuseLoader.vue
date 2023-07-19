<!-- <template>
    <div class="loading-page">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  </template>
  
  <style scoped>
  .loading-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-page p {
    margin-top: 10px;
  }
  </style>
   -->

   <!-- <template>
    <div class="loading-page">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
      <div class="page-reveal"></div>
    </div>
  </template>
  
  <style scoped>
  .loading-page {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
    color: #fff;
  }
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-page p {
    margin-top: 10px;
  }
  
  .page-reveal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    animation: reveal 1s ease-out forwards;
  }
  
  @keyframes reveal {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-100%);
    }
  }
  </style>
   -->

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
  