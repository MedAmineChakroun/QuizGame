<template>
    <div class="container">
        <BackToLobby/>
        <div class="text">
            <h1>
                <span class="spaned">Oops!</span>
                 Better luck next time, champ! 
            </h1>
        </div>
    </div>
</template>

<script>
import BackToLobby from '@/components/BackToLobby.vue';

export default {
    name: "LosingView",
    components: {
        BackToLobby
    }
}
</script>

<style scoped> 
.spaned{
    color: #f77f00;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
}

.text {
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text h1 {
    color: white;
    font-family: "Lilita One", sans-serif;
    font-size: 50px;

}
</style>
