<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">Previous</button>
      <span>{{ currentMonth }}</span>
      <button @click="nextMonth">Next</button>
    </div>
    <div class="days">
      <div v-for="day in days" :key="day" :class="getDayClass(day)">{{ day }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonth: new Date().toLocaleString("default", { month: "long", year: "numeric" }),
      days: [],
      today: new Date().getDate()
    };
  },
  mounted() {
    this.generateCalendar();
  },
  methods: {
    generateCalendar() {
      const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      const days = [];

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }

      this.days = Array(firstDay).fill(null).concat(days);
    },
    prevMonth() {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      if (currentMonth === 0) {
        this.currentMonth = new Date(currentYear - 1, 11).toLocaleString("default", { month: "long", year: "numeric" });
      } else {
        this.currentMonth = new Date(currentYear, currentMonth - 1).toLocaleString("default", { month: "long", year: "numeric" });
      }

      this.generateCalendar();
    },
    nextMonth() {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      if (currentMonth === 11) {
        this.currentMonth = new Date(currentYear + 1, 0).toLocaleString("default", { month: "long", year: "numeric" });
      } else {
        this.currentMonth = new Date(currentYear, currentMonth + 1).toLocaleString("default", { month: "long", year: "numeric" });
      }

      this.generateCalendar();
    },
    getDayClass(day) {
      if (day === this.today) {
        return "today";
      } else {
        // 根据日期配置不同的显示样式
        // 这里使用了一个样式类名为"custom-day"的示例样式
        return "custom-day";
      }
    }
  }
};
</script>