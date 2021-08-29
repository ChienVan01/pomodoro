
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  // Thêm sự kiện cho nút close
  close[i].onclick = function () {
    // Lấy ra element cha của close[i] -> <li>
    var div = this.parentElement;
    // Ẩn element <li> đi:
    div.style.display = "none";
  };
}

var list = document.querySelector("ul");
list.addEventListener("click", function (event) {
  console.log(event.target.tagName);
  if (event.target.tagName == "LI") {
    event.target.classList.toggle("checked");
  }
});

function newElement() {
    // Tạo ra element: <li></li>
    var li = document.createElement("li");
    // Lấy giá trị user nhập từ thẻ input
    var inputValue = document.getElementById("input").value;
    // Tạo text node
    var t = document.createTextNode(inputValue);
    // Tạo: <li>t</li>
    li.appendChild(t);
  
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      // Cho li làm con của ul
      document.getElementById("taskUL").appendChild(li);
      document.getElementById("input").value = "";
    }
    // Tạo <span>
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
    close[close.length - 1].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
    }
  }    