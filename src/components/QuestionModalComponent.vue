<template>
  <div class="modal fade show" tabindex="-1" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true"
    style="display: block;">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Level {{ levelId }}</h5>
          <p v-if="question" class="gold-question">
            {{ question.goldQuestion }}
            <svg xmlns="http://www.w3.org/2000/svg" size="40" width="20" height="16" fill="currentColor"
              class="bi bi-coin" viewBox="0 0 16 16" style="color:#ffb703">
              <path
                d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
            </svg>
          </p>
          <p v-else>Loading question...</p>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="character-container">
            <div class="character-img-div">
              <img class="character-img" src="@/assets/redCharacter.png" alt="Red Character">
            </div>
            <div class="top-elements">
              <div v-if="loading">Loading...</div>
              <div v-else>

                <h1 v-if="question" class="question-content">
                  {{ question.content }}
                </h1>
                <div class="answers-container">
                  <div v-for="(answer, index) in possibleAnswers" :key="index" class="answer"
                    @click="checkAnswer(answer.possibleAnswer)">
                    <div class="possible">{{ answer.possibleAnswer }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="wiseMan-img-div">
              <img class="wiseMan-img" src="@/assets/wiseMan.png" alt="Wise Man">
            </div>
          </div>
        </div>

        <!-- Character Container with images -->



        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionService from "@/services/QuestionService"; // Adjust the path based on your folder structure

export default {
  name: "QuestionModalComponent",
  props: {
    levelId: {
      type: Number,
      required: true
    },
    isModalVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      question: null,
      possibleAnswers: [],
      loading: false
    };
  },
  mounted() {
    this.loadQuestionAndAnswers()
  },
  methods: {
    async loadQuestionAndAnswers() {
      try {
        this.loading = true; // Show loading indicator
        // Fetch the question by ID
        this.question = await QuestionService.fetchQuestionById(this.levelId);

        // Fetch possible answers for the question
        const fetchedAnswers = await QuestionService.fetchPossibleAnswers(this.levelId);

        // Combine the fetched answers with the correct answer from the question
        this.possibleAnswers = [...fetchedAnswers, { possibleAnswer: this.question.correctAnswer }];

        // Shuffle the answers
        this.possibleAnswers = this.shuffleAnswers(this.possibleAnswers);
      } catch (error) {
        console.error("Error loading question or answers:", error);
      } finally {
        this.loading = false; // Hide loading indicator
      }
    },
    shuffleAnswers(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    checkAnswer(answer) {
      if (answer === this.question.correctAnswer) {
        console.log("Correct Answer!"); // Logs to console
        alert("Correct Answer!"); // Displays a simple alert
      } else {
        console.log("Incorrect Answer."); // Logs to console
        alert("Incorrect Answer."); // Displays a simple alert
      }
    }
  },
};
</script>

<style>
.gold-question {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-size: 20px;
  color: rgb(97, 91, 91);
  margin: 10px 0;
  padding-right: 100px;
  font-family: "Lilita One", sans-serif;
}

.modal-dialog {
  max-width: 70%;
  /* Adjust the width as needed */
  width: auto;
  /* Allow for dynamic width based on content */
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefae0;
  padding: 20px;
  /* Add padding for better spacing */
}

.modal-title {
  width: 120px;
}

.character-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
  /* Reduce gap to make it more compact */
}

.character-img-div,
.wiseMan-img-div {
  background-color: #f8dda4;
  padding: 10px;
  border-radius: 12px;
  border: 4px solid #432818;
  width: 200px;
  /* Set specific width for image containers */
  height: 300px;
  /* Set specific height for image containers */
}

.character-img,
.wiseMan-img {
  width: 100%;
  height: 100%;

  /* Make sure the images cover the container */
}

.answers-container {
  background-color: #ffdda1;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  border-radius: 18px;
  padding: 20px;
  width: 100%;
  /* Adjust width to match the layout */
}

.answer {
  width: 100%;
  background-color: #fb8500;
  height: 50px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  color: white;
  font-size: 20px;
}

.answer:hover {
  transform: scale(1.02);
}
</style>
