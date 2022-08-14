saveScore() {
  if (this.playerName === '') {
    this.isValidName = false;
    return;
  }

  this.loadScores();
  const scores = this.$store.getters.savedScores;
  for (let key in scores) {
    if (this.totalScore > scores[key].totalScore) {
      const newScore = {
        playerName: this.playerName,
        totalScore: this.totalScore,
      };
      const test = scores[key];
      scores.splice(key, 1, newScore);
      this.updateScores(test);
      break;
    }
  }
  // this.$store.dispatch('saveScore', scores);
  this.resetTotalScore();
},