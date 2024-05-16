
<template>
  <div id="app">
    <audio ref="backgroundAudio" loop>
      <source src="@/assets/make-a-wish.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <router-view @play-audio="playBackgroundAudio" @pause-audio="pauseBackgroundAudio" />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    this.$refs.backgroundAudio.play();
  },
  methods: {
    playBackgroundAudio() {
      const audio = this.$refs.backgroundAudio;
      audio.play();
    },
    pauseBackgroundAudio() {
      const audio = this.$refs.backgroundAudio;
      audio.pause();
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
