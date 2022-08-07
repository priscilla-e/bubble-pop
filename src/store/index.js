import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      playerName: 'test',
      totalScore: 0,
      overallHighestScore: 0,
      savedScores: [
        { playerName: 'Priscilla', totalScore: 170 },
        { playerName: 'Pamela', totalScore: 167 },
        { playerName: 'Jessica', totalScore: 100 },
      ],
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
  },
  actions: {
    addScore(context, payload) {
      context.commit('addScore', payload);
    },
    setTotalScore(context, payload) {
      context.commit('setTotalScore', payload)
    },
    setHighestScore(context, savedScores) {
      const scores = [];
      for (const key in savedScores) {
        scores.push(savedScores[key].totalScore);
      }
      const highestScore = Math.max(...scores);
      context.commit('setHighestScore', highestScore);
    },
  },
});

export default store;
