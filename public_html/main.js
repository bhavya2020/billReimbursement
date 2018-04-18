import Vue from 'vue'
import App from './components/App.vue'
import navbar from "./components/navbar"
import footer from "./components/footer"

new Vue({
  el: '#app',
  // render: h => h(App),
  components: {
    "mynavbar": navbar,
    "myfooter": footer
  }

});

// Vue.component('mynavbar',navbar);
