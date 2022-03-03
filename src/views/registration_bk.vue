<div class="container" style="margin-top: 65px">
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6"><h2 style="text-align:center">SignUp</h2></div>
    <div class="col-md-3"></div>
      
    </div>
  </div>
  <div class="container">
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div v-if="showmsg==true">
            <h3 style="color:red;">{{ msg }}</h3>
            </div>
         <div class="form-group">
            <label>Full Name</label>
            <input
              type="text"
              class="form-control form-control-lg"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              class="form-control form-control-lg"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control form-control-lg"
              v-model="password"
            />
          </div>
          <button style="margin-top:25px"
            type="submit"
            @click="signups"
            class="btn btn-dark btn-lg btn-block"
          >
            Sign Up
          </button>
          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{ name: 'signin' }">sign in?</router-link>
          </p>
        </div>
        <div class="col-md-3"></div>

     </div>
  </div>