let taskList = [];
let taskListOld = [];

// Kiểm tra nếu taskList trên localStorage 
if(localStorage.getItem('setTaskList')) {
  console.log(JSON.parse((localStorage.getItem('setTaskList'))));
  //Cập nhật giá trị của taskList trên localStorage vào mảng mới
  taskListOld.push(JSON.parse((localStorage.getItem('setTaskList'))))
  for(let x = 0; x < taskListOld.length; x++) {
    taskList = taskListOld[x];
  }
  // localStorage.setItem('setTaskList', JSON.stringify(taskList));

}
// localStorage.removeItem('setTaskList');

// Đưa các giá trị trong taskListOld thành thẻ LI khi reload
for(let y = 0; taskList.length > y; y++) {
  var li = document.createElement("li");
  // Lấy giá trị user nhập từ thẻ input
  // Tạo text node
  var t = document.createTextNode(taskList[y].name);
  // Tạo: <li>t</li>
  li.appendChild(t);
  if(taskList[y].Completed){
    li.className = "checked"
  }
   // Tạo <span>
   var span = document.createElement("SPAN");
   // var txt = document.classList.add("far fa-trash-alt");
   // span.className = "close";
   span.className = "close far fa-trash-alt";
   li.appendChild(span);
   document.getElementById("taskUL").appendChild(li);
}

//Delete
var close = document.getElementsByClassName("close");
var i;
let newTaskList = [];
for (i = 0; i < close.length; i++) {
  // Thêm sự kiện cho nút close
  close[i].onclick = function () {
    // Lấy ra element cha của close[i] -> <li>
    var div = this.parentElement;
    // Xóa nội dung của li ra khỏi mảng taskList
    
    newTaskList = taskList.filter(e => e.name !== this.parentElement.innerText);
    localStorage.setItem('setTaskList', JSON.stringify(newTaskList));
    newTaskList.push(JSON.parse((localStorage.getItem('setTaskList'))))
    // Cập nhật lại nội dung của taskList trong localStorage vào newTaskList
    for(let x = 0; x < newTaskList.length; x++) {
      taskList = newTaskList[x];
    }
    div.style.display = "none";
  };
}

//check
var list = document.querySelector("ul");
list.addEventListener("click", function (event) {
  console.log(event.target.tagName);
  if (event.target.tagName == "LI" ) {
    event.target.classList.toggle("checked");
    for(let x = 0; taskList.length > x; x++){
      if(taskList[x].name === event.target.innerText){
        taskList[x].Completed = true;
        console.log("New",newTaskList);
      }
      localStorage.setItem('setTaskList', JSON.stringify(taskList));
    }
  }
});

function newElement() {
  // Tạo ra element: <li></li>
  var li = document.createElement("li");
  // Lấy giá trị user nhập từ thẻ input
  // Tạo text node
  var inputValue = document.getElementById("input").value;
  var t = document.createTextNode(inputValue);
  // Tạo: <li>t</li>
  li.appendChild(t);

  if (inputValue === "") {
    alert("You must write something!");
  } else {
    // Cho li làm con của ul
    document.getElementById("taskUL").appendChild(li);
    document.getElementById("input").value = "";
    taskList.push({name: inputValue, Completed: false});
    console.log('taskList', taskList);
    localStorage.setItem('setTaskList', JSON.stringify(taskList));
  }
   
  // Tạo <span>
  var span = document.createElement("SPAN");
  span.className = "close far fa-trash-alt";
  li.appendChild(span);

    for (i = 0; i < close.length; i++) {
    close[close.length - 1].onclick = function () {
    var div = this.parentElement;
   
    newTaskList = (taskList.filter(e => e.name !== this.parentElement.innerText));
    console.log("New",newTaskList);
    localStorage.setItem('setTaskList', JSON.stringify(newTaskList));
    newTaskList.push(JSON.parse((localStorage.getItem('setTaskList'))))
    for(let x = 0; x < newTaskList.length; x++) {
      taskList = newTaskList[x];
    }
    div.style.display = "none";
  };
  }
}    

  