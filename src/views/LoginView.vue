<template>
    <div class="login-container">
        <h2>Login</h2>

        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
            </div>

            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
            </div>

            <button type="submit" :disabled="isLoading">
                <span v-if="isLoading">Logging in...</span>
                <span v-else>Login</span>
            </button>

            <div v-if="errorMessage" class="error">
                {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="success">
                {{ successMessage }}
            </div>
        </form>

        <p>
            Don't have an account? <router-link to="/login">Sign up</router-link>
        </p>
    </div>
</template>

<script>
import { auth } from "@/firebase"; // Import the Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the function

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "", // Store error message
            successMessage: "", // Store success message
            isLoading: false, // Loading state for button
        };
    },
    methods: {
        async login() {
            this.errorMessage = ""; // Clear previous errors
            this.successMessage = ""; // Clear previous success messages
            this.isLoading = true; // Set loading state

            try {
                // Sign in the user
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);

                // Get the Firebase UID
                const firebaseUid = userCredential.user.uid;

                console.log("Firebase UID: ", firebaseUid);

                // Store only the Firebase UID in localStorage for better security
                localStorage.setItem("firebaseUserUid", firebaseUid);

                // Get the ID token dynamically when needed
                const idToken = await userCredential.user.getIdToken();

                console.log("Firebase ID Token: ", idToken);

                // Optionally store the token temporarily in memory (e.g., in Vuex)
                this.$store.commit("setAuthToken", idToken);

                this.successMessage = "Login successful! Redirecting...";

                // Redirect to the home page after a short delay
                setTimeout(() => {
                    this.$router.push("/lobby");
                }, 1500);
            } catch (error) {
                console.error("Error Details: ", error);
                console.log("Error Code: ", error.code);
                console.log("Error Message: ", error.message);

                if (error.code === "auth/invalid-credential") {
                    this.errorMessage = "Invalid credentials. Please check your email and password.";
                } else {
                    this.errorMessage = "An error occurred. Please try again.";
                }
            } finally {
                this.isLoading = false; // Reset loading state
            }
        },

        checkSession() {
            // Check if the Firebase UID exists in localStorage
            const firebaseUserUid = localStorage.getItem("firebaseUserUid");

            if (firebaseUserUid) {
                // User is already logged in, you can navigate to the home page or a protected route
                this.$router.push("/lobby"); // Redirect to the home page
            } else {
                // User is not logged in, you can navigate to the login page
                this.$router.push("/login"); // Redirect to the login page
            }
        },
    },
    mounted() {
        this.checkSession();
    }
};
</script>

<style scoped>
/* Add some styles for the login form */
.login-container {
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
}

div {
    margin-bottom: 10px;
}

input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #45a049;
}

.error {
    color: #f44336;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
}

.success {
    color: #4CAF50;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
}

p {
    text-align: center;
}
</style>
