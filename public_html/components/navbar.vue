<template>
  <nav id="navbar">
    <div class="nav-wrapper white black-text">
      <div class="container">
        <a href="#" class="brand-logo black-text">Bill Reimbursement</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down black-text">
          <li><a href="/logout" class="black-text">LOGOUT</a></li>
          <li><a href="../signup.html" class="black-text">SignUp</a></li>
          <li><a href="#" class="black-text">About Us</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>

</style>

<style>
  body {
    display: flex;
    min-height: 30vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
    min-height: 45vh;
  }
</style>
