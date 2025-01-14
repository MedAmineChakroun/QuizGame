import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    gold: 0,
    partieData: {},
    history: {},
  },
  mutations: {
    setGold(state, amount) {
      state.gold = amount;
    },
    setPartieData(state, data) {
      state.partieData = data;
    },
    setHistory(state, data) {
      state.history = data;
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

        if (response.data && response.data.id) {
          commit("setPartieData", response.data);
        } else {
          commit("setPartieData", {});
        }
      } catch (error) {
        commit("setPartieData", {});
        console.error("Error fetching partie data:", error);
      }
    },
    async fetchHistory({ commit }, { playerId, categorieId }) {
      try {
        const response = await axios.get(
          `http://localhost:8090/histories/player/${playerId}/category/${categorieId}`
        );

        if (response.data && response.data.id) {
          // If the history exists, set it in the store
          commit("setHistory", response.data);
        } else {
          // If the history doesn't exist, reset it in the store
          commit("setHistory", {});
        }
      } catch (error) {
        commit("setHistory", {});
        console.error("Error fetching history:", error);
      }
    },
  },
});

export default store;
