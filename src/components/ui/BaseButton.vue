<template>
  <button class="button" v-if="!isLink" :class="mode">
    <slot></slot>
  </button>
  <router-link class="button" v-else to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
  to: {
    type: String,
    required: false,
    default: '/',
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

a:hover,
a:active,
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
