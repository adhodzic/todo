<template>
<div class="new">
    <div class="main">
        <calendar @dayPressed="getDay" :days="days" :currentDay="this.currentDay"></calendar>
    </div>
</div>
</template>

<script>
import Calendar from '../components/Calendar'
export default {
    components: {
        'calendar': Calendar
    },
    data() {
        return {
            days: null,
            currentDay: localStorage.getItem('day'),
            setDay: null
        }
    },
    methods: {
        getDay(day) {
            this.setDay = day;
        },
        getDayInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
    },
    mounted() {

    },
    created() {
        localStorage.setItem('date', new Date().toISOString().slice(0, 10));
        let arr = localStorage.getItem('date').split("-");
        localStorage.setItem('year', arr[0]);
        localStorage.setItem('month', arr[1]);
        localStorage.setItem('day', arr[2]);
        this.days = this.getDayInMonth(arr[1], arr[0])
    }
}
</script>

<style>
.main {
    display: flex;
    flex-direction: row;
    justify-content: start;
}
</style>
