<template>
  <div>
    <playerBarSection />
    <div class="hearts-container">
      <img class="heart-img" src="@/assets/heart.png" alt="" />
      <img class="heart-img" src="@/assets/heart.png" alt="" />
      <img class="heart-img" src="@/assets/heart.png" alt="" />
    </div>
    <div class="levels-container">
      <levelComponent v-for="level in questions" :key="level.id" :categorieId="categorieId" :levelId="level.id" />
    </div>
    <div class="back-div">
      <a href="/#/categories" class="back-link">
        <span class="back-icon">&lt;</span> Back
      </a>
    </div>
  </div>
</template>

<script>
import playerBarSection from './playerBarSection.vue';
import levelComponent from './questionComponent.vue';
import QuestionService from '@/services/QuestionService'; // Import the QuestionService

export default {
  name: "mapComponent",
  components: {
    playerBarSection,
    levelComponent
  },
  props: {
    categorieId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      questions: [],
      loading: true,  // This will hold the fetched questions
    };
  },
  async mounted() {
    // Fetch the questions and answers when the component is mounted
    this.questions = await QuestionService.fetchQuestions(this.categorieId);
  }
}
</script>



<style scoped>
.back-link {
  text-decoration: none;
  color: white;
  font-family: "Lilita One", sans-serif;
  display: flex;
  align-items: center;
  font-size: 30px;
  transition: 0.3s;
}

.back-icon {
  margin-right: 5px;
}

.back-div {
  position: fixed;
  top: 170px;
  margin-left: 70px;

}

.back-div:hover a {
  transform: scale(1.05);
}

.heart-img {
  width: 60px;
  transition: 0.3s;
  cursor: pointer;
}

.heart-img:hover {
  transform: scale(1.07);
}

.hearts-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: inline-block;
  padding: 7px 7px;
  border-radius: 30px;
  border: 3px solid white;
  background-color: rgba(255, 255, 255, 0.5);
}

.map-component {
  position: relative;
  /* Change position to relative */
  height: auto;
  /* Remove fixed height */
  min-height: 100%;
  /* Ensure minimum height of 100% */
  width: 100%;

  overflow: auto;
  /* Add overflow property for scrolling */
}

.levels-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 80px;
  justify-items: center;
  align-items: center;
  padding: 20px;
  max-width: 900px;
  margin: auto;
  /* Add a max-width to prevent the levels from becoming too wide */
  margin-top: 100px;
  /* Center the levels horizontally */
}
</style>