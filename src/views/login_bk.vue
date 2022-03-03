<div class="container" style="margin-top: 65px">
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6"><h2 style="text-align:center">Login</h2></div>
    <div class="col-md-3"></div>
      
    </div>
  </div>
  <div class="container" >
    
       <div class="row">
                <div class="col-md-3">
                </div>
                <div class="col-md-6">
                       
                         <div class="form-group">
                             <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="email"  v-model="email"
                            aria-describedby="emailHelp" placeholder="Enter email" required>
                             <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                         </div>
                         <div class="form-group">
                              <label for="exampleInputPassword1">Password</label>
                             <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
                        </div>
 
                        <button style="margin-top:25px" @click="submitlogin" class="btn btn-primary">Submit</button>

                <p class="forgot-password text-right">
                  Create Account<router-link :to="{ name: 'signup' }">sign up?</router-link>
                </p>
                <div v-if="showerror==true">
                  <span style="color:red;font-weight:bold;">{{showerrormsg}}</span>
                </div>
                <div class="col-md-3">
                   
                </div>
        </div>
       </div>

  </div>