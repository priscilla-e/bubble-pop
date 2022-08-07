<template>
  <div class="bubble--container">
    <div class="bubble1">
      <span class="bubble" @click="popBubble('0')">{{
        currentPot[0].poped ? currentPot[0].pts : ''
      }}</span>
    </div>
    <div class="bubble2">
      <span class="bubble" @click="popBubble('1')">{{
        currentPot[1].poped ? currentPot[1].pts : ''
      }}</span>
    </div>
    <div class="bubble3">
      <span class="bubble" @click="popBubble('2')">{{
        currentPot[2].poped ? currentPot[2].pts : ''
      }}</span>
    </div>
    <div class="bubble4">
      <span class="bubble" @click="popBubble('3')">{{
        currentPot[3].poped ? currentPot[3].pts : ''
      }}</span>
    </div>
    <div class="bubble5">
      <span class="bubble" @click="popBubble('4')">{{
        currentPot[4].poped ? currentPot[4].pts : ''
      }}</span>
    </div>
    <div class="bubble6">
      <span class="bubble" @click="popBubble('5')">{{
        currentPot[5].poped ? currentPot[5].pts : ''
      }}</span>
    </div>
    <div class="bubble7">
      <span class="bubble" @click="popBubble('6')">{{
        currentPot[6].poped ? currentPot[6].pts : ''
      }}</span>
    </div>
    <div class="bubble8">
      <span class="bubble" @click="popBubble('7')">{{
        currentPot[7].poped ? currentPot[7].pts : ''
      }}</span>
    </div>
    <div class="bubble9">
      <span class="bubble" @click="popBubble('8')">{{
        currentPot[8].poped ? currentPot[8].pts : ''
      }}</span>
    </div>

  </div>
</template>

<script>
export default {
  props: ['currentPot'],
  inject: ['popBubble'],
};
</script>

<style scoped>
.bubble--container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 2.5rem;
  grid-row-gap: 2.5rem;
  text-align: center;
}
.bubble1 {
  grid-area: 1 / 1 / 2 / 2;
}
.bubble2 {
  grid-area: 1 / 2 / 2 / 3;
}
.bubble3 {
  grid-area: 1 / 3 / 2 / 4;
}
.bubble4 {
  grid-area: 2 / 3 / 3 / 4;
}
.bubble5 {
  grid-area: 2 / 2 / 3 / 3;
}
.bubble6 {
  grid-area: 2 / 1 / 3 / 2;
}
.bubble7 {
  grid-area: 3 / 1 / 4 / 2;
}
.bubble8 {
  grid-area: 3 / 2 / 4 / 3;
}
.bubble9 {
  grid-area: 3 / 3 / 4 / 4;
}

.bubble {
  background: #3ad4ff;
  font-family: 'Fredoka One', cursive;
  font-size: 1em;
  border-radius: 50%;
  display: inline-block;
  padding: 2rem;
  color: white;
}
</style>
