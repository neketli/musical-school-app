<template>
  <div
    class="ui-skeleton"
    :style="{ height: `${size}px` }"
  >
    <div class="ui-skeleton__loader" />
  </div>
</template>
  
  <script>
    export default {
      props: {
        size: {
          type: Number,
          required: true
        }
      }
    }
  </script>
  
  <style lang="scss">
    .ui-skeleton {
      display: flex;
      background-color: rgba(169, 169, 169, 0.7);
      width: 100%;
      height: 100%;
      border-radius: 10px;
  
      &__loader {
        border-radius: 10px;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          110deg,
          rgba(169, 169, 169, 0.7) 8%,
          rgba(243, 245, 246, 1) 12%,
          rgba(169, 169, 169, 0.7) 18%
        );
        background-size: 200% 100%;
        animation: 2.5s shine linear infinite;
      }
  
      @keyframes shine {
        to {
          background-position-x: -200%;
        }
      }
    }
  </style>
  