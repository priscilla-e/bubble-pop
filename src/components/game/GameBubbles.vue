<template>
  <div class="bubble--container">
    <div
      v-for="(item, index) in currentPot"
      :key="item"
      :class="'bubble' + index"
    >
      <span
        @click="popBubble(index)"
        :class="{ bubble: true, poped: isPoped(index) }"
      >
        {{ currentPot[index].poped ? currentPot[index].pts : '' }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentPot'],
  inject: ['popBubble'],
  methods: {
    isPoped(index) {
      return this.currentPot[index].poped;
    },
    // bubble(index) {
    // },
  },
};
</script>

<style scoped>
.bubble--container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 2.5rem;
  grid-row-gap: 2.5rem;
  align-items: center;
  justify-items: center;
  animation: fade-in 0.5s ease-out;
}
.bubble1 {
  grid-area: 1 / 1 / 2 / 2;
}
.bubble2 {
  grid-area: 1 / 2 / 2 / 3;
}
.bubble3 {
  grid-area: 1 / 3 / 2 / 4;
}
.bubble4 {
  grid-area: 2 / 3 / 3 / 4;
}
.bubble5 {
  grid-area: 2 / 2 / 3 / 3;
}
.bubble6 {
  grid-area: 2 / 1 / 3 / 2;
}
.bubble7 {
  grid-area: 3 / 1 / 4 / 2;
}
.bubble8 {
  grid-area: 3 / 2 / 4 / 3;
}
.bubble9 {
  grid-area: 3 / 3 / 4 / 4;
}

.bubble,
.poped {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3ad4ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  font-family: 'Fredoka One', cursive;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  color: black;
  cursor: pointer;
  font-size: 1.2em;
}

.poped {
  background: #ccc;
  animation: fade-and-bounce 0.8s ease-out;
}

@media screen and (max-width: 480px) {
  .bubble,
  .poped {
    width: 60px;
    height: 60px;
    font-size: 1em;
  }
}

@keyframes fade-and-bounce {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.25);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
