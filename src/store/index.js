import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      playerName: 'test',
      totalStore: 0,
      totalRounds: 0,
      currentPot: [
        { pts: 10, poped: false },
        { pts: 0, poped: false },
        { pts: 10, poped: false },
        { pts: 9, poped: false },
        { pts: 4, poped: false },
        { pts: 0, poped: false },
        { pts: 0, poped: false },
        { pts: 0, poped: false },
        { pts: 10, poped: false },
      ],
      savedScores: [
        { playerName: 'Priscilla', totalStore: 170 },
        { playerName: 'Pamela', totalStore: 167 },
        { playerName: 'Jessica', totalStore: 100 },
      ],
    };
  },

});

export default store;
