<template>
  <div class="modal fade show" tabindex="-1" id="exampleModal" aria-labelledby="exampleModalLabel"
    :aria-hidden="isModalVisible ? 'false' : 'true'" v-show="isModalVisible" style="display: block;">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Level {{ questionNumber }}</h5>
          <p v-if="question && canPlayerWinGold" class="gold-question">
            {{ question.goldQuestion }}
            <img src="@/assets/coin.png" alt="Gold Icon" class="coin" />
          </p>
          <p v-else class="gold-question">
            0
            <img src="@/assets/coin.png" alt="Gold Icon" class="coin" />
          </p>
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
                  <div v-for="(answer, index) in possibleAnswers" :key="index" class="answer" :class="{
                    'wrong-answer': wrongAnswers.includes(answer.possibleAnswer),
                    'correct-answer': answer.possibleAnswer === correctAnswer
                  }" @click="checkAnswer(answer.possibleAnswer)">
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

        <div class="modal-footer">
          <div class="hearts-container">
            <template v-for="i in nbHeart" :key="i">
              <img class="heart-img" src="@/assets/heart.png" alt="Heart Icon" />
            </template>
          </div>
          <HintsComponent @removeTwoWrongAnswers="handleRemoveTwoWrongAnswers"
            @revealCorrectAnswer="handleRevealCorrectAnswer" @aiHint="handleAiHint" />
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import QuestionService from "@/services/QuestionService"; // Adjust the path based on your folder structure
import axios from "axios";
import { mapState } from "vuex";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import HintsComponent from "./HintsComponent.vue"; // Import the Hints component

export default {
  name: "QuestionModalComponent",
  components: {
    HintsComponent
  },
  props: {
    levelId: {
      type: Number,
      required: true
    },
    isModalVisible: {
      type: Boolean,

    },
    questionNumber: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState({
      partieData: state => state.partieData,  // Access partieData from Vuex store
    }),
    nbHeart() {
      return this.partieData.nbHeart;
    },
    ...mapState({
      history: state => state.history,
    }),
    MaxQuestionReached() {
      return this.history.maxQuestionReached || 0;
    },
    canPlayerWinGold() {
      return this.questionNumber >= this.partieData.questionReached && this.partieData.questionReached > this.MaxQuestionReached;
    }
  },
  data() {
    return {
      question: null,
      possibleAnswers: [],
      loading: false,
      wrongAnswers: [],
      correctAnswer: null
    };
  },
  mounted() {
    this.loadQuestionAndAnswers()
  },
  watch: {
    nbHeart() {
      // if the nbHeart changes display a lotty file for a broken heart in the screen
    }
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
    //-------------------------->
    async checkAnswer(answer) {
      try {

        if (answer === this.question.correctAnswer) {
          //toast
          toast.success('Correct Answer', {
            autoClose: 2000,
            hideProgressBar: true,
            position: "bottom-right",
            transition: 'bounce'
          });

          if (this.questionNumber < this.partieData.questionReached) {
            this.$emit('close');
            return;
          }
          this.addGold(this.question.goldQuestion)

          if (this.partieData.categorie.questionsCount === this.partieData.questionReached) {

            this.handleWin();
          } else {
            this.unlockQuestion();

            this.$emit('close');

          }

        } else {
          if (this.wrongAnswers.includes(answer)) {
            return;
          }
          if (!this.wrongAnswers.includes(answer)) {
            this.wrongAnswers.push(answer);
          }
          if (this.questionNumber < this.partieData.questionReached) {
            return;
          }

          this.handleIncorrectAnswer();

        }
      } catch (error) {
        console.error("Error occurred while checking answer:", error);
      }
    },
    async addGold(gold) {
      const playerId = this.partieData.player.id;


      try {
        const max = this.history.maxQuestionReached || 0;

        if (this.questionNumber < this.partieData.questionReached || this.partieData.questionReached <= max) {
          return;
        }
        // Fetch the current gold amount for the player
        const response = await axios.get(`http://localhost:8090/players/${playerId}`);
        const newAmount = gold + response.data.gold;

        // Update the player's gold amount
        await axios.put(`http://localhost:8090/players/${playerId}`, { "gold": newAmount });

        this.$store.commit("setGold", newAmount);
        // Optionally update the UI or emit an event to refresh the other component

      } catch (error) {
        // Log the error or handle it appropriately
        console.error('An error occurred while updating gold:', error);
      }
    },
    async unlockQuestion() {
      try {
        const response = await axios.put(`http://localhost:8090/parties/${this.partieData.id}`, {
          "questionReached": this.partieData.questionReached + 1,
          "nbHeart": this.partieData.nbHeart
        });

        // Commit the updated partieData to Vuex
        this.$store.commit("setPartieData", response.data);


      } catch (error) {
        // Handle any error that occurs during the request or response
        console.error("Error updating question reached:", error);
        alert("An error occurred while updating the question.");
      }
    },
    async handleIncorrectAnswer() {
      try {
        const currentNbHeart = this.partieData.nbHeart;

        // Decrement heart count, ensuring it does not go below 0
        const newNbHeart = Math.max(0, currentNbHeart - 1);

        // Only update API if there are changes to make
        if (newNbHeart !== currentNbHeart) {
          const response = await axios.put(`http://localhost:8090/parties/${this.partieData.id}`, {
            "nbHeart": newNbHeart,
            "questionReached": this.partieData.questionReached,
          });

          // Commit API response to Vuex
          this.$store.commit("setPartieData", response.data);

        }
        toast.error('Oops!', {
          autoClose: 2000,
          hideProgressBar: true,
          position: "bottom-right",
          transition: 'bounce'
        });
        // Handle game over condition
        if (newNbHeart <= 0) {
          this.handleGameOver();
        }

      } catch (error) {
        console.error("Error updating heart count:", error);
        alert("An error occurred while updating your heart count. Please try again.");
      }
    },
    async handleGameOver() {
      //register the game progress in history table
      this.RegisterProgressInHistory();


      await axios.delete(`http://localhost:8090/parties/${this.partieData.id}`);


      this.$router.push({ path: `/defeat` });
    },
    async handleWin() {

      //register the game progress in history table
      this.RegisterProgressInHistory();

      await axios.delete(`http://localhost:8090/parties/${this.partieData.id}`);
      this.$router.push({ path: `/victory` });
      return
    },
    //-------------------------->
    async handleRemoveTwoWrongAnswers() {
      try {
        // Update remaining hints on the backend
        if (this.wrongAnswers.length >= 2) {
          toast.info('You have already removed 2 options', {
            autoClose: 2000,
            hideProgressBar: true,
            position: "bottom-right",
            transition: 'bounce'
          });
          return;
        }
        if (this.correctAnswer) {
          toast.info('You have already revealed the correct answer :)', {
            autoClose: 2000,
            hideProgressBar: true,
            position: "bottom-right",
            transition: 'bounce'
          });
          return;
        }
        await axios.put(
          `http://localhost:8090/hints/${this.partieData.hints[0].id}`,
          {
            remainingHints: this.partieData.hints[0].remainingHints - 1,
          }
        );

        // Tell the store to refetch the data
        await this.$store.dispatch("fetchPartieData", this.partieData.id);

        // Filter out the correct answer from the possible answers
        const incorrectAnswers = this.possibleAnswers.filter(
          (answer) => answer.possibleAnswer !== this.question.correctAnswer
        );

        // Shuffle the incorrect answers to randomize selection
        const shuffledIncorrectAnswers = this.shuffleAnswers(incorrectAnswers);

        // Select two random wrong answers
        const randomWrongAnswers = shuffledIncorrectAnswers.slice(0, 2).map(
          (answer) => answer.possibleAnswer
        );

        // Add the selected answers to the wrongAnswers array
        this.wrongAnswers = [...this.wrongAnswers, ...randomWrongAnswers];


      } catch (error) {
        console.error("Error updating hints:", error);
        alert("An error occurred while using the hint. Please try again.");
      }
    },
    async handleRevealCorrectAnswer() {
      try {
        // Update remaining hints on the backend
        if (this.correctAnswer) {
          toast.info('You have already revealed the correct answer :)', {
            autoClose: 2000,
            hideProgressBar: true,
            position: "bottom-right",
            transition: 'bounce'
          });
          return;
        }
        await axios.put(
          `http://localhost:8090/hints/${this.partieData.hints[1].id}`,
          {
            remainingHints: this.partieData.hints[1].remainingHints - 1,
          }
        );

        // Tell the store to refetch the data
        await this.$store.dispatch("fetchPartieData", this.partieData.id);

        //add custom style to the correct answer
        this.correctAnswer = this.question.correctAnswer;

      } catch (error) {
        console.error("Error updating hints:", error);
        alert("An error occurred while using the hint. Please try again.");
      }
    },
    async handleAiHint() {
      try {
        // Update remaining hints on the backend
        if (this.correctAnswer) {
          toast.info('You have already revealed the correct answer :)', {
            autoClose: 2000,
            hideProgressBar: true,
            position: "bottom-right",
            transition: 'bounce'
          });
          return;
        }
        const { GoogleGenerativeAI } = require("@google/generative-ai");

        const genAI = new GoogleGenerativeAI("AIzaSyAh7sG7m3yXgdh4epDFL8o5gZQB0jRiu1Q");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "give me a very good helpfull hint for a quigame app to solve this question: " + this.question.content + " the possible answers are: " + this.possibleAnswers.join(", ")
          + "very helpfull plz , start with **hint**"
          ;

        const result = await model.generateContent(prompt);
        const hintText = result.response.text();  // Get the hint from the response

        // Show the hint as a toast notification at the top-center
        toast.info(hintText, {
          hideProgressBar: true,
          position: "top-center",  // Display toast at the top center
          transition: 'bounce',  // You can adjust this transition
          autoClose: false,  // Prevent auto closing of the toast
        });
        await axios.put(
          `http://localhost:8090/hints/${this.partieData.hints[2].id}`,
          {
            remainingHints: this.partieData.hints[2].remainingHints - 1,
          }
        );

        // Tell the store to refetch the data
        await this.$store.dispatch("fetchPartieData", this.partieData.id);
      } catch (error) {
        console.error("Error updating hints:", error);
        alert("An error occurred while using the hint. Please try again.");
      }
    },
    async RegisterProgressInHistory() {
      try {
        await this.$store.dispatch("fetchHistory", {
          playerId: this.partieData.player.id,
          categorieId: this.partieData.categorie.id,
        });

        if (!this.history.id) { // Check if history doesn't exist or id is missing
          // Create new history
          this.createHistory(this.partieData.player.id, this.partieData.categorie.id);
        } else {
          // Update existing history
          this.updateHistory();
        }
      } catch (error) {
        console.error("Error registering progress in history:", error);
        alert("An error occurred while registering your progress in history. Please try again.");
      }
    },
    async createHistory(playerId, categorieId) {
      try {
        const goldEarned = this.partieData.questionReached * 50;
        const response = await axios.post(
          `http://localhost:8090/histories?playerId=${playerId}&categorieId=${categorieId}`,
          {
            goldEarned: goldEarned,
            maxQuestionReached: this.partieData.questionReached
          }
        );

        console.log('History created:', response.data);
        // You can now commit this new history to the store if needed
        this.$store.commit("setHistory", response.data);
      } catch (error) {
        console.error("Error creating history:", error);
        alert("An error occurred while creating history. Please try again.");
      }
    }
    ,
    async updateHistory() {
      if (this.maxQuestionReached >= this.partieData.questionReached) {
        return;
      }

      let goldEarned = this.partieData.questionReached * 50;

      if (this.nbHeart === 0) {
        goldEarned -= 50;
      }

      const response = await axios.put(
        `http://localhost:8090/histories/${this.history.id}`,
        {
          "goldEarned": goldEarned,
          "maxQuestionReached": this.partieData.questionReached
        }
      );
      this.$store.dispatch("fetchHistory", {
        playerId: this.partieData.player.id,
        categorieId: this.partieData.categorie.id,
      });
      console.log('updated History:', response.data);
    }

  },

};
</script>

<style>
.coin {
  width: 30px;
  height: 30px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.heart-img {
  width: 50px;
  transition: 0.3s;
  cursor: pointer;
}

.heart-img:hover {
  transform: scale(1.07);
}

.hearts-container {
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  align-items: center;
  display: inline-block;
  padding: 7px 7px;
  border-radius: 30px;
  border: 3px solid white;
  background-color: rgba(255, 255, 255, 0.5);
}

.gold-question {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-size: 25px;
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
  font-family: "Lilita One", sans-serif;
  font-size: 25px;
  color: rgb(97, 91, 91);


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

.wrong-answer {
  background-color: #d8b4a0;
  text-decoration: line-through;
}

.wrong-answer:hover {
  transform: scale(1);
}

.correct-answer {
  background-color: #7cb518;
  /* Light green background */
  color: white;

  transition: background-color 0.3s ease-in-out;
}
</style>
