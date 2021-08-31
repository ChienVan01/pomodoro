var minutes_sessions = 25;
var minutes_break_sessions = 5;
var seconds_sessions = "00";
var click = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

let mainColor = "0081a7"; // giá trị màu của time pomodoro
let seColor = "00a3ac"; // giá trị màu của time break

const btnStart = document.getElementById("btn-start");
const btnPause = document.getElementById("btn-pause");
const minDiv = document.getElementById("minutes");
const sec = document.getElementById("seconds");
const color = document.getElementById("color");
const pomodoro = document.getElementById("pomodoro");
const breakT = document.getElementById("break");
const timeWorking = document.getElementsByClassName("time-working");

localStorage.setItem("btn", "focus"); //khởi tạo localStorage
// localStorage.removeItem("btn");

let initial, paused, mins, seconds;

function template() {
  minDiv.innerHTML = minutes_sessions;
  sec.innerHTML = seconds_sessions; 
  
}

//tab time pomodoro
pomodoro.addEventListener("click", () => {

  minDiv.innerHTML = minutes_sessions; //set time cho div
  sec.innerHTML = seconds_sessions; //set time cho div
  btnPause.innerHTML = "STOP";   //set STOP lại cho button trong trường hợp trước đó bị set START
  btnPause.classList.remove("resume"); //xóa class của button trước đó
  timeWorking[0].innerHTML = "Time to work!";

  color.classList = "start"; //set màu
  btnPause.style.color = "#" + seColor; //set màu
  
  btnStart.style.display = "inline-block"; //set trạng thái cho button
  btnPause.style.display = "none"; //set trạng thái cho button

  localStorage.setItem("btn", "focus"); //set localStorage 
  clearTimeout(initial); //xóa time hiện tại đang chạy

  pomodoro.classList.add("active");  //add class cho button
  breakT.classList.remove("active");  //xóa class của button trước đó
})

//tab time break
breakT.addEventListener("click", () => {
  minDiv.innerHTML = minutes_break_sessions; //set time cho div
  sec.innerHTML = seconds_sessions; //set time cho div
  btnPause.innerHTML = "STOP"; //set STOP lại cho button trong trường hợp trước đó bị set START
  btnPause.classList.remove("resume"); //xóa class của button trước đó
  timeWorking[0].innerHTML = "Time for a break!";


  color.remove = "start"; //xóa class của break time
  color.classList = "break"; //set màu
  btnPause.style.color = "#" + mainColor; //set màu
  
  btnStart.style.display = "inline-block"; //set trạng thái cho button
  btnPause.style.display = "none"; //set trạng thái cho button
  
  clearTimeout(initial);
  localStorage.setItem("btn", "break"); //set localStorage 
  
  breakT.classList.add("active"); //add class cho button hiện tại
  pomodoro.classList.remove("active"); //xóa class của button trước đó
})

//Add onclick pause/start
btnPause.addEventListener("click", () =>{
  click.play();

  if(paused === undefined){
    return;
  }
  if(paused){
    
    initial = setTimeout("decremenT()", 60); 
    btnPause.innerHTML = "STOP"; //set giá trị cho button hiện tại
    btnPause.classList.remove("resume"); //xóa class của button trước đó
    
    paused = false;
  } else {

    clearInterval(initial);
    btnPause.innerHTML = "START"; //set giá trị cho button hiện tại
    btnPause.classList.add("resume"); //xóa class của button trước đó

    paused = true;
  }
})

//Add onclick start time
btnStart.addEventListener("click", () => {
  click.play();

  let btn = localStorage.getItem("btn"); //gán giá trị của localStorage vào biến

  if(btn === "focus") {
    mins =  25; //set time pomodoro
    btnStart.style.display = "none";
    btnPause.style.display = "inline-block";
    btnPause.style.color = "#" + mainColor;
  } else{
    mins = 5; //set time break
    btnStart.style.display = "none";
    btnPause.style.display = "inline-block";
    btnPause.style.color = "#" + seColor;
  }
  seconds = mins * 60;
  setTimeout(decremenT(), 60); 
  paused = false;
})

//Timer function
function decremenT(){
  minDiv.innerHTML = Math.floor(seconds / 60);
  sec.innerHTML = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

  if(seconds > 0){ //kiểm tra nếu thời gian đang chạy thì:
    seconds--; //giây sẽ trừ 1
    initial = window.setTimeout("decremenT()", 1000); 
  } else {
    bell.play();
    mins = 0; 
    seconds = 0;
    let btn = localStorage.getItem("btn"); 

    if(btn === "focus"){
      localStorage.setItem("btn", "break");

      btnStart.innerHTML = "START BREAK";
      timeWorking[0].innerHTML = "Time to work!";

      color.remove = "start";
      color.classList = "break";
      btnPause.style.color = "#" + mainColor;

      btnStart.style.display = "inline-block";
      btnPause.style.display = "none";
      
      document.getElementsByClassName("time-working")[0].innerHTML = "Time for a break!";
      minDiv.innerHTML = minutes_break_sessions;
      sec.innerHTML = seconds_sessions;

      breakT.classList.add("active");
      pomodoro.classList.remove("active");

    } else {
      localStorage.setItem("btn", "focus");

      btnStart.innerHTML = "START";
      color.classList = "start";
      timeWorking[0].innerHTML = "Time for a break!";

      btnPause.style.color = "#" + seColor;

      btnStart.style.display = "inline-block";
      btnPause.style.display = "none";
      
      document.getElementsByClassName("time-working")[0].innerHTML = "Time to work!";
      minDiv.innerHTML = minutes_sessions;
      sec.innerHTML = seconds_sessions;

      pomodoro.classList.add("active");
      breakT.classList.remove("active");
    }
  }
}
  






