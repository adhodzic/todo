<template>
<div class="calendar">
    <div class="header">
        <h2>Calendar</h2>
        <div class="date">
            <i class="fas fa-angle-left" @click="leftArrow()" style="font-size: 30px;"></i>
            <h4>{{offsetMonth}}-{{offsetYear}}</h4>
            <i class="fas fa-angle-right" @click="rightArrow()" style="font-size: 30px;"></i>
        </div>
        <hr />
        <div class="names">
            <ul>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>
            </ul>
        </div>
    </div>
    <hr />
    <div class="main">
        <div :key="rows" class="weeks" v-for="rows in 5">
            <button v-if="(rows-1)*7+(cols-1) < numOfDays" :value="(rows-1)*7+(cols-1)" :key="cols" @click="dayPressed((rows-1)*7+(cols-1)+1)" class="days" v-for="cols in 7">
                {{(rows-1)*7+(cols-1)+1}}
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "calendar",
    props: ['days', 'currentDay'],
    data() {
        return {
            day: null,
            year: parseInt(localStorage.getItem('year')),
            month: parseInt(localStorage.getItem('month')),
            offsetMonth: parseInt(localStorage.getItem('month')),
            offsetYear: parseInt(localStorage.getItem('year')),
            numOfDays: this.days
        }
    },
    methods: {
        dayPressed(day) {
            if (this.day != day) {
                this.day = day
                let date = this.day.toString() + '-' + this.offsetMonth.toString() + '-' + this.offsetYear.toString()
                this.$emit('dayPressed', date)
            }
        },
        rightArrow() {
            if (this.offsetMonth == 12) {
                this.offsetMonth = 1
                this.offsetYear = this.offsetYear + 1
            } else {
                this.offsetMonth = this.offsetMonth + 1
            }
            this.numOfDays = new Date(this.offsetYear, this.offsetMonth, 0).getDate();
            this.day = null

        },
        leftArrow() {
            if (this.offsetMonth == 1) {
                this.offsetMonth = 12
                this.offsetYear = this.offsetYear - 1
            } else {
                this.offsetMonth = this.offsetMonth - 1
            }
            this.numOfDays = new Date(this.offsetYear, this.offsetMonth, 0).getDate();
            this.day = null
        }
    },
    mounted() {
        let d = this.currentDay - 1
        let a = document.querySelectorAll(`button[value='${d}']`);
        a[0].focus();
    }
}
</script>

<style scoped>
h2 {
    margin-bottom: 30px;
}

.header {
    display: inline;
    height: 2rem;
}

hr {
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px;
}

.main {
    display: flex;
    flex-direction: column;
}

.names {
    width: 100%;
    height: 2rem;
}

td {
    font-weight: bold;
    color: rgb(129, 129, 129);
    width: 5.1rem;
}

.weeks {
    display: flex;
    width: 36rem;
    flex-direction: row;
}

.days {
    display: block;
    padding-top: auto;
    margin: 1px;
    border: none;
    color: snow;
    background: slategray;
    font-size: 25px;
    width: 5rem;
    height: 5rem;
    transition: box-shadow .6s, transform .6s;
}

.days:hover {
    cursor: pointer;
    border: none;
    background: lightgray;
    color: black;

}

.days:focus {
    outline: none;
    box-shadow: 5px 5px 10px 3px black;
    transform: translate(-2px, -2px);
}

.calendar {
    margin-left: 20px;
}

.date {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 5rem;
    padding-right: 5rem;
}

.fas {
    color: gray;
}

.fas:hover {
    cursor: pointer;
    color: darkslategray;
}

h4 {
    font-size: 25px;

}

ul {
    display: flex;
    flex-direction: row;
    height: inherit;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    width: 5.1rem;
}
</style>
