import Vue from 'vue'
import navbar from "./components/navbar"
import footer from "./components/footer"
import mainPage from "./components/main-page"

new Vue({
  el: '#app',
  // render: h => h(App),
  components: {
    "mynavbar": navbar,
    "myfooter": footer,
    "main-page": mainPage
  }

});

// Vue.component('mynavbar',navbar);
