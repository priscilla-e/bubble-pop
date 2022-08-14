<template>
  <div>
    <h2>How To Play</h2>
    <transition-group name="instru">
      <ul v-if="visible">
        <li v-for="inst in instructions" :key="inst">{{ inst }}</li>
      </ul>
    </transition-group>
    <div class="actions">
      <base-button @click="$emit('play')"> Play </base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['minScore'],
  emits: ['play'],
  data() {
    return {
      visible: false,
      instructions: [
        'Pop the bubbles to score points',
        'You lose a round if you score less than ' + this.minScore + ' points.',
        "If you get a high score, don't forget to save your game to the Leaderboard!",
      ],
    };
  },
  mounted() {
    this.visible = true;
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 1rem 0;
  border: 1px solid #42424242;
  border-radius: 12px;
  padding: 1rem;
}

.instru-enter-active {
  animation: fade-in 1.2s ease-out;
}

.actions {
  display: flex;
  justify-content: center;
}
</style>
