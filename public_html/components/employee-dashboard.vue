<template>
  <div class="container">
    <div class="row">
      <div class="col s6 center" id="card-container">
        <!--Company Details-->
        <!--<h4 class="center teal-text">Company Details</h4>-->

        <div class="card medium blue-grey lighten-5 ">
          <div class="card-content teal-text" id="card-detail">
            <span class="card-title" style="font-weight: bolder">{{ empDetail.name}}</span>
            <hr>
            <span>Address: {{empDetail.address}}</span><br>
            <span>E-Mail: {{empDetail.email}}</span><br>
            <span>Contact No.: {{empDetail.contactNo}}</span><br>
            <span>Employee Code: {{empDetail.empCode}}</span><br>
            <span>Manager Id: {{empDetail.managerID}}</span><br>
          </div>
          <div class="card-action center" style="font-weight: bold">
            <a href="reset.html">Change Login Password</a>
          </div>
        </div>
      </div>

      <div class="col s6 center">
        <!--buttons-->
        <!--TODO: icons on button tobe changed-->
        <h4 class="center teal-text">Management</h4><br><br>
        <a class="waves-effect waves-light btn" href="addBill.html"><i class="material-icons left">group_add</i>Add Bill</a><br><br>
        <a class="waves-effect waves-light btn" href="showBills.html"><i class="material-icons left">person_add</i>Submitted Bills</a><br><br>
        <a class="waves-effect waves-light btn" href="removeBill.html"><i class="material-icons left">delete</i>Remove Bill</a><br><br>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "employee-dashboard",
    data: function () {
      return {
        empDetail: {}
      }
    },
    methods: {

    },
    mounted() {
      console.log("mounted stuff");
      //Get & update company details
      $.get("/employee/getDetails")
        .then((data) => {
          //console.log(data);
          this.empDetail = data;
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
