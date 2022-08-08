<template>
  <section>
    <base-card>
      <h2>Leaderboard</h2>
      <div class="refresh">
        <base-button :mode="'outline'">Refresh</base-button>
      </div>
      <ul v-for="user in savedScores" :key="user.playerName">
        <li>
          <span>{{ user.playerName }}</span>
          <span>{{ user.totalScore }} points</span>
        </li>
      </ul>
    </base-card>
  </section>
</template>

<script>
export default {
  computed: {
    savedScores() {
      return this.$store.getters.savedScores;
    },
  },
};
</script>

<style scoped>
.refresh {
  display: flex;
  justify-content: flex-end;
}
ul {
  font-family: 'Fredoka One', cursive;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  border: 1px solid #42424242;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 3px 2px rgba(0,0,0, 0.6);
}
</style>
