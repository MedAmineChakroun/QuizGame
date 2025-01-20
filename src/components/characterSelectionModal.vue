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
                    <div v-else class="scrollable-content">
                        <div class="characters-div">
                            <!-- Loop through characters -->
                            <div v-for="(shoppedCharacter, index) in characters" :key="index"
                                :class="['character-div', { 'selected': selectedCharacterId === shoppedCharacter.character.id }]">
                                <img :src="'data:image/png;base64,' + shoppedCharacter.character.image"
                                    alt="Character Image" @error="setAltImage($event)" />
                                <p class="character-name">{{ shoppedCharacter.character.name }}</p>
                                <p class="character-category">{{ shoppedCharacter.character.category }}</p>
                                <button class="select-btn" @click="selectCharacter(shoppedCharacter)">
                                    {{ selectedCharacterId === shoppedCharacter.character.id ? 'Selected' : 'Select' }}
                                </button>
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
import api from '@/api';


export default {
    name: "CharacterSelectionModal",
    data() {
        return {
            characters: [],
            loading: false,
            retryCount: 0,
            maxRetries: 3,
            selectedCharacterId: null,
        };
    },
    props: {
        playerId: Number
    },
    mounted() {
        this.fetchShoppedCharacters();
        this.selectedCharacterId = this.$store.state.SelectedCharacter.id;
    },
    methods: {
        async fetchShoppedCharacters() {
            this.loading = true;
            try {
                const response = await api.get(`/shoppedCharacters/byPlayer/${this.playerId}`);
                this.characters = response.data;
            } catch (error) {
                console.error(error);
                if (this.retryCount < this.maxRetries) {
                    this.retryCount++;
                    setTimeout(this.fetchShoppedCharacters, 2000);
                } else {
                    toast.error("Error fetching characters after multiple attempts!");
                }
            } finally {
                this.loading = false;
            }
        },
        async selectCharacter(shoppedCharacter) {
            try {
                await this.$store.dispatch("fetchSelectedCharacter", { characterId: shoppedCharacter.character.id });
                this.selectedCharacterId = shoppedCharacter.character.id;
                toast.success(`${shoppedCharacter.character.name} selected!`, {
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: "bottom-right",
                    transition: 'bounce'
                });
            } catch (error) {
                console.error('Error selecting character:', error);
                toast.error("Failed to select character. Please try again.");
            }
        }
    }
};
</script>

<style scoped>
/* General Styling */
* {
    font-family: "Lilita One", sans-serif;
}

/* Modal Body Scrollable Content */
.scrollable-content {
    max-height: 100%;
    overflow-y: auto;
    padding: 10px;
}

/* Button Styling */
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

/* Characters Grid Styling */
.characters-div {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

}

/* Individual Character Card */
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
    border: 3px solid transparent;
}

.character-div.selected {
    border: 3px solid #f77f00;
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

.character-category {
    font-size: 0.9rem;
    color: gray;
    margin: 0;
}

/* Modal Styling */
.modal-body {
    background-color: #fefae0;
    height: 500px;
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

.modal-title {
    color: white;
}
</style>
