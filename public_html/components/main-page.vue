<template>
  <div id="login-container">
    <div class="container row center" v-if="showBtns">
      <!--<div class="row">-->
      <div class="col s5" id="start-btn-container">
        <a class="waves-effect waves-light btn-large"  href="/signup.html">
          Get Started
        </a>
      </div>
      <div class="col s1 verticalLine" style="border: black;border-left: thick solid #ff0000;"></div>
      <div class="col s6">
        <h4 class="teal-text">Login</h4><br>
        <a class="waves-effect waves-light btn-large" @click="companyLogin">
          <i class="material-icons left">supervisor_account</i>Company
        </a><br><br>
        <a class="waves-effect waves-light btn-large" @click="managerLogin">
          <i class="material-icons left">person_add</i>
          Managers
        </a><br><br>
        <a class="waves-effect waves-light btn-large" @click="employeeLogin">
          <i class="material-icons left">person</i>
          Employees
        </a><br><br>
      </div>
    </div>
    <div class="container center row " v-else id="form-container">
      <h4 class="teal-text ">{{loginOf}} Login</h4>
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate" name="username">
            <label for="icon_prefix">Username</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">vpn_key</i>
            <input id="icon_telephone" type="password" class="validate" name="password">
            <label for="icon_telephone">Password</label>
          </div>
        </div>
        <button class="waves-effect waves-light btn-large" @click="loginFunc">Login</button>
      <!--<a href="http://materializecss.com/getting-started.html" id="download-button" class="btn-large waves-effect waves-light orange">Get Started</a>-->
      <a class="btn-small waves-effect waves-light orange" @click="toggleBtns" id="back-btn">
        <i class="material-icons left">arrow_back</i>
        Go Back
      </a>
    </div>
  </div>

</template>

<script>
  export default {
    name: "main-page",
    data: function () {
      return {
        showBtns: true,
        loginOf: "Company"
      }
    },
    computed: {
      formaction: function () {
          return "/login/"+this.loginOf.toLowerCase();
      }
    },
    methods: {
      loginFunc: function () {
        console.log("in login function");
        let username=$("[name='username']").val();
        console.log(username);
        let password=$("[name='password']").val();
        console.log(password);
        $.post(this.formaction,{
         username:username,
          password:password
        },(res)=>{
          console.log(res);
          if(res==="Logged-in"){
            window.location='./'+this.loginOf.toLowerCase()+'/index.html';
          }else{
            //TODO: add pop to display error
          }
        })
      },
      toggleBtns: function () {
        this.showBtns = !this.showBtns;

      },
      companyLogin: function () {
          this.toggleBtns();
          this.loginOf = "Company";
      },
      managerLogin: function () {
        this.toggleBtns();
        this.loginOf = "Manager";
      },
      employeeLogin: function () {
        this.toggleBtns();
        this.loginOf = "Employee";
      },
    }
  }
</script>

<style scoped>
  #start-btn-container {
    margin-top: 10em;
  }

  #form-container {
    margin-top: 10em;
  }

  #back-btn {
    margin-top: 1em;
  }
</style>
