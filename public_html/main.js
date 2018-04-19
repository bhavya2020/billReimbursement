import Vue from 'vue'
import navbar from "./components/navbar"
import footer from "./components/footer"
import mainPage from "./components/main-page"
import companyDash from "./components/company-dashboard"

new Vue({
  el: '#app',
  // render: h => h(App),
  components: {
    "mynavbar": navbar,
    "myfooter": footer,
    "main-page": mainPage,
    "company-dash": companyDash
  }

});

// Vue.component('mynavbar',navbar);
