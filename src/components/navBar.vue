<!-- src/components/NavBar.vue -->
<template>
   <nav class="navbar navbar-dark bg-dark fixed-top " id="custom-nav">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">QuizWhiZ</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end text-bg-dark sideBar" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Help</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Visit Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Disconnect</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">FAQs</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
  </template>
  
  <script>
  export default {
    name: "navBar",
  };
  </script>
  
<style scoped>
.sideBar{
  border-radius: 0px 0px 0px 80px;
  background-color: #0496ff !important;
}
.nav-link{
  font-family: "Lilita One", sans-serif;
  font-size: 27px;
}
#custom-nav{
  background-color: rgba(0, 0, 0, 0.2) !important; /* Slightly opaque background */
  
 }
.navbar-brand{
  font-family: "Lilita One", sans-serif;
  font-size: 25px;
}
</style>  