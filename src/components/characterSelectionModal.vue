<template>
    <div class="modal fade custom-modal-height" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Characters Panel</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="characters-div">
                        <div class="character-div">
                            <img src="@/assets/redCharacter.png" alt="">
                            <p style="margin: 0px">character name</p>
                            <button class="select-btn">Select</button>
                        </div>
                        <div class="character-div">
                            <img src="@/assets/zez.png" alt="">
                            <p style="margin: 0px">character name</p>

                            <button class="select-btn">Select</button>

                        </div>
                        <div class="character-div">
                            <img src="@/assets/Al.png" alt="">
                            <p style="margin: 0px"> character name</p>

                            <button class="select-btn">Select</button>

                        </div>
                        <div class="character-div">
                            <img src="@/assets/Bonzo.png" alt="">
                            <p style="margin: 0px">character name</p>

                            <button class="select-btn">Select</button>
                        </div>


                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: "characterSelectionModal"
}
</script>
<style scoped>
* {
    font-family: "Lilita One", sans-serif;
}

.select-btn {
    padding: 10px 15px;
    background-color: #f77f00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.select-btn:hover {
    transform: scale(1.05);
    background-color: #ff6d00;

}

.characters-div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    /* Adjust column width as needed */
    gap: 10px;
    /* Space between characters */
    overflow-y: auto;
    /* Vertical scrollbar if content overflows */
    max-height: 400px;
    margin-top: 30px;
    column-gap: 20px;
}

.character-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    background-color: #ffe5b4;
    border-radius: 12px;
    height: 350px;
    justify-content: center;
    transition: 0.3s;
    gap: 20px;

}

.character-div img:hover {
    transform: scale(1.05);
}

.modal-body {
    height: 500px !important;
    background-color: #fefae0;
}

img {
    width: 200px;
    transition: 0.3s;
    cursor: pointer;
    height: 200px;
}
</style>