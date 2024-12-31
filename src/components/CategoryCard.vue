<template>
  <div class="category-card" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <div class="category-name">{{ categoryName }}</div>
    <div class="category-description">{{ categoryDescription }}</div>
    <div v-if="isHovered" class="options">
      <a href="javascript:void(0)" @click="createNewGame">New Game</a>
      <a href="javascript:void(0)" @click="continueGame">Continue</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CategoryCard",
  props: {
    categoryName: String,
    categoryDescription: String,
    categoryId: Number
  },
  data() {
    return {
      isHovered: false,
      playerId: 1,
    };
  },
  methods: {
    async createNewGame() {
  try {
    // Vérifier si le joueur a déjà une partie dans cette catégorie
    const existingGameResponse = await axios.get(`http://localhost:8090/parties/player/${this.playerId}/category/${this.categoryId}`);
    
    if (existingGameResponse.data) {
      // Si une partie existe déjà, la supprimer
      const gameIdToDelete = existingGameResponse.data.idPartie;
      await axios.delete(`http://localhost:8090/parties/${gameIdToDelete}`);
      console.log(`Existing game with ID ${gameIdToDelete} deleted.`);
    }

    // Créer une nouvelle partie
    const newGameResponse = await axios.post('http://localhost:8090/parties/save', {
      levelReached: 1,
      nbHeart: 3,
      categorie: { idCategorie: this.categoryId },
      player: { idPlayer: this.playerId }
    });

    console.log('New game created:', newGameResponse.data);
  } catch (error) {
    console.error('Error creating new game:', error);
  }
}


,
    continueGame() {
      this.$emit('continue-selected', this.categoryId);
    }
  }
};
</script>



<style>
.category-description {
  margin-top: 50px;
}
.category-card {
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  width: 400px;
  height: 200px;
  border-radius: 8px;
  background-color: #fdf0d5;
  transition: 0.3s;
  font-family: "Lilita One", sans-serif;
}
.category-card:hover {
  transform: scale(1.04);
  box-shadow: 0px 0px 4px 1px rgb(65, 62, 62);
}
.category-name {
  font-weight: bold;
  color: #813405;
  font-size: 20px;
}
.options {
  background-color: #ffe5b4;
  padding: 5px;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  border-radius: 6px;
  height: 80%;
  position: relative;
  top: -65px;
}
.options a {
  cursor: pointer;
  color: #582f0e;
  text-decoration: none;
  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}
.options a:hover {
  color: #fb6107;
  font-size: 19px;
}
</style>
