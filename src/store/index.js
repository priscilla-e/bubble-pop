import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      totalScore: 0,
      savedScores: [
        { playerName: 'Sandra', totalScore: 100 },
        { playerName: 'Max', totalScore: 100 },
        { playerName: 'Rebecca', totalScore: 100 },
        { playerName: 'John', totalScore: 100 },
        { playerName: 'Phil', totalScore: 100 },
        { playerName: 'Betty', totalScore: 100 },
        { playerName: 'Jamie', totalScore: 100 },
        { playerName: 'George', totalScore: 100 },
        { playerName: 'Philip', totalScore: 100 },
        { playerName: 'Maxin', totalScore: 100 },
      ],
    };
  },
  getters: {
    totalScore(state) {
      return state.totalScore;
    },
    savedScores(state) {
      return state.savedScores;
    },
  },
  mutations: {
    addScore(state, payload) {
      state.totalScore += payload;
    },
    setTotalScore(state, payload) {
      state.totalScore = payload;
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
    async saveScore(context, payload) {
      const response = await fetch(
        `https://bubble-pop-3165d-default-rtdb.firebaseio.com/leaderboard.json`,
        {
          method: 'PUT',
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Could not save data.');
        throw error;
      }
      context.commit('setScores', payload);
    },

    async loadScores(context) {
      const response = await fetch(
        `https://bubble-pop-3165d-default-rtdb.firebaseio.com/leaderboard.json`
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Could not load data.');
        throw error;
      }

      const scores = [];
      for (const key in responseData) {
        scores.push({
          playerName: responseData[key].playerName,
          totalScore: responseData[key].totalScore,
        });
      }
      context.commit('setScores', scores);
    },
  },
});

export default store;
