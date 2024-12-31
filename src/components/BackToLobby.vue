<template>
    <div class="back-div">
      <a href="/#/lobby" class="back-link">
        <span class="back-icon">&lt;</span> Back
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: "backComponent"
  };
  </script>
  
  <style>
  .back-link {
    text-decoration: none;
    color: white;
    font-family: "Lilita One", sans-serif;
    display: flex;
    align-items: center;
    font-size: 30px;
    transition:0.3s;
  }
  
  .back-icon {
    margin-right: 5px;
  }
  
  .back-div {
    position: fixed;
    top: 70px;
    left: 50px;
   
  }
  .back-div:hover a{
    color: #9ef01a ;
    transform: scale(1.05);
  }
  </style>
  