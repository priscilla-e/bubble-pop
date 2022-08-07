<template>
  <section>
    <base-card>
      <div v-if="!startGame" id="start-game">
        <base-button @click="startTheGame">Start Game</base-button>
      </div>
      <div v-if="startInstructions" id="instructions">
        <game-instructions
          :minScore="minScorePerRound"
          @play="play"
        ></game-instructions>
      </div>
    </base-card>
  </section>
</template>

<script>
import GameInstructions from './GameInstruction.vue';

export default {
  components: {
    GameInstructions,
  },
  data() {
    return {
      startGame: false,
      startInstructions: false,
      currentRound: 0,
      minScorePerRound: 40,
    };
  },
  methods: {
    startTheGame() {
      this.startGame = true;
      this.startInstructions = true;
    },
    play() {
      this.startInstructions = false;
    },
  },
};
</script>

<style scoped>
#start-game {
  background-color: #e6ddfb;
  padding: 9rem 0;
  text-align: center;
}
</style>
