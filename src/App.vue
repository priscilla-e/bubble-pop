<template>
  <the-header></the-header>
  <game-board></game-board>
  <game-leaderboard></game-leaderboard>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import GameBoard from './components/game/GameBoard.vue';
import GameLeaderboard from './components/game/GameLeaderboard.vue';

export default {
  components: {
    TheHeader,
    GameBoard,
    GameLeaderboard,
  },
  provide() {
    return {
      loadScores: this.loadScores,
    };
  },
  methods: {
    loadScores() {
      this.$store.dispatch('loadScores');
    },
  },
  created() {
    this.loadScores();
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Roboto:wght@400;700&display=swap);
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

h2,
h3 {
  font-family: 'Fredoka One', cursive;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
