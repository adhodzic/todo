<template>
<div class="new">
    <div class="main">
        <div class="calendar">
            <div :key="rows" class="weeks" v-for="rows in 5">
                <div v-if="days[(rows-1)*7+(cols-1)]" :key="cols" class="days" v-for="cols in 7">
                    <div class="day">
                        {{days[(rows-1)*7+(cols-1)]}}
                    </div>
                </div>
            </div>
        </div>
        <div class=" todo">
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            days: []
        }
    },
    created() {
        for (let i = 0; i < 31; i++) {
            this.days[i] = i + 1;
        }
        console.log(this.days)
    }
}
</script>

<style>
.main {
    display: flex;
    flex-direction: row;
}

.calendar {
    margin-left: 20px;
}

.weeks {
    display: flex;
    width: 21rem;
    flex-direction: row;
}

.days {
    display: block;
    padding-top: auto;
    margin: 1px;
    color: snow;
    background: slategray;
    width: 3rem;
    height: 3rem;
    transition: box-shadow .6s, transform .6s;
}

.day {
    width: inherit;
    height: inherit;
    text-align: center;
    vertical-align: middle;
    line-height: 3rem;
    font-size: 20px;
}

.days:hover {
    cursor: pointer;
    background: lightgray;
    color: black;
    box-shadow: 5px 5px 15px;
    transform: translate(-5px, -5px);
}
</style>
