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
    categoryId: Number,
  },
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    async createNewGame() {
      const firebaseUserUid = localStorage.getItem("firebaseUserUid");
      const categoryId = this.categoryId;

      try {
        // Check if the game already exists for the current category and user
        const checkResponse = await axios.get(
          `http://localhost:8090/parties/exists?firebaseId=${firebaseUserUid}&categoryId=${categoryId}`
        );

        if (checkResponse.data) {
          // If the game exists, ask the user for confirmation
          const userConfirmed = confirm("A game already exists for this category. Do you want to delete it and create a new one?");

          if (!userConfirmed) {
            // If the user cancels, simply return and do not create a new game
            return; // Exit the function early
          }

          // If the user confirmed, delete the existing game
          await axios.delete(
            `http://localhost:8090/parties/${checkResponse.data.id}`
          );
        }

        // Create the new game
        const response = await axios.post(
          `http://localhost:8090/parties/createNewPartie?firebaseId=${firebaseUserUid}&categoryId=${categoryId}`
        );

        if (response.status === 201) {
          const partieId = response.data.id;
          this.$router.push({ path: `/game/${partieId}` });
        } else {
          alert(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while creating a new game.");
      }
    }

    ,
    async continueGame() {
      const firebaseUserUid = localStorage.getItem("firebaseUserUid");
      const categoryId = this.categoryId;

      try {
        // Check if the game exists for the current category and user
        const checkResponse = await axios.get(
          `http://localhost:8090/parties/exists?firebaseId=${firebaseUserUid}&categoryId=${categoryId}`
        );

        const partieId = checkResponse.data.id;

        if (checkResponse.data) {
          this.$router.push({ path: `/game/${partieId}` });
        } else {
          alert("No game exists for this category.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while checking for an existing game.");
      }
    }
    ,
  },
};
</script>

<style scoped>
.category-description {
  margin-top: 50px;
}

.category-card {
  /*background-image: url('@/assets/history.jpg');
  /* Replace with your image URL */
  /*background-size: cover;
  /* Ensures the image covers the entire card */
  /*background-position: center;*/
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