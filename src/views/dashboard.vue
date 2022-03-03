<template>
  <div class="vue-tempalte">
  <nav>
    <ul class="menuItems">
     
      <li><a href='#' data-item='Contact'>Todo</a></li>
       <li style="margin-left: 66rem">
            <button class="btn btn-outline-primary text-right" @click="logout" >
              Logout
            </button>
          </li>
    </ul>
  </nav>
  <div >
  
    </div>
  
  <main id="todolist">
   <form name="newform" v-on:submit.prevent="">
    <label for="newitem">Add to the todo list</label>
    <input type="text" name="newitem" id="newitem" v-model="taskname">
    <button type="submit" v-if="editmodel==false" @click="submittask">Add item</button>
     <button type="submit" v-if="editmodel==true" @click="updatetask(taskname)">Update item</button>
  </form>
  <h3 style="margin-top:5px;">
    Todo List
    <span>Get things done, one item at a time.</span>
  </h3>
<!-- v-if="todo.length" -->
  
    <transition-group name="todolist" tag="ul" v-if="tasklist.length > 0">
   
      <li v-for="item in tasklist"  v-bind:key="item._id">        
          <span class="label" v-if="item.status=='done'" style='color:white;text-decoration:line-through'>{{item.work}}</span>
         <span class="label" v-if="item.status=='true'">{{item.work}}</span>
        <span class="label" v-if="item.status=='pending'">{{item.work}}</span>
        <span class= "label">{{item.insert_date}} </span>
        <span class="label">{{item.update_date}} </span>
        <div class="actions">
         
          <input type="checkbox" v-bind:name="item.work"  id="item.work" v-if="item.status=='pending'"   v-on:change="onToogle(item.work,item.status,item._id)" v-model="item.status" v-bind:value="item.work">
          <input type="checkbox" v-bind:name="item.work"  id="item.work"  checked  v-if="item.status=='done'" v-on:change="onToogle(item.work,item.status,item._id)">
           <button  style="margin: 15px;" class="btn-picto" type="button" v-on:click="openmodeledit(item.work, item._id, item.status)" aria-label="Edit" title="Edit">
            <i aria-hidden="true" class="icon-edit"></i>
          </button>

          <button class="btn-picto" type="button" v-on:click="deletetask( item._id)" aria-label="Delete" title="Delete">
            <i aria-hidden="true" class="icon-trash"></i>
          </button>
        </div>
       
      </li>
    </transition-group>
    <div class="pull-right" style="font-size:25px" v-if="tasklist.length > 0">
      <input type="checkbox" name="sortby" v-on:change="sortbydata(flag)" v-model="isactives" value="isactives" >Move done items at the end?
    </div>
     <h2 v-if="!tasklist.length > 0" class="emptylist">Your todo list is empty.</h2>
  <!-- <p v-else class="emptylist">Your todo list is empty.</p> -->

  
  </main>
 </div>
</template>
<style scoped>
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
nav {
  margin: 0px;
  background: #f9f9f9;
  padding: 0px;
}
    .menuItems {
    list-style: none;
    display: flex;
    }
    li {
      margin: 50px;
    }
      a {
        text-decoration: none;
        color: #8f8f8f;
        font-size: 24px;
        font-weight: 400;
        transition: all 0.5s ease-in-out;
        position: relative;
        text-transform: uppercase;
      }
        a::before {
          content: attr(data-item);
          transition: 0.5s;
          color: #8254ff;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 0;
          overflow: hidden;
        }

        * {
	margin:0;
	padding:0;
	box-sizing:border-box;
}
html, body {
	background:#f7f1f1;
	font-size:1.1rem;
	font-family:'Quicksand', sans-serif;
	height:100%;
}
@keyframes strikeitem {
	to { width:calc(100% + 1rem); }
}

#todolist {
	margin:4rem auto;
	padding:2rem 3rem 3rem;
	max-width:72%;
	background:linear-gradient(90deg, #C7C5F4, #776BCC);
	color:#FFF;
	box-shadow:-20px -20px 0px 0px rgba(100,100,100,.1);
}
#todolist h1 {
    /*text-align:center;*/
    font-weight:normal;
    font-size:2.6rem;
    letter-spacing:0.05em;
    border-bottom:1px solid rgba(255,255,255,.3); 
}
#todolist h1 span {
	display:block;
	font-size:5rem;
	margin-bottom:0.7rem;
	margin-left:3px;
	margin-top:0.2rem;   
}

#todolist .emptylist {
	margin-top:2.6rem;
	text-align:center;
	letter-spacing:.05em;
	font-style:italic;
	opacity:0.8;
	
}
#todolist ul {
	margin-top:2.6rem;
	list-style:none;
}
#todolist .todolist-move {
	transition: transform 1s;
}
#todolist li {
	display:flex;
	margin:0 -3rem 4px;
	padding:1.1rem 3rem;
	justify-content:space-between;
	align-items:center;
	background:rgba(255,255,255,0.1);
  font-size:25px
}

#todolist .actions {
	flex-shrink:0;
	padding-left:0.7em;
}
#todolist .label {
	position:relative;
	transition:opacity .2s linear;
}
#todolist .done .label {
	opacity:.6;
}
#todolist .done .label:before {
	content:'';
	position:absolute;
	top:50%;
	left:-.5rem;
	display:block;
	width:0%;
	height:1px;
	background:#FFF;
	animation:strikeitem .3s ease-out 0s forwards;
}
#todolist .btn-picto {
	border:none;
	background:none;
	-webkit-appearance:none;
	cursor:pointer;
	color:#FFF;
}


/* FORM */
form {
	margin-top:3rem;
	display:flex;
	flex-wrap:wrap;
}
form label {
	min-width:100%;
	margin-bottom:.5rem;
	font-size:1.3rem;
}
form input {
	flex-grow:1;
	border:none;
	background:#f7f1f1;
	padding:0 1.5em;
	font-size:initial;
}
form button {
	padding:0 1.3rem;
	border:none;

	text-transform:uppercase;
	font-weight:bold;
	border:1px solid rgba(255,255,255,.3);
	margin-left:5px;
	cursor:pointer;
	transition:background .2s ease-out;
}
form button:hover {
	background:#C7C5F4;
}
form input, 
form button {
	font-family:'Quicksand', sans-serif;
	height:3rem;
}


/* TOOGLE COMPONENT */
.togglebutton-wrapper {
	margin-top:1em;
}
.togglebutton-wrapper label {
    display:flex;
    justify-content:flex-end;
    align-items:center;
}
.togglebutton-wrapper input {
	position:absolute;
    left:-9999px;
}
.togglebutton-wrapper .togglebutton-label {
	font-size:.8rem;
	letter-spacing:.1em
}
.togglebutton-wrapper .tooglebutton-box {
	position:relative;
	display:block;
	margin-left:0.6em;
	width:38px;
	height:22px;
	background:white;
	/*border:1px solid black;*/
	border-radius:999px;
	cursor:pointer;
}
.togglebutton-wrapper .tooglebutton-box:before {
	content:'';
	position:absolute;
	top:2px; left:2px;
	display:block;
	width:18px; height:18px;
	/*border:1px solid #FF6666;*/
	border-radius:50%;
	background:#FF6666;
	opacity:0.7;
	transition:	all .2s ease-in-out;
}
.togglebutton-wrapper.togglebutton-focus .tooglebutton-box {
	box-shadow:0px 0px 0px 3px rgba(0,0,0,0.1);
}
.togglebutton-wrapper.togglebutton-checked .tooglebutton-box:before {
	left:calc(100% - 4px - 16px);
	opacity:1;
}

    
    
  

</style>
 <script>
import { defineComponent, isProxy, provide } from "vue";
import { apolloClient } from "../graphql/connection";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { gettodolist, addtask, updatetask,deletetask,getsortedlist } from "../graphql/query";
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
  model : {
    prop: 'checked',
    event: 'change'
  },
  data() {
    return {
      myModel: false,
      editmodel: false,
      taskname: "",
      showtable: true,
      isactive:false,
      isactives:false,
      flag:false,
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

    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.clear();
      this.$router.replace("/");
    },
    getlist: function () {
      var global=this
      try{     
        apolloClient
        .query({
          query: gettodolist,
          variables:{
            userid:this.userid
          },
          fetchPolicy: 'network-only',
        })
        .then((res) => {         
          if (res) {
            global.tasklist = res.data.todo;          
          }
        })
      }catch(e){
           console.log("YESSS",e);
      }
     
      
    },
    submittask: function () {
      var global=this
      apolloClient
        .mutate({
          mutation: addtask,
          variables: {
            work: this.taskname,
            status: "pending",
            userid: this.userid,
            insert_date: new Date(),
            update_date:new Date()
          },
        })
        .then((res) => {
         
          if (res.data.todoInsert.response == "success") {          
           this.taskname="";
           global.getlist();
        
          }
        });     
    },
    onToogle: function(work,status,id) {
    if(status==true)
    {
      this.status="done"
    }else if(status=="done"){
       this.status="pending"
    }
    else {
      this.status="pending"
    }
  this._id=id
  this.updatetask(this.status,work)

    },
    sortbydata()
    {
  
      if(this.flag==false)
      {
        
         apolloClient.query({
        query:getsortedlist,
        variables:{
         userid:this.userid
        
        },
        fetchPolicy: 'network-only',
      })
      .then(res=>{
        console.log(res);
        this.tasklist=res.data.todo;
        this.flag=true;
      })

      }else
      {
         apolloClient
        .query({
          query: gettodolist,
          variables:{
            userid:this.userid
          },
          fetchPolicy: 'network-only',
        })
        .then((res) => {         
          if (res) {
            this.tasklist = res.data.todo;  
             this.flag=false;        
          }
        })

      }
     

    },
   
    openmodeledit: function (taskname, id, status) {   
      this.editmodel=true
      this.taskname = taskname;     
      this._id = id;
    },
    updatetask(status,taskname) {
    // var global=this
      apolloClient
        .mutate({
          mutation: updatetask,
          variables: {
            _id: this._id,
            status: this.status,
            work:this.taskname,
            update_date:new Date()

          },
        })
        .then((res) => {
          if (res.data.todoUpdate.response == "success") {
            this.editmodel = false;
            this.taskname=""
            this.getlist();
           // window.location.reload();
          }
        });
    },
    deletetask(id)
    {
      var global=this
      apolloClient.mutate({
        mutation:deletetask,
        variables:{
          _id:id
        }
      }).then(res=>{
         global.getlist();
           // window.location.reload();
      })
    }
  },
   
});

</script>