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
import { toast } from 'vue3-toastify';
import { mapState } from "vuex";
import 'vue3-toastify/dist/index.css';

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
                "remove 2 wrong answers.",
                "reveal the correct answer.",
                "Helpful hint from AI!",
            ];
            return hints[n - 1] || "Unknown ability";
        },
        async handleRemoveTwoWrongAnswers() {
            if (this.partieData.hints[0].remainingHints > 0) {
                this.$emit("removeTwoWrongAnswers");
            } else {
                toast.info('You already used this hint!', {
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: "bottom-right",
                    transition: 'bounce'
                });
            }

        },
        handleRevealCorrectAnswer() {
            if (this.partieData.hints[1].remainingHints > 0) {
                this.$emit("revealCorrectAnswer");
            } else {
                toast.info('You already used this hint!', {
                    autoClose: 2000,
                    hideProgressBar: true,
                    position: "bottom-right",
                    transition: 'bounce'
                });
            }
        },
        handleAiHint() {
            toast.info('AI is Coming soon!', {
                autoClose: 2000,
                hideProgressBar: true,
                position: "bottom-right",
                transition: 'bounce'
            });
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