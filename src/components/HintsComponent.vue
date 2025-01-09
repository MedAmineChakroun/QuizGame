<template>
    <div class="hints">
        <div class="circle" v-for="n in 3" :key="n" @click="handleClick(n)">
            <v-tooltip bottom>
                <template #activator="{ props }">

                    <div class="circle" v-bind="props">
                        <img :src="require(`@/assets/image${n}.png`)" alt="Hint Image" />
                    </div>
                </template>
                <span>{{ getHint(n) }}</span>
            </v-tooltip>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'HintsComponent',
    methods: {
        handleClick(n) {
            switch (n) {
                case 1:
                    this.handleRemoveTwoWrongAnswers();
                    break;
                case 2:
                    this.handleRevealCorrectAnswer();
                    break;
                case 3:
                    this.handleAiHint();
                    break;
            }
        },
        getHint(n) {
            const hints = [
                "remove to wrong answers.",
                "reveal the correct answer.",
                "Helpful hint from AI!",
            ];
            return hints[n - 1] || "Unknown ability";
        },
        handleRemoveTwoWrongAnswers() {
            console.log("Implement the logic to remove two wrong answers");

        },
        handleRevealCorrectAnswer() {
            console.log("Implement the logic to reveal correct answer");
        },
        handleAiHint() {
            console.log("Implement the logic to ai help");
        },
    },
    computed: {
        ...mapState({
            partieData: state => state.partieData,  // Access partieData from Vuex store
        }),
        hints() {
            return this.partieData.hints;
        }
    }
};
</script>

<style scoped>
.hints {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
}

.circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px solid #000;
}

.circle img {
    width: 65%;
    height: 70%;
}
</style>