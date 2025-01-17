<template>
    <navBar />
    <playerBarSection />
    <h1>Player Profil</h1>
    <div class="profil-panel">
        <div class="left-container">
            <div class="player-fields-div">
                <div class="player-field">
                    <div class="label-div">
                        <label>UserName:</label>
                    </div>
                    <div>
                        <input type="text" class="game-input" v-model="player.userName">
                        <button class="edit-button" @click="updatePlayerData('userName')">Edit</button>
                    </div>
                </div>
                <div class="player-field">
                    <div class="label-div">
                        <label>Email:</label>
                    </div>
                    <div>
                        <input type="text" class="game-input" v-model="player.email">
                        <button class="edit-button">Edit</button>
                    </div>
                </div>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="select-character-btn">
                    Select Character
                </button>
            </div>
        </div>
        <div class="right-container">
            <div class="character-div">
                <img class="character-img" :src="'data:image/png;base64,' + SelectedCharacter.base64Image"
                    alt="character">
                <p class="character-name">{{ SelectedCharacter.name }}</p>
            </div>
        </div>
    </div>
    <backComponent class="backComponent" />
    <characterSelectionModal :playerId="this.player.id" />
</template>
<script>
import navBar from "@/components/navBar.vue";
import playerBarSection from "@/components/playerBarSection.vue";
import characterSelectionModal from "@/components/characterSelectionModal.vue";
import backComponent from "@/components/BackToLobby.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';
import { mapState } from "vuex";

export default {
    name: "PlayerProfilView",
    components: {
        navBar,
        playerBarSection,
        characterSelectionModal,
        backComponent
    },
    data() {
        return {
            player: {},
        };
    },
    computed: {
        ...mapState({
            SelectedCharacter: state => state.SelectedCharacter,  // Access partieData from Vuex store
        }),
    },
    mounted() {
        this.fetchPlayerData();

    },
    methods: {
        async fetchPlayerData() {
            try {
                const firebaseUserUid = localStorage.getItem("firebaseUserUid");
                const playerResponse = await axios.get(`http://localhost:8090/players/player/${firebaseUserUid}`);
                this.player = playerResponse.data;
            } catch (error) {
                console.error("Error fetching player data:", error);
            }
        },
        async updatePlayerData(field) {
            try {

                const payload = {
                    userName: this.player.userName,
                    email: this.player.email
                };
                // Update specific player field here
                await axios.put(`http://localhost:8090/players/${this.player.id}`, payload);
                toast.success("Data updated successfully!", {
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: "bottom-right",
                    transition: 'bounce'
                });
            } catch (error) {
                console.error(`Error updating ${field}:`, error);
                toast.error(`Failed to update ${field}. Please try again.`, {
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: "bottom-right",
                    transition: 'bounce'
                });
            }
        }
    }
};
</script>
<style scoped>
.backComponent {
    margin-top: 100px;
    margin-left: 50px;
}

.label-div {
    position: relative;
    display: flex;
    align-self: start;
    margin-left: 30px;
    left: 0;
    font-family: "Lilita One", sans-serif;
    color: #582f0e;
}

h1 {

    margin: 0 auto;
    color: white;
    font-family: "Lilita One", sans-serif;
    width: 400px;
    text-align: center;
}

.profil-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fdf0d5;
    width: 800px;
    height: 480px;
    margin: auto;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.right-container {
    flex: 0.6;
    /* Flex property for equal width */
    display: flex;
    justify-content: center;
    align-items: center;

}

.left-container {
    flex: 1;
    /* Flex property for equal width */
    display: flex;
    justify-content: center;
    align-items: center;


}

.player-fields-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* Space between input fields and buttons */
    width: 80%;

    align-items: sta;
}

.player-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    /* Space between input and button */
    background-color: #ffe5b4;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.player-field div {
    display: flex;
    gap: 20px;
}

.game-input {
    flex: 1;
    padding: 10px;
    font-family: "Lil", cursive;
    border: 2px solid #582f0e;
    border-radius: 5px;
    outline: none;
}

.edit-button,
.select-character-btn {
    padding: 10px 15px;
    background-color: #f77f00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: "Lilita One", sans-serif;
    transition: background-color 0.3s, transform 0.3s;
}

.edit-button:hover,
.select-character-btn:hover {
    transform: scale(1.05);
    background-color: #ff6d00;

}

.select-character-btn {
    align-self: center;
    /* Center the select character button */
    /* Margin at the top of the button */
    padding: 15px 20px;
    background-color: #7cb518;
    margin-top: 10px;
}

.select-character-btn:hover {
    background-color: #5c8001;
}

.character-div {
    margin-right: 50px;
}

.character-img {
    width: 200px;
    height: 300px;

}

.character-name {
    font-family: "Lilita One", sans-serif;
    color: #2c3e50;
    font-size: 1.3rem;
}
</style>