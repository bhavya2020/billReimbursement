<template>
  <nav id="navbar">
    <div class="nav-wrapper white black-text">
      <div class="container">
        <a href="#" class="brand-logo black-text">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down black-text">
          <li><a href="sass.html" class="black-text">Sass</a></li>
          <li><a href="badges.html" class="black-text">Components</a></li>
          <li><a href="collapsible.html" class="black-text">JavaScript</a></li>
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
