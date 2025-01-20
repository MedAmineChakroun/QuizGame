import { createStore } from "vuex";
import api from "@/api";

const store = createStore({
  state: {
    gold: 0,
    partieData: {},
    history: {},
    SelectedCharacter: {},
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
    setSelectedCharacter(state, data) {
      state.SelectedCharacter = data;
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
        const response = await api.get(`/players/player/${firebaseUserUid}`);
        commit("setGold", response.data.gold);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    },
    async fetchPartieData({ commit }, partieId) {
      try {
        const response = await api.get(`/parties/${partieId}`);

        if (response.data && response.data.id) {
          commit("setPartieData", response.data);
        } else {
          commit("setPartieData", {});
        }
      } catch (error) {
        commit("setPartieData", {});
        console.error("Error fetching partie", partieId, " data:", error);
      }
    },
    async fetchHistory({ commit }, { playerId, categorieId }) {
      try {
        const response = await api.get(
          `/histories/player/${playerId}/category/${categorieId}`
        );

        if (response.data && response.data.id) {
          // If the history exists, set it in the store
          console.log("history:", response.data);
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
    async fetchSelectedCharacter({ commit }, { characterId }) {
      try {
        const response = await api.get(`/characters/${characterId}`);

        if (response.data) {
          commit("setSelectedCharacter", response.data);
        } else {
          commit("setSelectedCharacter", {});
        }
      } catch (error) {
        commit("setSelectedCharacter", {});
        console.error("Error fetching Character:", error);
      }
    },
    async initializeStore({ dispatch, state }) {
      if (
        !state.SelectedCharacter ||
        Object.keys(state.SelectedCharacter).length === 0
      ) {
        console.log("Initializing store: fetching default character...");
        await dispatch("fetchSelectedCharacter", { characterId: 0 });
      }
    },
  },
});
store.dispatch("initializeStore").then(() => {
  console.log("Store initialized.");
});

export default store;
