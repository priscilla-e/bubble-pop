<template>
  <the-header></the-header>
  <game-item></game-item>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import GameItem from './components/game/GameItem.vue';

export default {
  components: {
    TheHeader,
    GameItem,
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Roboto:wght@400;700&display=swap);

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
