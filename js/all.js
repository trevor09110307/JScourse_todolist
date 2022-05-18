let data = [];
const inputTodo = document.querySelector(".card.input input");
const save = document.querySelector(".btn_add");
const tab = document.querySelector(".tab");
const list = document.querySelector(".cart_content .list");
const footerP = document.querySelector(".list_footer p");
const footerA = document.querySelector(".list_footer a");
// --------------------------------------
function checkUnFinishedNum() {
  let num = 0;
  data.forEach((item) => {
    if (item.isFinished === false) {
      num += 1;
    }
  });
  return num;
}
function renderData() {
  // 由於當data一筆資料都沒有時不會執行forEach，執行↓刪除畫面上最後一筆資料
  if (data.length === 0) {
    list.innerHTML = "";
  }
  // 當data的資料長度至少有一筆的時候,執行↓
  let str = "";
  let status;
  let statusCheck = tab.children;

  // 把tab現在在哪個狀態, 存入status;
  Array.from(statusCheck).forEach((item) => {
    if (item.getAttribute("class") === "active") {
      status = item.textContent;
    }
  });

  // 依據tab是在哪個項目做出不同的str
  if (status === "全部") {
    data.forEach((item, index) => {
      str += `<li data-num="${index}" data-isFinished="${item.isFinished}"><label class="checkbox" for=""><input type="checkbox" /><span>${item.content}</span></label><a href="#" class="delete"></a></li>`;
    });
    list.innerHTML = str;
  } else if (status === "待完成") {
    data.forEach((item, index) => {
      if (item.isFinished === false) {
        str += `<li data-num="${index}" data-isFinished="${item.isFinished}"><label class="checkbox" for=""><input type="checkbox" /><span>${item.content}</span></label><a href="#" class="delete"></a></li>`;
      }
    });
    list.innerHTML = str;
  } else if (status === "已完成") {
    data.forEach((item, index) => {
      if (item.isFinished === true) {
        str += `<li data-num="${index}" data-isFinished="${item.isFinished}"><label class="checkbox" for=""><input type="checkbox" /><span>${item.content}</span></label><a href="#" class="delete"></a></li>`;
      }
    });
    list.innerHTML = str;
  }

  // 根據傳入的資料中isFinished帶的值,判斷checkbox是否要打勾
  let li = document.querySelectorAll(".cart_content li");
  li.forEach((item) => {
    let boolen = item.getAttribute("data-isFinished");
    if (boolen === "true") {
      item.firstChild.firstChild.checked = true;
    } else if (boolen === "false") {
      item.firstChild.firstChild.checked = false;
    }
  });

  // 顯示畫面中未完成的項目有幾個
  let unFinishedNum = checkUnFinishedNum();
  footerP.textContent = `${unFinishedNum}個未完成項目`;
}
// ---------------------------------------
renderData();
// 新增todo
save.addEventListener("click", (e) => {
  if (inputTodo.value.trim() !== "") {
    let obj = {};
    obj.content = inputTodo.value.trim();
    obj.isFinished = false;
    data.push(obj);
    renderData();
    inputTodo.value = "";
  }
});

list.addEventListener("click", (e) => {
  // 刪除todo
  if (e.target.getAttribute("class") === "delete") {
    let num = e.target.parentNode.getAttribute("data-num");
    console.log(num);
    data.splice(num, 1);
    renderData();
  }

  if (e.target.nodeName === "INPUT") {
    //點擊checkbox時，把data中的isFinished資料同步
    let num = e.target.parentNode.parentNode.getAttribute("data-num");
    data[num].isFinished = !data[num].isFinished;
    renderData();
  }
});

// tab處理
tab.addEventListener("click", (e) => {
  // tab的切換
  if (e.target.nodeName === "LI") {
    const tabList = document.querySelectorAll(".tab li");
    tabList.forEach((item) => {
      item.removeAttribute("class");
    });
    e.target.setAttribute("class", "active");
    renderData();
  }
});

// 清除已完成
footerA.addEventListener("click", (e) => {
  data = data.filter((item, index) => {
    return item.isFinished === false;
  });
  renderData();
});
