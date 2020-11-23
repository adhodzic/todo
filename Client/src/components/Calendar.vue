<template>
<div class="calendar-app">
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
            <div :key="row" class="weeks" v-bind:class="[row < 2 ?right:'']" v-for="row in getNumOfWeeks()">
                <div v-if="getDayIndex(row,col) < numOfDays && getDayIndex(row,col) > -1" class="cols" :key="col" v-for="col in 7">
                    <button :value="getDayIndex(row,col)" @click="dayPressed(getDayIndex(row,col)+1)" class="days">
                        {{getDayIndex(row,col)+1}}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="todo" v-if="setDate != null">
        <todo :date="setDate" ref="todo"></todo>
    </div>
</div>
</template>

<script>
import todo from './Todo.vue';
export default {
  components: { todo },
    name: "calendar",
    props: ['days', 'currentDay'],
    data() {
        return {
            right: 'floatRight',
            day: null,
            year: parseInt(localStorage.getItem('year')),
            month: parseInt(localStorage.getItem('month')),
            offsetMonth: parseInt(localStorage.getItem('month')),
            offsetYear: parseInt(localStorage.getItem('year')),
            numOfDays: this.days,
            setDate: null
        }
    },
    methods: {
        isFirst(row) {
            return row == 0 ? true : false;
        },
        getNumOfWeeks() {
            let days = ((7 + this.getDayOffset()) + this.numOfDays);
            if (days % 7 != 0) {
                return Math.trunc(days / 7) + 1
            }
            return Math.trunc(days / 7);
        },
        getDayIndex(row, col) {
            let index = 0;
            if (this.getDayOffset() < 0) {
                index = (row - 1) * 7 + (col - 1) - (7 + this.getDayOffset());
            } else {
                index = (row - 1) * 7 + (col - 1) - (this.getDayOffset());
            }
            return index;
        },
        getDayOffset() {
            return new Date(this.offsetYear, this.offsetMonth - 1, 1).getDay() - 1;
        },
        focusCurrentDay() {
            let d = this.currentDay - 1
            let a = document.querySelectorAll(`button[value='${d}']`);
            a[0].focus();
        },
        dayPressed(day) {
            if (this.day != day) {
                this.day = day
                let date = this.day.toString() + this.offsetMonth.toString() + this.offsetYear.toString()
                this.setDate = date;
                this.$refs.todo.getTodoList(this.setDate)
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
            this.day = null;
            this.setDate = null;
        },
        leftArrow() {
            if (this.offsetMonth == 1) {
                this.offsetMonth = 12
                this.offsetYear = this.offsetYear - 1
            } else {
                this.offsetMonth = this.offsetMonth - 1
            }
            this.numOfDays = new Date(this.offsetYear, this.offsetMonth, 0).getDate();
            this.day = null;
            this.setDate = null;
        }
    },
    mounted() {
        this.focusCurrentDay();
        this.setDate = this.currentDay.toString() + this.offsetMonth.toString() + this.offsetYear.toString()
    }
}
</script>

<style scoped>
.calendar-app {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 10rem;
}
.calendar{
    margin-right: 10rem;
}
.floatRight {
    justify-content: flex-end;
    padding-right: 2px;
}

h2 {
    margin-bottom: 20px;
    font-size: 50px;
    font-weight: bolder;
    color: rgb(66, 66, 66);
}

.header {
    display: inline;
    height: 2rem;
}

hr {
    border: none;
    background: rgb(255, 108, 108);
    height: 2px;
    margin-bottom: 0px;
    margin-top: 0px;
}

.main {
    display: flex;
    flex-direction: column;
    border-radius: 30px;
}

.names {
    display: flex;
    width: 100%;
    height: 3rem;
    justify-content: center;
    background-color: rgb(66, 66, 66);
    border-radius: 10px;
}

td {
    font-weight: bold;
    color: rgb(92, 92, 92);
    width: 5.1rem;
}

.weeks {
    display: flex;
    width: 36rem;
    flex-direction: row;
    float: right;
}

.days {
    display: block;
    padding-top: auto;
    margin: 1px;
    border: none;
    color: rgb(255, 255, 255);
    background: rgb(66, 66, 66);
    font-size: 25px;
    border-radius: 20px;
    width: 5rem;
    height: 5rem;

    transition: font-size 2s box-shadow .2s, transform ease-in .6s, transform ease-out .1s;
}

.days:hover {
    cursor: pointer;
    border: none;
    background: lightgray;
    color: black;

}

.days:focus {
    outline: none;
    color: rgb(255, 255, 255);
    font-size: 40px;
    font-weight: bolder;
    box-shadow: 5px 5px 10px black;
    background: rgb(66, 66, 66);
    transform: translate(-3px, -3px);
}

.calendar {
    margin-left: 20px;
    padding: 10px;
    border-radius: 20px;
    background-color: rgb(255, 106, 106);
}

.date {
    display: flex;
    border-radius: 10px;
    height: 3rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 5rem;
    padding-right: 5rem;
}

.fas {
    color: rgb(66, 66, 66);
}

.fas:hover {
    cursor: pointer;
    color: rgb(66, 66, 66);
}

h4 {
    font-size: 30px;
    font-weight: bold;
    color: rgb(66, 66, 66);
    margin-bottom: 0px;
    align-items: center;

}

ul {
    display: flex;
    flex-direction: row;
    height: auto;
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
    color: rgb(255, 255, 255);
    font-weight: bolder;
    width: 5.1rem;
}
</style>
