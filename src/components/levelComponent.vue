<template>
    <div>

        <div class="level" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <h2>1</h2>
        </div>
        <QuestionModal/>   
    </div>
</template>

<script>
import QuestionModal from './QuestionModalComponent.vue';

export default {
    name: "levelComponent",
    components: {
        QuestionModal
    },
   
}
</script>

<style>
.level {
    background-color: #370617;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid white;
    transition: 0.3s;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: "Lilita One", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
}

.level:hover {
    transform: scale(1.05);
}
</style>
