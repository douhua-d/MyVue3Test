<template>
  <div class="calendar">
    <div class="header">
      <button @click="previousMonth">&lt;</button>
      <h2>{{ currentMonth }}</h2>
      <div>
        <input type="number" v-model.number="selectedYear" min="1900" max="2100" @change="changeYear" />
      </div>
      <button @click="nextMonth">&gt;</button>
    </div>
    <table>
      <thead>
      <tr>
        <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="week in calendar" :key="week">
        <td v-for="date in week" :key="date.day" :class="getCellClass(date)" @click="selectDay(date)">
          {{ date.day }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonth: '',
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      calendar: [],
      selectedDate: null,
      selectedYear: null
    };
  },
  created() {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.currentMonth = this.formatMonth(currentDate);
    this.generateCalendar();
  },
  watch: {
    selectedYear() {
      this.generateCalendar();
    }
  },
  methods: {
    formatMonth(date) {
      const options = { year: 'numeric', month: 'long' };
      return date.toLocaleDateString('en-US', options);
    },
    generateCalendar() {
      const year = this.selectedYear;
      const month = new Date(this.currentMonth).getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDay = firstDay.getDay();
      const endDay = lastDay.getDate();

      let date = 1;
      let calendar = [];

      for (let week = 0; week < 6; week++) {
        let days = [];

        for (let day = 0; day < 7; day++) {
          if (week === 0 && day < startDay) {
            days.push({ day: '', isCurrentMonth: false });
          } else if (date > endDay) {
            days.push({ day: '', isCurrentMonth: false });
          } else {
            days.push({ day: date, isCurrentMonth: true });
            date++;
          }
        }

        calendar.push(days);

        if (date > endDay) {
          break;
        }
      }

      this.calendar = calendar;
    },
    previousMonth() {
      const currentMonth = new Date(this.currentMonth);
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      this.currentMonth = this.formatMonth(currentMonth);
      this.selectedYear = currentMonth.getFullYear(); // 更新 selectedYear
      this.generateCalendar();
    },
    nextMonth() {
      const currentMonth = new Date(this.currentMonth);
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      this.currentMonth = this.formatMonth(currentMonth);
      this.selectedYear = currentMonth.getFullYear(); // 更新 selectedYear
      this.generateCalendar();
    },
    getCellClass(date) {
      return {
        'current-day': this.isCurrentDay(date),
        'selected-day': this.isSelectedDay(date),
        'non-current-month': !date.isCurrentMonth,
        today: this.isToday(date)
      };
    },
    isCurrentDay(date) {
      const currentDate = new Date();
      return date.day === currentDate.getDate() && this.currentMonth === this.formatMonth(currentDate);
    },
    isSelectedDay(date) {
      return this.selectedDate && date.day === this.selectedDate.getDate() && this.currentMonth === this.formatMonth(this.selectedDate);
    },
    isToday(date) {
      const currentDate = new Date();
      return date.isCurrentMonth && date.day === currentDate.getDate() && this.currentMonth === this.formatMonth(currentDate);
    },
    selectDay(date) {
      const selectedDate = new Date(this.currentMonth);
      selectedDate.setDate(date.day);
      this.selectedDate = selectedDate;
    }
  }
};
</script>

<style scoped>
.calendar {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
}

h2 {
  margin: 0;
  font-size: 1.2rem;
}

button {
  border: none;
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: center;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
  color: #666;
}

td {
  text-align: center;
  padding: 0.5rem;
  cursor: pointer;
  color: #333;
}

.current-day {
  font-weight: bold;
  color: #333;
}

.selected-day {
  background-color: #ccc;
}

.non-current-month {
  color: #ccc;
}

.today {
  background-color: #ffcccc;
  border-radius: 50%;
  color: #ff0000;
}
</style>
