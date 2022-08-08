import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      playerName: 'test',
      totalScore: 0,
      overallHighestScore: 0,
      savedScores: [],
    };
  },
  getters: {
    playerName(state) {
      return state.playerName;
    },
    totalScore(state) {
      return state.totalScore;
    },
    savedScores(state) {
      return state.savedScores;
    },
    overallHighestScore(state) {
      return state.overallHighestScore;
    },
  },
  mutations: {
    addScore(state, payload) {
      state.totalScore += payload;
    },
    setTotalScore(state, payload) {
      state.totalScore = payload;
    },
    setHighestScore(state, payload) {
      state.overallHighestScore = payload;
    },
    saveScore(state, payload) {
      state.savedScores.unshift(payload);
    },
    setScores(state, payload) {
      state.savedScores = payload;
    },
  },
  actions: {
    addScore(context, payload) {
      context.commit('addScore', payload);
    },
    setTotalScore(context, payload) {
      context.commit('setTotalScore', payload);
    },
    setHighestScore(context, payload) {
      context.commit('setHighestScore', payload);
    },
    async loadHighestScore(context) {
      const response = await fetch(
        `https://bubble-pop-3165d-default-rtdb.firebaseio.com/leaderboard.json`
      );

      const responseData = await response.json();

      if (!response.ok) {
        // ... error
      }

      const scores = [];
      for (const key in responseData) {
        scores.unshift(responseData[key].totalScore);
      }
      const highestScore = Math.max(...scores);
      context.commit('setHighestScore', highestScore);
    },
    async saveScore(context, payload) {
      const response = await fetch(
        `https://bubble-pop-3165d-default-rtdb.firebaseio.com/leaderboard.json`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        // ..error
      }
      context.commit('saveScore', payload);
    },
    async loadScores(context) {
      const response = await fetch(
        `https://bubble-pop-3165d-default-rtdb.firebaseio.com/leaderboard.json`
      );

      const responseData = await response.json();

      if (!response.ok) {
        // ... error
      }

      const scores = [];
      for (const key in responseData) {
        scores.unshift({
          playerName: responseData[key].playerName,
          totalScore: responseData[key].totalScore,
        });
      }
      context.commit('setScores', scores);
    },
  },
});

export default store;
