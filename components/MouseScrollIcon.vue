<template>
  <svg
    width="20"
    height="40"
    viewBox="0 0 20 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="18"
      height="38"
      rx="9"
      stroke="white"
      stroke-width="2"
    />
    <circle class="mouse-animation" cx="10" cy="32" r="3" fill="white" />
  </svg>
</template>

<script>
export default {};
</script>

<style>
@keyframes slide {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.mouse-animation {
  animation: slide 2s ease-in-out infinite;
}
</style>
