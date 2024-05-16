<template>
    <navBar/>
    <div class="profil-panel">

    </div>
</template>
<script>
import navBar from "@/components/navBar.vue";

export default {
    name:"PlayerProfilView",
    components:{
        navBar
    }
}
</script>
<style>
h1{
    position: fixed;
    color: white;
    font-family: "Lilita One", sans-serif;
    top:300px;
    left:600px
}
</style>
