<template>
  <div class="level-component">
    <h2 class="level" @click="handleClick">
      {{ questionNumber + 1 }}
    </h2>

    <QuestionModalComponent v-show="showModal" :levelId="levelId" @close="closeQuestionModal"
      :partieData="partieData" />
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
    questionNumber: {
      type: Number,
      required: true
    },
    partieData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      // Only open modal if the question is unlocked
      if ((this.questionNumber + 1) > this.partieData.questionReached) {
        console.log("This question is locked. Cannot open modal.");
        return;
      }
      this.openQuestionModal();
    },
    openQuestionModal() {
      console.log("Opening modal...");
      console.log("questionReached:", this.partieData.questionReached);
      console.log("questionNumber:", this.questionNumber + 1);
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
