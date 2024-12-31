<template>
    <div class="game-view">
        <navBar />
        <mapComponent :categorieId="categorieId" />
    </div>
</template>

<script>
import navBar from '@/components/navBar.vue';
import mapComponent from '@/components/mapComponent.vue';

export default {
    name: "GameView",
    components: {
        navBar,
        mapComponent
    },
    computed: {
        categorieId() {
            return this.$route.params.categorieId; // Retrieve categoryId from route params
        }
    }
}
</script>

<style scoped>
.game-view {
    background-image: url('../assets/map.jpg');
    /* Correct asset path */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    overflow: auto;
}
</style>
