<template>
  <section>
    <base-card>
      <div v-if="!startGame" class="game-card">
        <base-button @click="startTheGame">Start Game</base-button>
      </div>
      <base-spinner v-else-if="isLoading" class="game-card"></base-spinner>
      <div v-else-if="startInstructions">
        <game-instructions
          :minScore="minScorePerRound"
          @play="play"
        ></game-instructions>
      </div>
      <div v-else-if="isPlaying && hasSticks">
        <div class="menu-bar">
          <h3>Round: {{ currentRound }}</h3>
          <h3>Sticks: {{ sticksLeft }}</h3>
          <h3>Total Score: {{ totalScore }}</h3>
        </div>
        <game-bubbles :current-pot="currentPot"></game-bubbles>
      </div>
      <div v-else-if="isPlaying && roundWon" class="won-round">
        <h2>Well Done!</h2>
        <h3>You won this round by {{ currentRoundScore }}!</h3>
        <div class="actions">
          <base-button @click="quitGame">End Game</base-button>
          <base-button @click="play">Next Round</base-button>
        </div>
      </div>
      <div v-else-if="isPlaying && !roundWon && !hasSticks" class="game-over">
        <h2>Game Over!</h2>
        <h3>
          Sorry! You didn't win this one.<br />
          Your total score is {{ totalScore }}
        </h3>
        <base-button @click="quitGame">End Game</base-button>
      </div>
      <div class="dialog">
        <base-modal :open="!isPlaying && isHighScore" @close="close">
          <h2>New High Score!</h2>
          <h3>Enter your name below to save your game to the Leaderboard!</h3>
          <form @submit.prevent="saveScore">
            <div :class="{ invalid: !isValidName }">
              <input
                type="text"
                id="playerName"
                placeholder="Name"
                v-model.trim="playerName"
                @blur="clearValidity"
              />
            </div>
            <p v-if="!isValidName">Name is a required field.</p>
            <base-button>Save</base-button>
          </form>
        </base-modal>
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
  inject: ['loadScores'],
  data() {
    return {
      playerName: '',
      isValidName: true,
      startGame: false,
      isLoading: false,
      startInstructions: false,
      isPlaying: false,
      roundWon: false,
      currentRound: 1,
      currentRoundScore: 0,
      minScorePerRound: 100,
      sticksLeft: 6,
      currentPot: null,
      isHighScore: false,
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
  },
  methods: {
    checkHighScore() {
      const scores = this.$store.getters.savedScores;
      for (let key in scores) {
        if (this.totalScore > scores[key].totalScore) {
          this.isHighScore = true;
          break;
        }
      }
    },
    startTheGame() {
      this.startGame = true;
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.resetTotalScore();
        this.startInstructions = true;
      }, 2000);
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
      this.startInstructions = false;
      this.roundWon = false;
      this.isPlaying = true;
      this.sticksLeft = 6;
      this.currentRoundScore = 0;
      this.generatePot();
    },
    popBubble(index) {
      const bubble = this.currentPot[index];
      if (bubble.poped) {
        return;
      }
      bubble.poped = true;
      const points = bubble.pts;
      this.sticksLeft--;
      this.currentRoundScore += points;
      this.$store.dispatch('addScore', points);
    },
    resetTotalScore() {
      this.$store.dispatch('setTotalScore', 0);
      this.isHighScore = false;
    },
    quitGame() {
      this.loadScores();
      this.checkHighScore();
      this.isPlaying = false;
      this.currentRound = 1;
      this.startGame = !this.startGame;
    },
    clearValidity() {
      this.isValidName = true;
    },
    async updateScores(obj) {
      const scores = this.$store.getters.savedScores;
      const index = scores.findIndex(
        (score) => obj.totalScore > score.totalScore
      );
      if (index != -1) {
        let temp = scores[index];
        scores[index] = obj;
        await this.$store.dispatch('saveScore', scores);
        this.updateScores(temp);
      }
    },
    async saveScore() {
      if (this.playerName === '') {
        this.isValidName = false;
        return;
      }
      this.loadScores();

      const scores = this.$store.getters.savedScores;
      const index = scores.findIndex(
        (score) => this.totalScore > score.totalScore
      );

      const newScore = {
        playerName: this.playerName,
        totalScore: this.totalScore,
      };
      let temp = scores[index];
      scores[index] = newScore;
      await this.$store.dispatch('saveScore', scores);

      this.updateScores(temp);
      this.resetTotalScore();
    },
    close() {
      this.resetTotalScore();
    },
  },
};
</script>

<style scoped>
.game-card {
  background-color: #eee7ff;
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
  animation: fade-in 0.5s ease-out;
}

.won-round,
.game-over {
  text-align: center;
  animation: bounce-in 0.5s;
}

.game-over {
  animation: fade-in 0.5s ease-out;
}

.won-round h3,
.game-over h3 {
  padding: 2rem 0;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.dialog {
  text-align: center;
}

input {
  margin: auto;
  font: inherit;
  display: block;
  width: 70%;
  padding: 0.8rem 0.4rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}

input:focus {
  background-color: #eee8fb;
  outline: none;
  border-color: #200070;
}

.invalid input {
  border: 1px solid red;
}

.dialog p {
  color: red;
}
</style>
