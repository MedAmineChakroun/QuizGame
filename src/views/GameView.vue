<template>
    <div class="game-view">
        <navBar />
        <mapComponent :categorieId="categorieId || 0" />
    </div>
</template>

<script>
import navBar from '@/components/navBar.vue';
import mapComponent from '@/components/mapComponent.vue';
import api from '@/api';


export default {
    name: "GameView",
    components: {
        navBar,
        mapComponent
    },
    data() {
        return {
            categorieId: null, // Initialize categorieId to null
        };
    },
    async mounted() {
        const partieId = this.$route.params.partieId; // Retrieve partieId from route params

        try {
            // Fetch the party details to get the categorieId
            const response = await api.get(`/parties/${partieId}`);

            this.categorieId = response.data.categorie.id; // Assign categorieId from response
        } catch (error) {
            console.error("Error fetching partie data:", error);
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
    padding-right: -50px;
}
</style>
