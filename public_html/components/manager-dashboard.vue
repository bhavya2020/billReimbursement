<template>
  <div class="container">
    <div class="row">
      <div class="col s6 center" id="card-container">
        <!--Company Details-->
        <!--<h4 class="center teal-text">Company Details</h4>-->

        <div class="card medium blue-grey lighten-5 ">
          <div class="card-content teal-text" id="card-detail">
            <span class="card-title" style="font-weight: bolder">{{ managerDetails.name}}</span>
            <hr>
            <span>Address: {{managerDetails.address}}</span><br>
            <span>Manager Code: {{managerDetails.mngCode}}</span><br>
            <span>E-Mail: {{managerDetails.email}}</span><br>
            <span>Contact No.: {{managerDetails.contactNo}}</span><br>
          </div>
          <div class="card-action" style="font-weight: bold">
            <a href="reset.html">Reset Password</a>
          </div>
        </div>
      </div>

      <div class="col s6 center">
        <!--buttons-->
        <!--TODO: Button icons change-->
        <h4 class="center teal-text">Management</h4><br><br>
        <a class="waves-effect waves-light btn" href="addEmployee.html"><i class="material-icons left">group_add</i>Add
          Employee</a><br><br>
        <a class="waves-effect waves-light btn" href="removeEmp.html"><i class="material-icons left">person_add</i>Delete
          Employee</a><br><br>
        <a class="waves-effect waves-light btn" href="addBillPolicy.html"><i class="material-icons left">delete_sweep</i>Add Bill Policy</a><br><br>
        <a class="waves-effect waves-light btn" href="removeBillPolicy.html"><i class="material-icons left">delete</i>Remove Bill Policy</a><br><br>
        <a class="waves-effect waves-light btn" href="employees.html"><i class="material-icons left">person</i>Show Employees</a><br><br>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manager-dashboard",
    data: function () {
      return {
        managerDetails: {}
      }
    },
    methods: {

    },
    mounted() {
//      console.log("mounted stuff");
      //Get & update manager details
      $.get("/manager/getDetails")
        .then((data) => {
          //console.log(data);
          this.managerDetails = data;
        })

    }
  }
</script>

<style scoped>
  #card-detail {
    font-size: 1.2em;
    font-weight: bold;
  }

  #card-container {
    margin-top: 3em;
  }
</style>
