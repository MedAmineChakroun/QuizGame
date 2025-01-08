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
        :questionNumber="i" />
    </div>
  </div>
</template>

<script>
import playerBarSection from './playerBarSection.vue';
import levelComponent from './questionComponent.vue';
import QuestionService from '@/services/QuestionService';

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
  computed: {
    // Access partieData directly from Vuex store
    partieData() {
      return this.$store.state.partieData;
    },
    nbHeart() {
      return this.partieData.nbHeart;
    },
    questionReached() {
      return this.partieData.questionReached;
    }

  },
  data() {
    return {
      questions: [],
      loading: true
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

        this.$store.dispatch('fetchPartieData', partieId);
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
  margin-bottom: 100px;
}
</style>
