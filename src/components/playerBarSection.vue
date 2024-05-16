<template>
    <div class="playerBarSection">
        <div class="leftDiv">
            <div class="profilDiv">
               <a href="/#/profil">
                <i class="pi pi-user" style="font-size: 2rem"></i>
               </a> 
            </div>
            <div class="shopDiv">
                <a href="#"><i class="pi pi-shop" style="font-size: 2rem"></i>
            </a>
            </div>
            <div class="settingsDiv">
                <a href="/#/settings"><i class="pi pi-cog" style="font-size: 2rem"></i></a>
                
            </div>
        </div>
        <div class="rightDiv">
            <div class="coinsDiv">
                <a href="/#/lobby">
                    500 C
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import 'primeicons/primeicons.css';
export default {
  name: "playerBarSection",
};
</script>

<style scoped>

a {
  display: inline-flex; /* Use flexbox */
  align-items: center; /* Align items vertically center */
}
.playerBarSection a{
    color: #001233;
    text-decoration-line: none;
    transition: 0.3s;
}
.playerBarSection a:hover{
    transform: scale(1.1);
}
.playerBarSection {
    height: 100px;
    width: 90%;
    margin-top: 63.5px;
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: 291720;
    font-family: "Lilita One", sans-serif;
    font-size: 20px ;
    
}

.leftDiv, .rightDiv {
    display: flex;
    align-items: center;
}
.leftDiv{
    gap: 10px;
}
.leftDiv div, .rightDiv div {
    background-color: #fdffb6;
    border-radius: 50%;
    aspect-ratio: 1;
    min-width: 50px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 3px white;
    box-shadow: 3px 3px 12px rgb(67, 63, 63);
}

/* Optional: Adjust size of circles for larger screens */
@media (min-width: 768px) {
    .leftDiv div, .rightDiv div {
        min-width: 80px;
        min-height: 80px;
    }
}
.coinsDiv a{
    font-size: 25px;
}
</style>
