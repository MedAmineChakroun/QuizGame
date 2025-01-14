<template>
    <div class="floating-button" @click="openChat">
        <img src="@/assets/image3.png" alt="Chat Icon" class="icon" />
    </div>
</template>

<script>
export default {
    methods: {
        openChat() {
            this.$emit("open-chat");
        },
    },
};
</script>

<style scoped>
.floating-button {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 70px;
    height: 70px;
    background-color: #fefae0;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.floating-button:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.floating-button:active {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.icon {
    width: 55px;
    height: 55px;
    transition: transform 0.2s ease-in-out;
}

.floating-button:hover .icon {
    transform: scale(1.03);
    /* Slight scaling on hover for the icon */
}
</style>
