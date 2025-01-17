<template>
    <div class="shop-container">
        <navBar />
        <player-bar-section />
        <div class="main-container">
            <h1 class="shop-title">Characters Shop</h1>
            <div v-if="Loading" class="loader">Loading...</div>
            <div v-else class="characters-container">
                <div v-for="(character, index) in character" :key="index" class="character-card">
                    <img :src="'data:image/png;base64,' + character.base64Image" alt="Character Image"
                        class="character-image" />
                    <hr />
                    <div class="character-info">
                        <h2 class="character-name">{{ character.name }}</h2>
                        <p class="character-category">Category: {{ character.category }}</p>
                        <p class="character-rarity">Rarity: <span :class="rarityClass(character.rarity)">{{
                            character.rarity }}</span></p>
                        <p class="character-price">Price:
                            {{ character.price === 0 ? 'Free' : '$' + character.price }}
                        </p>
                    </div>
                    <button class="btn-buy" :class="{ 'btn-disabled': isCharacterPurchased(character.id) }"
                        :disabled="isCharacterPurchased(character.id)"
                        @click="buyCharacter(character.id, character.price)">
                        {{ isCharacterPurchased(character.id) ? "Purchased" : "Buy" }}
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import navBar from '@/components/navBar.vue';
import playerBarSection from '@/components/playerBarSection.vue'
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
    name: "shopView",
    components: {
        navBar,
        playerBarSection
    },
    data() {
        return {
            character: [],
            ShoppedCharacters: [],
            Loading: true
        }
    },
    mounted() {
        this.fetchCharacters();
        this.fetchShoppedCharacters();
    },
    methods: {
        isCharacterPurchased(characterId) {
            return this.ShoppedCharacters.some(shopped => shopped.character.id === characterId);
        },
        async fetchCharacters() {
            try {
                const response = await axios.get('http://localhost:8090/characters');
                this.character = response.data;
                this.Loading = false;
            } catch (error) {
                console.error("There was an error fetching the characters:", error);
                this.Loading = false;
            }
        },
        async fetchShoppedCharacters() {
            try {
                const player = await this.fetchPlayerData();
                const playerId = player.id;
                const response = await axios.get(`http://localhost:8090/shoppedCharacters/byPlayer/${playerId}`);
                this.ShoppedCharacters = response.data;
            } catch (error) {
                console.error('error:', error);
            }
        },
        async fetchPlayerData() {
            const firebaseUserUid = localStorage.getItem("firebaseUserUid");
            const playerResponse = await axios.get(`http://localhost:8090/players/player/${firebaseUserUid}`)
            return playerResponse.data;
        },
        rarityClass(rarity) {
            switch (rarity) {
                case "RARE":
                    return "rare";
                case "EPIC":
                    return "epic";
                case "LEGENDARY":
                    return "legendary";
                default:
                    return "common"; // Fallback to "common" if no match
            }
        },
        async buyCharacter(characterID, characterPrice) {
            try {
                const player = await this.fetchPlayerData();
                const playerID = player.id;

                if (player.gold < characterPrice) {
                    toast.error('Not Enough Gold Champ!', {
                        autoClose: 2000,
                        hideProgressBar: true,
                        position: "bottom-right",
                        transition: 'bounce'
                    });
                    return;
                }
                await this.decreaseGoldFromPlayer(characterPrice)
                const response = await axios.post(`http://localhost:8090/shoppedCharacters?playerId=${playerID}&characterId=${characterID}`);
                await this.fetchShoppedCharacters();
                toast.success(`${response.data.character.name} joined the team!`, {
                    autoClose: 4000,
                    hideProgressBar: true,
                    position: "bottom-right",
                    transition: 'bounce'
                })
            } catch (error) {
                console.log("error:", error)
            }

        },
        async decreaseGoldFromPlayer(characterPrice) {
            try {
                const player = await this.fetchPlayerData();
                const playerId = player.id;
                const newAmount = player.gold - characterPrice;
                console.log("newAmount:", newAmount, "characterPrice:", characterPrice);
                const response = await axios.put(`http://localhost:8090/players/${playerId}`, { "gold": newAmount });
                console.log('update:', response.data)
                this.$store.dispatch('fetchPlayerData');
            } catch (error) {
                console.log("error:", error)
            }

        }

    }
}
</script>

<style scoped>
hr {
    margin: 0;
}

.shop-container {
    color: #333;
    font-family: "Lilita One", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px;
    max-width: 1200px;
    width: 100%;
}

.shop-title {
    font-size: 48px;
    text-align: center;
    color: #70e000;
    /* Tomato color */
    margin-bottom: 40px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    /* Added text shadow for a cool effect */
}

.loader {
    font-size: 24px;
    color: #ff6347;
}

.characters-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 0 20px;
}

.character-card {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 20px;
    width: 250px;
    height: 400px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin-bottom: 20px;
}

.character-card:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.character-image {
    width: 100%;
    height: 180px;
    object-fit: contain;
    border-radius: 10px;
    margin-bottom: 15px;
}

.character-info {
    margin-top: 10px;
}

.character-name {
    font-size: 20px;
    font-weight: bold;
    color: #494848;
    margin-bottom: 8px;
}

.character-category,
.character-rarity,
.character-price {
    font-size: 16px;
    color: #666;
    margin: 4px 0;
}

.rare {
    color: #dc3545;
    /* red for rare characters */
}

.common {
    color: #007bff;
    /* Blue for common characters */
}

.legendary {
    color: #ff4500;
    /* Orange for legendary characters */
}

.epic {
    color: #8a2be2;
    /* Blueviolet for epic characters */
}

.btn-buy {
    background-color: #7cb518;
    /* btn width all width parrent*/
    width: 100%;
    color: white;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-buy:hover {
    /* Darker shade for hover effect */
    background-color: #6aa414;
}

.btn-buy.btn-disabled {
    background-color: #ccc;
    /* Gray for disabled state */
    cursor: not-allowed;
    pointer-events: none;
}


@media (max-width: 768px) {
    .main-container {
        padding: 0 10px;
    }

    .character-card {
        width: 100%;
        max-width: 300px;
    }
}
</style>
