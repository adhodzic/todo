<template>
<div class="todo">
    <div class="title">
        <h1>TODO</h1>
    </div>
    <div class="row content">
        <div class="todo_row">
            <h3>TODO</h3>
            <ul class="list-group">
                <div :key="l.title" v-for="l in todo_list">
                    <li v-if="!l['done']" class="list-group-item d-flex justify-content-between align-items-center">
                        {{l.title}}
                        <span @click="set_id(l._id)" class="badge badge-primary badge-pill edit" data-toggle="modal" data-target="#exampleModal2">EDIT</span>
                        <span @click="done(l._id)" class="badge badge-primary badge-pill done">DONE</span>
                    </li>
                </div>
            </ul>
            <button type="button" class="btn btn-primary add" data-toggle="modal" data-target="#exampleModal">
                Add
            </button>
        </div>
        <div class="done_row">
            <h3>DONE</h3>
            <ul class="list-group">
                <div :key="l.title" v-for="l in todo_list">
                    <li v-if="l['done']" class="list-group-item d-flex justify-content-between align-items-center" style="text-decoration-line: line-through;">
                        {{l.title}}
                    </li>
                </div>
            </ul>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <label for="task">Task: </label>
                        <input v-model="task_text" id="task" type="text" placeholder="Finish homework" />
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="addTask()" type="button" class="btn btn-primary">Add task</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">Edit task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <label for="task">Task: </label>
                        <input v-model="task_update" id="task" type="text" />
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="editTask()" type="button" data-dismiss="modal" class="btn btn-primary">Change</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import router from '../router'
export default {
    props: ['date'],
    watch: { 
        date: function(newVal, oldVal) { // watch it
           this.setDate = newVal;
           console.log(oldVal)
        }
    },
    data() {
        return {
            setDate: this.date,
            edit_task: "",
            task_text: "",
            task_update: "",
            todo_list: [],
            c_id: " "
        }
    },
    name: 'Todo',
    methods: {
        async getTodoList(sDate = this.setDate) {
            let result = await axios.get(`http://localhost:3000/todo_list/${sDate}`);
            this.todo_list = result.data;
            console.log(this.todo_list)
        },
        async addTask() {
            await axios({
                method: 'post',
                url: 'http://localhost:3000/add_task',
                headers: {},
                data: {
                    date: this.date,
                    title: this.task_text,
                    done: false
                }
            });
            router.go();
        },
        async editTask() {
            console.log(this.c_id)
            await axios({
                method: 'put',
                url: `http://localhost:3000/edit_task/${this.c_id}`,
                headers: {},
                data: {
                    date: this.date,
                    title: this.task_update,
                    done: false
                }
            });
            this.c_id = null;
            this.getTodoList();
        },
        async done(id) {
            await axios.patch(`http://localhost:3000/set_done/${id}`)
            this.getTodoList();
            router.go();
        },
        async set_id(id) {
            let data = await axios.get(`http://localhost:3000/api/task/get_one/${id}`);
            this.task_update = data.data.title;
            this.c_id = id;
        }
    },
    mounted() {
        this.getTodoList();
        console.log(this.date);
    }
}
</script>

<style lang="css" scoped>
h1 {
    margin-bottom: 20px;
    font-size: 50px;
    font-weight: bolder;
    color: rgb(66, 66, 66);
}

.done_row,
.todo_row {
    width: 20rem;
}

.todo {
    padding: 10px;
}

.title {
    margin-bottom: 0px;
}
</style>
