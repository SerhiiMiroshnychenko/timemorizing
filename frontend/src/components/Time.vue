<script>
import moment from 'moment'
import { startInterval, saveTime, deleteTime, analyzeTime } from '../utils/time'

export default {
  props: {
    showSavedTimes: Boolean,
  },
  data() {
    return {
      currentTime: moment().format('HH:mm:ss'),
      savedTimes: [],
    }
  },
  methods: {
    startInterval,
    saveTime,
    deleteTime,
    analyzeTime
  },
  created: async function () {
    this.startInterval()
    const res = await fetch('http://localhost:5555/times')
    const json = await res.json()
    if (json.length) this.savedTimes = json
  },
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ currentTime }}</h1>
  </div>
  <div class="container">
    <div class="left-section">
      <h3>Натисніть кнопку для збереження в базу даних</h3>
      <button @click="saveTime">Зберегти час</button>
      <h3 v-if="savedTimes.length && showSavedTimes">
        Раніше збережені часи:
      </h3>
      <div v-if="showSavedTimes" class="deleted-items" v-for="savedTime in savedTimes" :key="savedTime.id">
        <div class="deleted-item">{{ savedTime.time }}</div>
        <button class="btn-sm bg-red" @click="() => deleteTime(savedTime.id)">
          Видалити
        </button>
      </div>
    </div>
    <div class="right-section">
      <h3>Аналіз збереженних даних</h3>
      <div class="analyze-button">
        <button @click="analyzeTime">Аналіз</button>
      </div>
      <canvas id="timeChart"></canvas>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 4rem;
}

h3 {
  font-size: 1.2rem;
}

button {
  font-size: 1.1rem;
  margin: 10px;
  background-color: #fdb44b;
  border-radius: 5px;
  border: none;
  padding: 10px;
  cursor: pointer;
  color: #014673;
  font-family: monospace;
}

.btn-sm {
  margin: 10px;
  padding: 4px;
}

.bg-red {
  background-color: #00bbf0;
}

.deleted-items {
  color: #fdb44b;
  font-size: 1.25rem;
}

.deleted-item {
  width: 150px;
  display: inline-block;
}

.greetings {
  margin-bottom: 20px;
  text-align: center;
}

.container {
  display: flex;
  justify-content: left;
  height: 100vh;
}

.left-section {
  position: relative;
  width: 50%;
  padding-right: 10px;
  padding-left: 88px;
}

.right-section {
  position: relative;
  width: 50%;
  padding-left: 10px;
  padding-right: 100px;
}

.analyze-button {
  position: sticky;
  top: 20px;
}
</style>
