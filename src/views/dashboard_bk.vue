<template>
  <div class="vue-tempalte">
     <nav
      class="
        navbar
        shadow
        bg-white
        rounded
        justify-content-between
        flex-nowrap flex-row
        fixed-top
      "
    >
      <div class="container">
        <a class="navbar-brand float-left" href="#" target="_blank">
          Todo
        </a>
        <ul class="nav navbar-nav flex-row ">
          <!-- <li class="nav-item" v-if="showbutton == false">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item" v-if="showbutton == false">
            <router-link class="btn btn-outline-primary" to="/"
              >Sign up</router-link
            >
          </li> -->
          <li class="nav-item pull right" >
            <button class="btn btn-outline-primary" @click="logout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <h3>dashboard</h3>
    <!-- <div class="container" style="margin-top: 47px">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="exampleInputEmail1">Task</label>
            <input
              type="text"
              class="form-control"
              id="taskname"
              v-model="taskname"
              aria-describedby="emailHelp"
              placeholder="Enter Task"
            />
          </div>

          <button @click="submittask" class="btn btn-primary">Submit</button>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div> -->
    <div class="container">
      <!-- <div class="row">
        <div class="col-md-2 "> -->
      <button class="btn btn-primary" style="float: right" @click="openModel">
        Add Task
      </button>
      <!-- </div>
         
        </div> -->
      <div class="row" v-if="showtable == true">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <table class="table">
            <thead>
              <tr>
                <!-- <th scope="col">#</th> -->
                <th scope="col">TaskName</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in tasklist" :key="c._id">
                <!-- <th scope="row">1</th> -->
                <td>{{ c.work }}</td>
                <td>{{ c.status }}</td>
                <td>
                 <button style="margin:2px;"
                    class="btn btn-success"
                    @click="openmodeledit(c.work, c._id, c.status)"
                  ><i class="icon-edit"></i></button>
                  
                   <button
                    class="btn btn-danger"
                    @click="deletetask( c._id)"
                  ><i class="icon-trash"></i>
                   
                  </button> 
                </td>
              </tr>
              <tr v-if="!tasklist.length > 0">
                <td colspan="3">
                  <div class="text-center">No record found.</div>
                </td>
                </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>

    <div v-if="myModel">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Task</h4>
                  <button type="button" class="close" @click="myModel = false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label>Enter Task</label>
                    <input
                      type="text"
                      v-if="editmodel == false"
                      class="form-control"
                      id="taskname"
                      v-model="taskname"
                      aria-describedby="emailHelp"
                      placeholder="Enter Task"
                    />
                    <input
                      v-if="editmodel == true"
                      type="text"
                      class="form-control"
                      id="taskname"
                      v-model="taskname"
                      aria-describedby="emailHelp"
                      placeholder="Enter Task"
                      
                    />
                  </div>
                <toggle-button @change="onChangeEventHandler" :labels="{checked: 'On', unchecked: 'Off'}" style="margin-left: 20px" />
                  <!-- <div class="form-group">
                    <label>Select Status</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="status"
                    >
                      <option value="done">Done</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div> -->
                  <!-- <div class="form-group">
           <label>Enter Last Name</label>
           <input type="text" class="form-control" v-model="last_name" />
          </div> -->
                  <br />
                  <div align="center">
                    <!-- <input type="hidden" v-model="hiddenId" /> -->
                    <input
                      v-if="editmodel == false"
                      type="button"
                      class="btn btn-success btn-xs"
                      value="submit"
                      @click="submittask"
                    />
                    <input
                      v-if="editmodel == true"
                      type="button"
                      class="btn btn-success btn-xs"
                      value="Update"
                      @click="updatetask(status)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
 <script>
import { defineComponent, isProxy, provide } from "vue";
import { apolloClient } from "../graphql/connection";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { gettodolist, addtask, updatetask,deletetask } from "../graphql/query";
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle } from 'mdbvue';
export default defineComponent({
  name: "App",
  components: {
      mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle
    },
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  data() {
    return {
      myModel: false,
      editmodel: false,
      taskname: "",
      showtable: true,
      status: "",
      _id: "",
      tasklist: [],
      userid: localStorage.getItem("uid")
      
    };
  },
  beforeMount() { 
    if(!this.userid)   
    {
      this.$router.replace("/");
    }
    this.getlist();    
  },
 
  methods: {
onChangeEventHandler : function() {
     alert('hi');
},
    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.clear();
      this.$router.replace("/");
    },
    getlist: function () {
      try{     
        apolloClient
        .query({
          query: gettodolist,
          variables:{
            userid:this.userid
          }
        })
        .then((res) => {         
          if (res) {
            this.tasklist = res.data.todo;          
          }
        })
      }catch(e){
           console.log("YESSS",e);
      }
     
      
    },
    submittask: function () {
      apolloClient
        .mutate({
          mutation: addtask,
          variables: {
            work: this.taskname,
            status: this.status,
            userid: this.userid,
            insert_date: new Date(),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.todoInsert.response == "success") {
            this.myModel = false;            
           this.getlist();
            window.location.reload();
          }
        });
      //this.$router.push({ path: "/viewtasklist",params: { taskname: this.taskname }  });
     
      // this.showtable = true;
    },
    openModel: function () {
      this.taskname = "";
      this.myModel = true;
      this.editmodel = false;
      this.status = "";
    },
    openmodeledit: function (taskname, id, status) {
      this.myModel = true;
      this.editmodel = true;
      this.taskname = taskname;
      this.status = status;
      this._id = id;
    },
    updatetask(status) {
      console.log(this._id);
      apolloClient
        .mutate({
          mutation: updatetask,
          variables: {
            _id: this._id,
            status: status,
          },
        })
        .then((res) => {
          if (res.data.todoUpdate.response == "success") {
            this.editmodel = false;
            this.getlist();
            window.location.reload();
          }
        });
    },
    deletetask(id)
    {
      apolloClient.mutate({
        mutation:deletetask,
        variables:{
          _id:id
        }
      }).then(res=>{
         this.getlist();
            window.location.reload();
      })
    }
  },
   
});

</script>