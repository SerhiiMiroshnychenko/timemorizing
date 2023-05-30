<script setup>
import Time from './components/Time.vue'
</script>

<template>
  <Time :showSavedTimes="true" />
</template>

<style>
@import './assets/base.css';

#app {
  margin: 10px auto;
}

.green {
  color: #fdb44b;
  ;
}
</style>
