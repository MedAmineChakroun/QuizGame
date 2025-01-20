<template>
  <div>
    <nav-bar />
    <playerBarSection />
    <div>
      <h1 class="select-text">Select a Category To Start!</h1>
      <div class="category-container">
        <CategoryCard v-for="category in categories" :key="category.id" :categoryName="category.categorieName"
          :categoryDescription="category.categorieDescription" :categoryId="category.id"
          :categoryQuestionsCount="category.questionsCount" :maxQuestionReached="getMaxQuestionReached(category.id)" />
      </div>
    </div>
    <FloatingButton @open-chat="openChat" />
    <ChatWindow ref="chatWindow" />
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue';
import playerBarSection from '@/components/playerBarSection.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import api from '@/api';
import FloatingButton from '@/components/FloatingButton.vue';
import ChatWindow from '@/components/ChatWindow.vue';

export default {
  name: "CategoriesView",
  components: {
    navBar,
    playerBarSection,
    CategoryCard,
    FloatingButton,
    ChatWindow,
  },
  data() {
    return {
      categories: [],
      histories: [],
      playerData: {},
    };
  },
  async created() {
    await api.get('/categories')
      .then(response => {
        this.categories = response.data;
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
    this.fetchplayerData();
  },
  methods: {
    openChat() {
      this.$refs.chatWindow.openChat();
    },
    async fetchplayerData() {
      const playerId = localStorage.getItem("firebaseUserUid");
      const response = await api.get(`/players/player/${playerId}`);
      this.playerData = response.data;
      this.fetchPlayerHistory();
    },
    async fetchPlayerHistory() {
      const playerId = this.playerData.id;
      try {
        const response = await api.get(
          `/histories/player/${playerId}`
        );

        this.histories = response.data;

      } catch (error) {
        console.error("Error fetching player history:", error.message);
      }
    },
    getMaxQuestionReached(categoryId) {
      const categoryHistory = this.histories.filter(history => history.categorie.id === categoryId);
      if (categoryHistory.length > 0) {
        return Math.max(...categoryHistory.map(history => history.maxQuestionReached));
      }
      return 0;  // Return 0 if no history is found for the category
    }
  }

};
</script>

<style>
.select-text {
  font-family: "Lilita One", sans-serif;
  color: white;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 10px;
  margin-top: 50px;
}

@media screen and (max-width: 768px) {
  .category-container {
    justify-content: center;
  }
}
</style>
