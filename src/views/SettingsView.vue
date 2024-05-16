<template>
    <div class="settings-view">
        <navBar />
        
        <div class="settings-content">
            <div class="settings-options">
                <div>
                    <p class="music">Music</p>
                     <button class="play-btn" @click="toggleAudio">{{ isPlaying ? 'Pause' : 'Play' }}</button>

                </div>
     
            </div>
        </div>
    </div>
</template>

<script>
import navBar from '@/components/navBar.vue'

export default {
    name: "SettingsView",
    components: {
        navBar
    },
    data() {
        return {
            isPlaying: true
        };
    },
    methods: {
        toggleAudio() {
            this.isPlaying = !this.isPlaying;
            this.$emit(this.isPlaying ? 'play-audio' : 'pause-audio');
        },
    },
}


</script>

<style scoped>
.music{
    font-family: "Lilita One", sans-serif;
    color: #432818;
    font-size: 24px;
    margin: auto;
}
.play-btn {
    color: #ecf0f1;
    font-size: 17px;
    background-color: #e67e22;
    border: 1px solid #f39c12;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    box-shadow: 0px 6px 0px #d35400;
    transition: all 0.1s;
    width: 100px;
    align-self: center;
}

.play-btn:active {
    box-shadow: 0px 2px 0px #d35400;
    position: relative;
    top: 2px;
}

.settings-view {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.settings-content {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

.settings-options {
    background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    max-height: 500px;
    width: 100%;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    
}

@media (max-width: 600px) {
    .settings-options {
        max-width: 100%;
    }
}
</style>