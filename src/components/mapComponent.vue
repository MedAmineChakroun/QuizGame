<template>
    <div class="map-component">
        <playerBarSection/>
        <div class="hearts-container">
            
                <img class="heart-img" src="@/assets/heart.png" alt="">
         
                <img class="heart-img" src="@/assets/heart.png" alt="">
           
                <img class="heart-img" src="@/assets/heart.png" alt="">
            
        </div>
        <div class="levels-container">
            <levelComponent />
            <levelComponent />
            <levelComponent />
            <levelComponent />
            <levelComponent />
            <levelComponent />
            <levelComponent />
            <levelComponent />
            <levelComponent />
            <levelComponent />
        </div>
            
    </div>
</template>
<script>
import playerBarSection from './playerBarSection.vue';
import levelComponent from './levelComponent.vue';

export default{
    name:"mapComponent",
    components:{
        playerBarSection,
        levelComponent
    },
    
}

</script>
<style>
.heart-img{
    width: 60px;
  
}

.hearts-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 7px;
    
}
.map-component {
    position: relative; /* Change position to relative */
    height: auto; /* Remove fixed height */
    min-height: 100%; /* Ensure minimum height of 100% */
    width: 100%;
    
    overflow: auto; /* Add overflow property for scrolling */
}

.levels-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 100px;
    justify-items: center;
    align-items: center;
    padding: 20px;
    max-width: 800px;
    margin: auto; /* Add a max-width to prevent the levels from becoming too wide */
    margin-top: 20px;/* Center the levels horizontally */
}

</style>