<template>
  <button class="button" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
.button {
  font-family: 'Fredoka One', cursive;
  font-size: 1.2em;
}

button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #200070;
  border: 1px solid #200070;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

button:hover,
button:active {
  background-color: #200070;
  border-color: #200070;
}

.flat {
  background-color: transparent;
  color: #200070;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #200070;
  color: #200070;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #e6ddfb;
}
</style>
