<template>
    <div v-if="isVisible" class="chat-window">
        <div class="chat-header">
            <h3>AI Chat</h3>
            <button @click="closeChat" class="close-btn">X</button>
        </div>
        <div class="chat-body">
            <div v-for="(message, index) in messages" :key="index" class="chat-message">
                <p>{{ message }}</p>
            </div>
        </div>
        <div class="chat-input">
            <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
            <button @click="sendMessage" class="send-btn">Send</button>
        </div>
    </div>
</template>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
export default {
    data() {
        return {
            isVisible: false,
            userMessage: "",
            messages: [],
            genAI: new GoogleGenerativeAI("AIzaSyAh7sG7m3yXgdh4epDFL8o5gZQB0jRiu1Q"),
            playerData: {},
        };
    },
    async mounted() {
        const playerfirbaseId = localStorage.getItem("firebaseUserUid");
        await axios.get(`http://localhost:8090/players/player/${playerfirbaseId}`)
            .then(response => {
                this.playerData = response.data;
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    },
    methods: {
        openChat() {
            this.isVisible = true;
            this.messages.push(`AI: Hello ${this.playerData.userName}! How can I help you?`);
            console.log(this.playerData);
        },
        closeChat() {
            this.isVisible = false;
        },
        async sendMessage() {
            if (!this.userMessage.trim()) return;

            this.messages.push(`You: ${this.userMessage}`);
            const prompt = `${this.userMessage}`;
            const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            try {
                const result = await model.generateContent(prompt);
                const hintText = result.response.text();
                this.messages.push(`AI: ${hintText}`);
            } catch (error) {
                this.messages.push("AI: Sorry, I couldn't process that request.");
            }

            this.userMessage = ""; // Clear the input
        },
    },
};
</script>

<style scoped>
/* Chat Window */
.chat-window {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    max-width: 100%;
    height: 450px;
    background-color: #f4f6f9;
    border-radius: 15px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    z-index: 1000;
    transition: all 0.3s ease;
    animation: slideIn 0.5s ease-in-out;
}

/* Header */
.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

.chat-header h3 {
    font-size: 18px;
    color: #333;
    font-weight: 600;
    margin: 0;
}

.close-btn {
    background-color: transparent;
    border: none;
    color: #f44336;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
}

.close-btn:hover {
    color: #d32f2f;
}

/* Chat Messages */
.chat-body {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px 0;
    margin-bottom: 20px;
}

.chat-message {
    margin: 10px 0;
    padding: 10px;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    font-size: 14px;

}

.chat-message p {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
    text-align: left;
}

.chat-message:nth-child(odd) {
    align-self: flex-start;
    background-color: #e3f2fd;
}

.chat-message:nth-child(even) {
    align-self: flex-end;
    background-color: #ffecb3;
}

/* Chat Input */
.chat-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    padding-top: 10px;
}

.chat-input input {
    width: 80%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ddd;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
}

.chat-input input:focus {
    border-color: #3f51b5;
}

.chat-input button {
    background-color: #3f51b5;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.chat-input button:hover {
    background-color: #303f9f;
}

/* Animation for Chat Window */
@keyframes slideIn {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}
</style>
