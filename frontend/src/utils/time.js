import moment from 'moment'

function startInterval() {
  setInterval(() => {
    this.currentTime = moment().format('HH:mm:ss')
  }, 1000)
}

async function saveTime() {
  const time = this.currentTime
  const res = await fetch('http://localhost:5555/times', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ time }),
  })
  const json = await res.json()
  if (json.insertId) {
    this.savedTimes.unshift({ id: json.insertId, time })
    this.$toast.success(`Час ${time} збережено`, { position: 'top-right' })
  }
}

async function deleteTime(id) {
  const res = await fetch(`http://localhost:5555/time/${id}`, {
    method: 'DELETE',
  })
  const json = await res.json()
  if (json.affectedRows) {
    this.savedTimes = this.savedTimes.filter((savedTime) => savedTime.id !== id)
    this.$toast.error(`Час з ID ${id} видалено`, {
      position: 'top-right',
    })
  }
}

async function analyzeTime() {
  try {
    const response = await fetch('http://localhost:5555/times');
    const json = await response.json();
    const timeDifferences = [];

    if (json.length > 1) {
      for (let i = 1; i < json.length; i++) {
        const currentTime = moment(json[i].time, 'HH:mm:ss');
        const previousTime = moment(json[i - 1].time, 'HH:mm:ss');
        const differenceInSeconds = previousTime.diff(currentTime, 'seconds');
        timeDifferences.push(differenceInSeconds);
      }
    }

    timeDifferences.reverse(); // Зміна порядку елементів на зворотний

    // Знищення попереднього графіку, якщо він існує
    if (this.timeChart) {
      this.timeChart.destroy();
    }

    const ctx = document.getElementById('timeChart').getContext('2d');
    this.timeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: timeDifferences.map((_, index) => `Проміжок часу ${index + 1}`),
        datasets: [{
          label: 'Різниця часу (в сек)',
          data: timeDifferences,
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderColor: '#fdb44b',
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 16, // розмір шрифту на вісі X
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 16, // розмір шрифту на вісі X
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16, // розмір шрифту на вісі X
              }
            }
          }
        }
      }
    });

  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}


export { startInterval, saveTime, deleteTime, analyzeTime }
