<template>
  <div
    class="skeleton"
    :style="{ height: `${size}px` }"
  >
    <div class="skeleton__loader" />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
$base-color: rgba(
  $color: #b4bbbf,
  $alpha: 0.35,
);
$shine-color: #f0f9ff;
$animation-duration: 2s;

@mixin background-gradient {
  background-image: linear-gradient(
    90deg,
    $base-color 0px,
    $shine-color 45px,
    $base-color 90px
  );
  background-size: 200%;
}

.skeleton {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  &__loader {
    border-radius: 10px;
    width: 100%;
    height: 100%;

    box-shadow: 0 2px 5px rgba($color: #000000, $alpha: 0.23);
    animation: shine $animation-duration infinite;
    @include background-gradient;
  }

  @keyframes shine {
    0% {
      background-position: -10vw;
    }

    60% {
      background-position: 35vw;
    }

    100% {
      background-position: 100vw;
    }
  }
}
</style>
