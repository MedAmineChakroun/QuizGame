import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    gold: 0,
    partieData: {},
  },
  mutations: {
    setGold(state, amount) {
      state.gold = amount;
    },
    setPartieData(state, data) {
      state.partieData = data;
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
    async fetchPartieData({ commit }, partieId) {
      try {
        const response = await axios.get(
          `http://localhost:8090/parties/${partieId}`
        );
        commit("setPartieData", response.data);
        console.log("Partie data:", response.data);
      } catch (error) {
        console.error("Error fetching partie data:", error);
      }
    },
  },
});

export default store;
