<template>
  <div class="category-card" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <div class="category-name">{{ categoryName }}</div>
    <div v-if="isHovered" class="options">
      <a href="javascript:void(0)" @click="createNewGame">New Game</a>
      <a href="javascript:void(0)" @click="continueGame">Continue</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { mapState } from "vuex";

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
  computed: {
    ...mapState({
      partieData: state => state.partieData,  // Access partieData from Vuex store
    }),
    ...mapState({
      history: state => state.history,  // Access history from Vuex store
    }),
  },
  methods: {
    // Function to check if the game already exists for the current player and category
    async createNewGame() {
      const firebaseUserUid = localStorage.getItem("firebaseUserUid");
      const categoryId = this.categoryId;

      try {
        // Check if the game already exists for the current category and user
        const checkResponse = await axios.get(
          `http://localhost:8090/parties/exists?firebaseId=${firebaseUserUid}&categoryId=${categoryId}`
        );

        if (checkResponse.data) {
          // If the game exists, ask the user for confirmation to delete the old game
          const userConfirmed = confirm("A game already exists for this category. Do you want to delete it and create a new one?");

          if (!userConfirmed) {
            // If the user cancels, simply return and do not create a new game
            return;
          }

          // If the user confirmed, delete the existing game
          await axios.delete(
            `http://localhost:8090/parties/${checkResponse.data.id}`
          );
        }

        // Now create the new game
        const response = await axios.post(
          `http://localhost:8090/parties/createNewPartie?firebaseId=${firebaseUserUid}&categoryId=${categoryId}`
        );

        if (response.status === 201) {
          const partieId = response.data.id;
          this.$store.commit("setPartieData", response.data);


          await this.$store.dispatch("fetchHistory", {
            playerId: this.partieData.player.id,
            categorieId: this.partieData.categorie.id,
          });

          // Redirect to the new game page
          this.$router.push({ path: `/game/${partieId}` });
        } else {
          alert(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {

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

          await this.$store.dispatch("fetchHistory", {
            playerId: this.partieData.player.id,
            categorieId: this.partieData.categorie.id,
          });
          this.$router.push({ path: `/game/${partieId}` });
        } else {
          toast.error("No game exists for this category.", {
            position: "top-center", // You can change position as needed
            autoClose: 3000,
            hideProgressBar: true,
          });
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
.category-card {
  background-color: #fdf0d5;
  /* Vibrant background color */

  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  width: 400px;
  height: 200px;
  border-radius: 12px;
  /* Smooth edges */
  transition: transform 0.3s, box-shadow 0.3s;
  /* Smooth transitions */
  font-family: "Lilita One", sans-serif;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  /* Subtle shadow for 3D effect */
  overflow: hidden;
  /* Ensure content doesn't overflow the card */
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-card:hover {
  transform: scale(1.06) translateY(-5px);
  /* Slight hover lift */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  /* Enhanced shadow on hover */
}

.category-name {
  font-size: 36px;
  color: #772f1a;
  /* Subtle text shadow */
  text-align: center;
  z-index: 1;
  /* Keep the category name above the options */
  transition: opacity 0.3s;
  /* Smooth fade-out effect */
}

.options {
  background-color: rgba(0, 0, 0, 0.7);
  /* Semi-transparent background */
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  /* Match the card's border radius */
  opacity: 0;
  /* Hidden by default */
  z-index: 2;
  /* Position above the category name */
  transition: opacity 0.3s;
  /* Smooth fade-in effect */
  gap: 10px;
}

.category-card:hover .options {
  opacity: 1;
  /* Show the options on hover */
}

.category-card:hover .category-name {
  opacity: 0;
  /* Hide the category name on hover */
}

.options a {
  cursor: pointer;
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #fb6107;
  /* Button background color */
  border-radius: 6px;
  transition: transform 0.3s, background-color 0.3s;
}

.options a:hover {
  background-color: #ff8800;
  /* Change button color on hover */
  transform: scale(1.1);
  /* Slight hover effect */
}
</style>