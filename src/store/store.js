import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    gold: 0,
  },
  mutations: {
    setGold(state, amount) {
      state.gold = amount;
    },
  },
  actions: {
    async fetchPlayerData({ commit }) {
      try {
        const firebaseUserUid = localStorage.getItem("firebaseUserUid");
        if (!firebaseUserUid) {
          console.error("Firebase User UID is missing from localStorage.");
          return;
        }
        const response = await axios.get(
          `http://localhost:8090/players/player/${firebaseUserUid}`
        );
        commit("setGold", response.data.gold);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    },
  },
});

export default store;
