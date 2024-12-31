<template>
  <div class="level-component">
    <h2 class="level" @click="openQuestionModal">{{ levelId }}</h2>
    <QuestionModalComponent v-show="showModal" :levelId="levelId" @close="closeQuestionModal" />
  </div>
</template>

<script>
import QuestionModalComponent from './QuestionModalComponent.vue';

export default {
  name: "questionComponent",
  components: {
    QuestionModalComponent
  },
  data() {
    return {
      showModal: false,
    };
  },
  props: {
    levelId: {
      type: Number,
      required: true
    },
  },
  methods: {
    openQuestionModal() {
      console.log("Opening modal...");
      this.showModal = true;
    },
    closeQuestionModal() {
      console.log("Closing modal...");
      this.showModal = false;
    }
  }
};
</script>

<style>
.level {
  background-color: #370617;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid white;
  transition: 0.3s;
  cursor: pointer;
  color: white;
  font-family: "Lilita One", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.level:hover {
  transform: scale(1.05);
}

.level h2 {
  margin: 0;
}

.level p {
  margin: 0;
  font-size: 12px;
}
</style>
