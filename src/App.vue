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

h2, h3 {
  font-family: 'Fredoka One', cursive;
}
</style>
