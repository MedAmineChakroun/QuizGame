<template>


    <div class="modal fade" tabindex="-1"  id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Level Number</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="top-elements">
          <h4>easy</h4>
          <h1 style="margin-top: 30px; color :#591f0a;">Question</h1>
          <h4>50 C</h4>
        </div>
        <div class="wiseMan-img-div">
          <img class="wiseMan-img" src="@/assets/wiseMan.png" alt="">
        </div>
        <div  class="character-img-div">
          <img class="character-img" src="@/assets/redCharacter.png">
        </div>       
        <div class="answers-container">
            <div class="answer">
              answer
            </div>
            <div class="answer">
              answer
            </div>
            <div class="answer">
              answer
            </div>
            <div class="answer">
              answer
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "QuestionModal",
}
</script>
<style  scoped>
.answers-container{
    height: 80%;
    background-color: #ffdda1;
    margin-top: 20px;
    display: flex;
    flex-direction: column ;
    gap: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    
}
.answer{
  width: 90%;
  background-color: #fb8500;
  height: 20%;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  color: white;
  font-size:  20px;
}
.answer:hover{
  transform: scale(1.05);
}
.wiseMan-img-div{
  position: fixed;
  display: inline-block;
  margin-left: 380px;
  background-color: #f8dda4;  
  padding: 10px 10px;
  border-radius: 50%;
  border: 4px solid #432818;
}
.character-img-div{
  position: fixed;
  display: inline-block;
  margin-left: -600px;
  background-color: #f8dda4;  
  padding: 10px 10px;
  border-radius: 50%;
  border: 4px solid #432818;

}
.character-img,.wiseMan-img{
  width: 200px;
  height: 400px;
  transition: 0.3s;
  cursor: pointer;
}
.character-img:hover,.wiseMan-img:hover{
  transform: scale(1.05);
}

.modal{
    font-family: "Lilita One", sans-serif;
}
.modal-body{
    height: 500px;
    background-color: #fefae0;

}
.top-elements{
  display: flex;
  flex-direction: row;
  width: 100%;
  
  justify-content: space-between;
}
</style>


