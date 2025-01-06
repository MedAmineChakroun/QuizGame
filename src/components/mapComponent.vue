<template>
  <div>
    <playerBarSection />
    <div class="hearts-container">
      <template v-for="i in nbHeart" :key="i">
        <img class="heart-img" src="@/assets/heart.png" alt="Heart Icon" />
      </template>
    </div>
    <div class="levels-container">
      <levelComponent v-for="(level, i) in questions" :key="level.id" :categorieId="categorieId" :levelId="level.id"
        :questionNumber="i" :partieData="partieData" />
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
import QuestionService from '@/services/QuestionService';
import axios from 'axios';

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
      nbHeart: 3,
      questions: [],
      loading: true,
      partieData: {}
    };
  },
  watch: {
    // Watch for changes in categorieId
    categorieId(newCategorieId) {
      if (newCategorieId) {
        this.fetchQuestions(newCategorieId);
      }
    },
    // Watch for changes in partieId to fetch the nbHeart value
    '$route.params.partieId': 'fetchPartieData',
  },
  methods: {
    async fetchQuestions(categorieId) {
      try {
        this.loading = true;
        this.questions = await QuestionService.fetchQuestions(categorieId);
        this.loading = false;
      } catch (error) {
        console.error("Error fetching questions:", error);
        this.loading = false;
      }
    },
    async fetchPartieData(partieId) {
      try {
        const response = await axios.get(`http://localhost:8090/parties/${partieId}`);
        const partieData = response.data;
        this.nbHeart = partieData.nbHeart; // Update nbHeart from partie data
        this.partieData = partieData; // Ensure partieData is populated

        // Fetch questions after getting the heart value and other data
        this.fetchQuestions(this.categorieId);
      } catch (error) {
        console.error("Error fetching partie data:", error);
        this.loading = false;
      }
    }
  },
  mounted() {
    const partieId = this.$route.params.partieId; // Retrieve partieId from route params
    if (partieId) {
      this.fetchPartieData(partieId);
    } else {
      console.error('Partie ID is not available.');
      this.loading = false;
    }
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
  height: auto;
  min-height: 100%;
  width: 100%;
  overflow: auto;
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
  margin-top: 100px;
}
</style>
