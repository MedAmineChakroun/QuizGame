<template>
    <div>
        <nav-bar/>
        <playerBarSection/>
    <div>
        <h1 class="select-text">Select a Category To Start!</h1>
        <div class="category-container">
            <CategoryCard :categoryName="category.name" :categoryLink="category.link" />
            <CategoryCard :categoryName="category.name" :categoryLink="category.link" />
            <CategoryCard :categoryName="category.name" :categoryLink="category.link" />
            <CategoryCard :categoryName="category.name" :categoryLink="category.link" />
            <CategoryCard :categoryName="category.name" :categoryLink="category.link" />
            <CategoryCard :categoryName="category.name" :categoryLink="category.link" />
        </div>
    </div>
    </div>
</template>
<script>
import navBar from '@/components/navBar.vue';
import playerBarSection from '@/components/playerBarSection.vue';
import CategoryCard from '@/components/categorieCard.vue';

export default{
    name:"categoriesView",
    components:{
        navBar,
        playerBarSection,
        CategoryCard
    },
    data() {
    return {
      category: {
        name: "Test Category",
        link: "/test-category"
      }
    };
  }
}

</script>
<style>
.select-text{
    font-family: "Lilita One", sans-serif;
    color: white;
}
.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Adjust as needed */
  row-gap: 10px;
  margin-top: 50px;
}

@media screen and (max-width: 768px) {
  .category-container {
    justify-content: center;
  }
}

</style>