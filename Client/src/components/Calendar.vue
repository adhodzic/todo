<template>
    <div class="calendar">
        <div class="header">
            <h3>Calendar</h3>
        </div>
        <div class="main">
            <div :key="rows" class="weeks" v-for="rows in 5">
                <button v-if="(rows-1)*7+(cols-1) < days" :value="(rows-1)*7+(cols-1)" :key="cols" @click="dayPressed((rows-1)*7+(cols-1)+1)" class="days" v-for="cols in 7">
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
    data(){
        return {
            day: null
        }
    },
    methods: {
       dayPressed (day) {
           if(this.day != day){
                this.day = day
                this.$emit('dayPressed', day)
           }
        }
    },
    mounted(){
        let d = this.currentDay - 1
        let a = document.querySelectorAll(`button[value='${d}']`);
        a[0].focus();
    }
}
</script>

<style scoped>
.header {
    display: inline;
    height: 2rem;
}
.main {
    display: flex;
    flex-direction: column;
}
.weeks {
    display: flex;
    width: 22rem;
    flex-direction: row;
}

.days {
    display: block;
    padding-top: auto;
    margin: 1px;
    border: none;
    color: snow;
    background: slategray;
    width: 3rem;
    height: 3rem;
    transition: box-shadow .6s, transform .6s;
}

.days:hover {
    cursor: pointer;
    border: none;
    background: lightgray;
    color: black;

}
.days:focus{
    outline: none;
    box-shadow: 5px 5px 10px 3px black;
    transform: translate(-2px, -2px);
}
    
.calendar {
    margin-left: 20px;
}
</style>