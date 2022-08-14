<template>
  <transition-group name="animate">
    <div class="card" v-if="visible">
      <slot></slot>
    </div>
  </transition-group>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    this.visible = true;
  },
};

</script>
<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}

.animate-enter-active {
  animation: slide-in 0.3s ease-in;
}


@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
