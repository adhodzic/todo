<template>
  <div class="home">
    <div class="container">
      <div class="row title">
        <h1>TODO APP</h1>
      </div>
      <div class="row content">
        <div class="col">
          <h3>TODO</h3>
          <ul class="list-group">
          <div :key="l.title" v-for="l in todo_list" >
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
        <div class="col">
          <h3>DONE</h3>
          <ul class="list-group">
            <div :key="l.title" v-for="l in todo_list" >
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
                <input v-model="task_text" id="task" type="text" placeholder="Finish homework"/>
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
                <input v-model="task_update" id="task" type="text" placeholder="Finish homework"/>
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
  </div>
</template>

<script>
// @ is an alias to /src'
import axios from 'axios';
import router from '../router'
export default {
  data(){
    return {
      list: [
        {title: "prvi"},
        {title: "drugi"},
        {title: "treci"},
        {title: "cetvrti"}
      ],
      task_text: "",
      task_update: "",
      todo_list: [],
      c_id: " "
    }
  },
  name: 'Home',
  methods: {
    async getTodoList(){
      let result = await axios.get('http://localhost:3000/todo_list');
      this.todo_list = result.data;
      console.log(this.todo_list)
    },
    async addTask(){
      await axios({
        method: 'post',
        url: 'http://localhost:3000/add_task',
        headers: {}, 
          data: {
            title: this.task_text,
            done: false
          }
        });
      router.go();
    },
    async editTask(){
      console.log(this.c_id)
       await axios({
        method: 'put',
        url: `http://localhost:3000/edit_task/${this.c_id}`,
        headers: {}, 
          data: {
            title: this.task_update,
            done: false
          }
        });
      this.c_id = null;
      this.getTodoList();
    },
    async done(id){
      await axios.patch(`http://localhost:3000/set_done/${id}`)
      this.getTodoList();
      router.go();
    },
    set_id(id){
      this.c_id = id;
    }
  },
  mounted() {
    this.getTodoList();
  }
}
</script>
<style>
  .row{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  .title{
    margin-bottom: 100px;
  }
  .col{
    margin: 10px;
    width:100%
  }
  h1, h3{
    color: grey;
  }
  .done:hover{
    cursor: pointer;
    background-color:lightseagreen;
  }
  .add{
    margin-top: 20px;
  }
  #task{
    margin: 5px;
    font-size: 14px;
  }
  .edit:hover{
    cursor: pointer;
    background-color: orange;
  }
</style>