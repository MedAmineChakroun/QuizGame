<template>
    <div class="modal fade custom-modal-height" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Select Character</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Loading spinner while characters are being fetched -->
                    <div v-if="loading" class="loading-spinner">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="characters-div">
                            <!-- Loop through characters -->
                            <div v-for="(shoppedCharacter, index) in characters" :key="index" class="character-div">
                                <img :src="'data:image/png;base64,' + shoppedCharacter.character.image"
                                    alt="Character Image" />
                                <p class="character-name">{{ shoppedCharacter.character.name }}</p>
                                <button class="select-btn" @click="selectCharacter(shoppedCharacter)">Select</button>
                            </div>
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

export default {
    name: "CharacterSelectionModal",
    data() {
        return {
            characters: [],  // Initialize as an array
            loading: false,  // Loading state to show loading spinner
            retryCount: 0,   // Retry logic counter
            maxRetries: 3    // Maximum number of retries on failure
        };
    },
    props: {
        playerId: Number
    },
    mounted() {
        this.fetchShoppedCharacters();
    },
    methods: {
        async fetchShoppedCharacters() {
            this.loading = true;  // Start loading spinner
            try {
                const response = await axios.get(`http://localhost:8090/shoppedCharacters/byPlayer/${this.playerId}`);
                this.characters = response.data;
                this.loading = false;  // Stop loading spinner
            } catch (error) {
                console.error(error);
                if (this.retryCount < this.maxRetries) {
                    this.retryCount++;
                    setTimeout(this.fetchShoppedCharacters, 2000); // Retry after 2 seconds
                } else {
                    toast.error("Error fetching characters after multiple attempts!");
                    this.loading = false;  // Stop loading spinner
                }
            }
        },
        selectCharacter(character) {
            // Handle character selection logic (e.g., saving to a database or local storage)
            toast.success(`${character.character.name} selected!`);
            console.log('Selected Character:', character);
        }
    }
};
</script>

<style scoped>
* {
    font-family: "Lilita One", sans-serif;
}

.select-btn {
    padding: 12px 18px;
    background-color: #f77f00;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 1.1rem;
}

.select-btn:hover {
    transform: scale(1.05);
    background-color: #ff6d00;
}

.characters-div {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 0 20px;
    margin-top: 70px;
}

.character-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffe5b4;
    border-radius: 12px;
    height: 350px;
    justify-content: center;
    transition: 0.3s;
    gap: 16px;
    padding: 10px;

}

.character-div img {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    transition: transform 0.3s;
}

.character-div img:hover {
    transform: scale(1.05);
}

.character-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
}

.modal-body {
    height: 500px !important;
    background-color: #fefae0;
}

.loading-spinner {
    text-align: center;
    font-size: 20px;
    color: #f77f00;
    margin-top: 50px;
}

.spinner-border {
    color: #f77f00;
    margin: 20px auto;
    display: block;
}

.modal-footer {
    display: flex;
    justify-content: center;
}

.modal-header {
    background-color: #f77f00;
    color: white;
    font-size: 1.25rem;
}
</style>