import Vue from 'vue'
import navbar from "./components/navbar"
import footer from "./components/footer"
import mainPage from "./components/main-page"
import companyDash from "./components/company-dashboard"
import managerDash from "./components/manager-dashboard.vue"
import employeeDash from "./components/employee-dashboard.vue"

new Vue({
  el: '#app',
  // render: h => h(App),
  components: {
    "mynavbar": navbar,
    "myfooter": footer,
    "main-page": mainPage,
    "company-dash": companyDash,
    "manager-dash": managerDash,
    "emp-dash": employeeDash
  }

});

// Vue.component('mynavbar',navbar);
