import axios from "axios";

class QuestionService {
  // Method to fetch questions based on category ID
  async fetchQuestions(categorieId) {
    const questionUrl = `http://localhost:8090/questions/category/${categorieId}`;
    console.log(`Fetching questions from: ${questionUrl}`);
    try {
      const response = await axios.get(questionUrl);
      return response.data; // Return the questions
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  }

  // Method to fetch possible answers for a given question ID
  async fetchPossibleAnswers(questionId) {
    const answerUrl = `http://localhost:8090/possibleAnswers/question/${questionId}`;
    try {
      const response = await axios.get(answerUrl);
      console.log(response);

      return response.data; // Return the possible answers
    } catch (error) {
      console.error("Error fetching possible answers:", error);
      return [];
    }
  }
  async fetchQuestionById(questionId) {
    const questionUrl = `http://localhost:8090/questions/${questionId}`;
    console.log(`Fetching question from: ${questionUrl}`);
    try {
      const response = await axios.get(questionUrl);
      console.log(response);

      return response.data; // Return the question
    } catch (error) {
      console.error("Error fetching question:", error);
      return null; // Return null if there's an error
    }
  }
  // Method to fetch questions and their possible answers
  async fetchQuestionsAndAnswers(categorieId) {
    const questions = await this.fetchQuestions(categorieId); // Fetch the questions
    const questionPromises = questions.map(async (question) => {
      const possibleAnswers = await this.fetchPossibleAnswers(question.id); // Fetch the possible answers for each question
      question.possibleAnswers = possibleAnswers; // Assign possible answers to the question
      return question;
    });

    // Wait for all questions to have their answers fetched
    return await Promise.all(questionPromises);
  }
}

export default new QuestionService();
