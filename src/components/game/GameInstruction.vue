<template>
  <h2>How To Play</h2>
  <ul v-for="inst in instructions" :key="inst">
    <li>{{ inst }}</li>
  </ul>
  <div class="actions">
    <base-button @click="$emit('play')"> Play </base-button>
  </div>
</template>

<script>
export default {
  props: ['minScore'],
  emits: ['play'],
  data() {
    return {
      instructions: [
        'Pop the bubbles to score points',
        'You lose a round if you score less than ' + this.minScore + ' points.',
        "If you get a high score, don't forget to save your game to the Leaderboard!",
      ],
    };
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

.actions {
  display: flex;
  justify-content: center;
}
</style>
