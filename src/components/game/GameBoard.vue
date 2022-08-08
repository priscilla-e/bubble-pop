<template>
  <section>
    <base-card>
      <div v-if="!startGame" id="start-game">
        <base-button @click="startTheGame">Start Game</base-button>
      </div>
      <div v-if="startInstructions">
        <game-instructions
          :minScore="minScorePerRound"
          @play="play"
        ></game-instructions>
      </div>
      <div v-if="isPlaying && hasSticks">
        <div class="menu-bar">
          <h3>Round: {{ currentRound }}</h3>
          <h3>Sticks: {{ sticksLeft }}</h3>
          <h3>Total Score: {{ totalScore }}</h3>
        </div>
        <game-bubbles :current-pot="currentPot"></game-bubbles>
      </div>
      <div v-if="isPlaying && roundWon" class="won-round">
        <h2>Well Done!</h2>
        <h3>You won this round by {{ currentRoundScore }}!</h3>
        <div class="actions">
          <base-button @click="quitGame">End Game</base-button>
          <base-button @click="play">Next Round</base-button>
        </div>
      </div>
      <div v-if="isPlaying && !roundWon && !hasSticks" class="won-round">
        <h2>Game Over!</h2>
        <h3>
          Sorry! You didn't win this one.<br />
          Your total score is {{ totalScore }}
        </h3>
        <base-button @click="quitGame">End Game</base-button>
      </div>
    </base-card>
  </section>
</template>

<script>
import GameInstructions from './GameInstruction.vue';
import GameBubbles from './GameBubbles.vue';

export default {
  components: {
    GameInstructions,
    GameBubbles,
  },
  data() {
    return {
      startGame: false,
      startInstructions: false,
      isPlaying: false,
      roundWon: false,
      currentRound: 1,
      currentRoundScore: 0,
      minScorePerRound: 100,
      sticksLeft: 6,
      currentPot: null,
    };
  },
  provide() {
    return {
      popBubble: this.popBubble,
    };
  },
  watch: {
    sticksLeft(value) {
      if (value === 0) {
        if (this.currentRoundScore >= this.minScorePerRound) {
          this.roundWon = true;
          this.currentRound++;
        }
      }
    },
  },
  computed: {
    hasSticks() {
      return this.sticksLeft > 0;
    },
    totalScore() {
      return this.$store.getters.totalScore;
    },
    isHighestScore() {
      return (
        this.$store.getters.totalScore > this.$store.getters.overallHighestScore
      );
    },
  },
  methods: {
    startTheGame() {
      this.startGame = true;
      this.startInstructions = true;
    },
    generatePot() {
      const newPot = [];
      for (let i = 0; i < 9; i++) {
        const randomPts = Math.floor(Math.random() * (40 - 0)) + 0;
        const potData = { pts: randomPts, poped: false };
        newPot.push(potData);
      }
      this.currentPot = newPot;
    },
    play() {
      this.isPlaying = true;
      this.startInstructions = false;
      this.roundWon = false;
      this.sticksLeft = 6;
      this.generatePot();
      this.currentRoundScore = 0;
    },
    popBubble(index) {
      this.currentPot[index].poped = true;
      const points = this.currentPot[index].pts;
      this.sticksLeft--;
      this.currentRoundScore += points;
      this.$store.dispatch('addScore', points);
    },
    resetTotalScore() {
      this.$store.dispatch('setTotalScore', 0);
    },
    quitGame() {
      this.isPlaying = false;
      this.currentRound = 1;
      this.resetTotalScore();
      this.startGame = !this.startGame;
    },
  },
  created() {
    const savedScores = this.$store.getters.savedScores;
    this.$store.dispatch('setHighestScore', savedScores);
  },
};
</script>

<style scoped>
#start-game {
  background-color: #dcf6fc;
  padding: 9rem 0;
  text-align: center;
}

.menu-bar {
  background-color: #200070;
  color: white;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.won-round {
  text-align: center;
}

.won-round h3 {
  padding: 2rem 0;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
