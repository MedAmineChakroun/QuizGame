<template>
    <div class="game-view">
        <navBar/>
        <mapComponent/>
    </div>
</template>
<script>
import navBar from '@/components/navBar.vue';
import mapComponent from '@/components/mapComponent.vue';

export default{
    name:"GameView",
    components:{
        navBar,
        mapComponent
    }
}

</script>
<style scoped>
.game-view {
    background-image:url('@/assets/map.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh; /* Ensure the component fills the entire viewport height */
    overflow: auto; /* Add overflow property for scrolling */
}
</style>