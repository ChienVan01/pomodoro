// ----------main-------------
btnPause.addEventListener("click", () => {
  click.play();
  if (paused === undefined) {
    return;
  }
  if (paused) {
    paused = false;
    initial = setTimeout("decremenT()", 60);
    btnPause.innerHTML = "STOP";
    btnPause.classList.remove("resume");
  } else {
    clearTimeout(initial);
    btnPause.innerHTML = "START";
    btnPause.classList.add("resume");
    paused = true;
  }
});

btnStart.addEventListener("click", () => {
click.play();

let btn = localStorage.getItem("btn");

if (btn === "focus") {
  mins = +localStorage.getItem("focusTime") || 25;

  btnStart.style.display = "none";
  btnPause.style.display = "inline-block";
  btnPause.style.color = "rgb(219 82 77)";

  } else {
    mins = +localStorage.getItem("breakTime") || 5;

    btnStart.style.display = "none";
    btnPause.style.display = "inline-block";
    btnPause.style.color = "rgb(70, 142, 145)";
    
  }

  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decremenT(), 60);
  // btnStart.style.transform = "scale(0)";
  paused = false;
});

function decremenT() {
  minDiv.innerHTML = Math.floor(seconds / 60);
  sec.innerHTML = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);
    
  } else {
    mins = 0;
    seconds = 0;
    bell.play();
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
      btnStart.innerHTML = "START BREAK";
      color.remove = "start";
      color.classList = "break";
      btnStart.style.color = "rgb(70, 142, 145)";

      localStorage.setItem("btn", "break");
      
      btnStart.style.display = "inline-block";
      btnPause.style.display = "none";
      
      
      minDiv.innerHTML = minutes_break_sessions;
      sec.innerHTML = seconds_sessions;

      console.log("break");
      
    } else {
      btnStart.innerHTML = "START";
      color.classList = "start";
      btnStart.style.color = "rgb(219 82 77)";

      localStorage.setItem("btn", "focus");     
      
      btnStart.style.display = "inline-block";
      btnPause.style.display = "none";
      
      minDiv.innerHTML = minutes_sessions;
      sec.innerHTML = seconds_sessions;

      console.log("pause");     
    }
  }
}















// ---------------------Demos--------------------
// Required variables
var session_seconds = "00";
var session_minutes = 25;

// Audio files
var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

// Starting template for the timer
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

function start_timer() {
  click_sound.play();

  // Change the minutes and seconds to starting time
  session_minutes = 24;
  session_seconds = 59;

  // Add the seconds and minutes to the page
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
  document.getElementById("btn-start").innerHTML = "STOP";

  // Start the countdown
  var minutes_interval = setInterval(minutesTimer, 60000);
  var seconds_interval = setInterval(secondsTimer, 1000);

  // Functions
  // Function for minute counter
  function minutesTimer() {
    session_minutes = session_minutes - 1;
    document.getElementById("minutes").innerHTML = session_minutes;
  }

  // Function for second counter
  function secondsTimer() {
    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

    // Check if the seconds and minutes counter has reached 0
    // If reached 0 then end the session
    if (session_seconds <= 57) {
      if (session_minutes <= 24) {
        // Clears the interval i.e. stops the counter
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);
        
        bell.play();
        
        // Add the message to the html
        document.getElementById("done").innerHTML =
          "Session Completed!! Take a Break";

        // Make the html message div visible
        document.getElementById("done").classList.add("show_message");

        // PLay the bell sound to tell the end of session
      }

      // Reset the session seconds to 60
      session_seconds = 60;
    }
  }
}

// if(start_timer()){
//     document.getElementById("btn-start").innerHTML = "STOP";
// }


// 10 minutes from now
var time_in_minutes = 10;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes*60*1000);


function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

var timeinterval;
function run_clock(id,endtime){
	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
		clock.innerHTML = 'minutes: '+t.minutes+'<br>seconds: '+t.seconds;
		if(t.total<=0){ clearInterval(timeinterval); }
	}
	update_clock(); // run function once at first to avoid delay
	timeinterval = setInterval(update_clock,1000);
}
run_clock('clockdiv',deadline);


var paused = false; // is the clock paused?
var time_left; // time left on the clock when paused

function pause_clock(){
	if(!paused){
		paused = true;
		clearInterval(timeinterval); // stop the clock
		time_left = time_remaining(deadline).total; // preserve remaining time
	}
}

function resume_clock(){
	if(paused){
		paused = false;

		// update the deadline to preserve the amount of time remaining
		deadline = new Date(Date.parse(new Date()) + time_left);

		// start the clock
		run_clock('clockdiv',deadline);
	}
}

// handle pause and resume button clicks
document.getElementById('pause').onclick = pause_clock;
document.getElementById('resume').onclick = resume_clock;
