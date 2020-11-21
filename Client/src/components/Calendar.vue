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
        <div :key="row" class="weeks" v-bind:class="[row < 2 ?right:'']" v-for="row in getNumOfWeeks()">
            <div v-if="getDayIndex(row,col) < numOfDays && getDayIndex(row,col) > -1" class="cols" :key="col" v-for="col in 7">
                <button :value="getDayIndex(row,col)" @click="dayPressed(getDayIndex(row,col)+1)" class="days">
                    {{getDayIndex(row,col)+1}}
                </button>
            </div>
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
            right: 'floatRight',
            day: null,
            year: parseInt(localStorage.getItem('year')),
            month: parseInt(localStorage.getItem('month')),
            offsetMonth: parseInt(localStorage.getItem('month')),
            offsetYear: parseInt(localStorage.getItem('year')),
            numOfDays: this.days,
        }
    },
    methods: {
        isFirst(row){
            return row == 0?true:false;
        },
        getNumOfWeeks(){
            let days = ((7+this.getDayOffset()) + this.numOfDays);
            if(days%7 != 0){
                return Math.trunc(days/7)+1
            }
            return Math.trunc(days/7);
        },
        getDayIndex(row,col){
            let index = 0;
            if(this.getDayOffset()<0){
                index = (row-1)*7+(col-1) - (7+this.getDayOffset());
            }else{
                index = (row-1)*7+(col-1) - (this.getDayOffset());
            }
            return index;
        },
        getDayOffset(){
            return new Date(this.offsetYear, this.offsetMonth - 1, 1).getDay()-1;
        },
        focusCurrentDay(){
            console.log(this.currentDay);
            let d = this.currentDay - 1
            let a = document.querySelectorAll(`button[value='${d}']`);
            a[0].focus();
        },
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
            this.day = null;
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
        }
    },
    mounted() {
        this.focusCurrentDay();
    }
}
</script>

<style scoped>
.floatRight {
    justify-content: flex-end;
    padding-right: 2px;
}
h2 {
    margin-bottom: 30px;
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
    width: 100%;
    height: 2rem;
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
    color:rgb(255, 108, 108);
    background: rgb(92, 92, 92);
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
    color:rgb(255, 108, 108);
    font-size: 40px;
    font-weight: bolder;
    box-shadow: 5px 5px 10px black;
     background:rgb(66, 66, 66);
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
    background-color:  rgb(66, 66, 66);
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 5rem;
    padding-right: 5rem;
}

.fas {
    color: rgb(255, 108, 108);
}

.fas:hover {
    cursor: pointer;
    color: rgb(66, 66, 66);
}

h4 {
    font-size: 25px;
    color: rgb(255, 108, 108);
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
    color:rgb(255, 108, 108);
    font-weight: bolder;
    width: 5.1rem;
}
</style>
