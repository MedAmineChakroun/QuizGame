<template>
  <div class="level-component">
    <h2 class="level" @click="handleClick"
      :class="{ 'custom-style': questionNumber + 1 === partieData.questionReached }">
      {{ questionNumber + 1 }}
    </h2>

    <QuestionModalComponent v-show="showModal" :levelId="levelId" @close="closeQuestionModal"
      :questionNumber="questionNumber + 1" />
  </div>
</template>

<script>
import QuestionModalComponent from './QuestionModalComponent.vue';
import { mapState } from "vuex";

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
  computed: {
    ...mapState({
      partieData: state => state.partieData,  // Access partieData from Vuex store
    })
  },
  props: {
    levelId: {
      type: Number,
      required: true
    },
    questionNumber: {
      type: Number,
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
      this.showModal = true;
    },
    closeQuestionModal() {
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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

.custom-style {
  background-color: #ff5400;
  /* Highlight with a yellow background */
  border: 3px solid #582707;
  /* Orange border */
  animation: pulse 1s infinite;
  /* Add a pulsing animation for extra effect */
  color: #ffffff;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
