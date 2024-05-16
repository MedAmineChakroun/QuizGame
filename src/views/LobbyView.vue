<template>
    <div class ="lobby">
       <navBar/>
       <playerBarSection/>
       <h1 class="welcome-text">Welcome Brave Knight!</h1>
       <a href="/#/categories">
            <button>Play!</button>
        </a>
        
       <img class="characters" src="@/assets/personajesfooter_banner.svg" alt="">

    </div>
</template>
<script>
import navBar from "@/components/navBar.vue";
import playerBarSection from "@/components/playerBarSection.vue";

export default {
  name: "lobbyView",
  components: {
    navBar,
    playerBarSection
  }
  
};
</script>
<style scoped>
.welcome-text{
  position: relative;
  top: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  color: white;
  font-family: "Lilita One", sans-serif;
  width: 400px;
  
}
 .characters{
  position: fixed;
  bottom: 0px;
  left: 5%;
  width: 90%;
  animation: ChallengersBanner_grow__z4oby 3s ease-in-out infinite alternate;
 }
button {
 padding: 20px 35px;
 border: unset;
 border-radius: 28px;
 color: #212121;
 z-index: 1;
 background: #e8e8e8;
 position: relative;
 font-weight: 1000;
 font-size: 21px;
 -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 transition: all 250ms;
 overflow: hidden;
 margin-top: 150px;
 font-family: "Lilita One", sans-serif;

}

button::before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 width: 0;
 border-radius: 15px;
 background-color: #70e000;
 z-index: -1;
 -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
 transition: all 250ms
}

button:hover {
 color: #132a13;
 font-size: 19px;
}

button:hover::before {
 width: 100%;
}
@keyframes ChallengersBanner_grow__z4oby {
  0% {
    transform: scale(1); /* Start at normal size */
  }
  50% {
    transform: scale(1.04); /* Grow to 105% size halfway through */
  }
  100% {
    transform: scale(1); /* Return to normal size */
  }
}

</style>
