<template>
    <navBar/>
    <div class="container">
            <h1>Coming Soon!</h1>
    </div>
    <backComponent/>
</template>

<script>
import navBar from '@/components/navBar.vue';
import backComponent from '@/components/BackToLobby.vue';

export default {
    name: "shopView",
    components: {
        navBar,
        backComponent
    }
}
</script>

<style scoped>
.container {

    position: relative;
    top: 300px;
    color: white;
    font-family: "Lilita One", sans-serif;
    

}


    
</style>
