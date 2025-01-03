<template>
  <div>
    <nav-bar />
    <playerBarSection />
    <div>
      <h1 class="select-text">Select a Category To Start!</h1>
      <div class="category-container">
        <CategoryCard v-for="category in categories" :key="category.id" :categoryName="category.categorieName"
          :categoryDescription="category.categorieDescription" :categoryId="category.id" />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue';
import playerBarSection from '@/components/playerBarSection.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import axios from 'axios';

export default {
  name: "CategoriesView",
  components: {
    navBar,
    playerBarSection,
    CategoryCard
  },
  data() {
    return {
      categories: []
    };
  },
  created() {
    axios.get('http://localhost:8090/categories')
      .then(response => {
        this.categories = response.data;
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  },

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
