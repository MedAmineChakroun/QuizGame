<template>
    <div class="category-card" @mouseover="isHovered = true" @mouseleave="isHovered = false">
      <div class="category-name">{{ categoryName }}</div>
      <div v-if="isHovered" class="options">
        <a href="/#/game">New Game</a>
        <a href="/#/game">Continue</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CategoryCard",
    props: {
      categoryName: String,
      categoryLink: String
    },
    data() {
      return {
        isHovered: false
      };
    },
   
  };
  </script>
  
  <style>
.category-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  width: 400px; /* Adjust width as needed */
  height: 200px; /* Adjust height as needed */
  border-radius: 8px;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  transition: 0.3s;
  font-family: "Lilita One", sans-serif;
 /* Rounded corners */
}
.category-card:hover{
    transform: scale(1.04);
    box-shadow: 0px 0px 4px 1px black;
}
.category-name {
  font-weight: bold;
}

.options {
  position: relative;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 5px;
  display: flex;
  flex-direction: row;
  column-gap: 10px !important;
  border-radius: 6px;
  height: 80%;
  margin-top: 8px;
   /* Rounded corners */
}

.options a {
  cursor: pointer;
  color: #333; /* Link color */
  text-decoration: none;
  width: 50%;
  display: inline-flex; /* Use flexbox */
  align-items: center;
  justify-content: center;
}

.options a:hover {
  background-color: #e7e2e2 ;
  color: rgb(75, 7, 142); /* Link color on hover */
  font-size: 19px;

}
</style>