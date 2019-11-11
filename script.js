const paint = document.querySelector(".paint");
const brush = document.querySelector(".brush");
const pencil = document.querySelector(".pencil");
const colors = document.querySelector(".colors");
const canvas = document.querySelector(".canvas");
const tools = {
  paintTool: false,
  brushTool: false,
  pencilTool: false,
};
let currentColor = "#ffbd24";

// функция для активации инструментов, стилизации активных инструментов
function activateTool (activeTool, activeClass){
  for (let key in tools) tools[key] = false;
  tools[activeTool] = true;

  paint.classList.remove("activeColor");
  paint.style.backgroundColor = "white";
  pencil.classList.remove("active");
  brush.classList.remove("active");

  if(activeClass === paint) {
    activeClass.classList.add("activeColor");
    activeClass.style.backgroundColor = currentColor + "44";
  } else {
    activeClass.classList.add("active");
  }
}

// активация инструментов при клике
paint.addEventListener("click", () => activateTool("paintTool", paint));

brush.addEventListener("click", () => activateTool("brushTool", brush));

pencil.addEventListener("click", () => activateTool("pencilTool", pencil));

// активация инструментов при нажатии горячих клавиш
window.addEventListener("keydown", function(event) {
  if (event.keyCode == 80) {
    activateTool("paintTool", paint);
  } else if (event.keyCode == 67) {
    activateTool("brushTool", brush);
  } else if (event.keyCode == 77) {
    activateTool("pencilTool", pencil);
  }
});

// смена текущего цвета по клику инструментами brushTool и paintTool
// смена цветов в поле colors при клике brushTool
colors.addEventListener("click", (event) => {
  const firstColor = document.querySelector(".colors .tool:nth-child(1) .icon");
  const secondColor = document.querySelector(".colors .tool:nth-child(2) .icon");
  const thirdColor = document.querySelector(".colors .tool:nth-child(4) .icon");
  const fourthColor = document.querySelector(".colors .tool:nth-child(5) .icon");

  if (tools.brushTool) {
    let t = event.target;
    currentColor = t.dataset.code;

    if (t.dataset.num === "second") {
      let temp1 = [firstColor.dataset.code, firstColor.dataset.color];
      let temp2 = [t.dataset.code, t.dataset.color];

      firstColor.style.backgroundColor = temp2[0];
      firstColor.dataset.code = temp2[0];
      firstColor.dataset.color = temp2[1];

      secondColor.style.backgroundColor = temp1[0];
      secondColor.dataset.code = temp1[0];
      secondColor.dataset.color = temp1[1];
    }

    if (t.dataset.num === "third" ||
      t.dataset.num === "fourth") {
      let temp1 = [firstColor.dataset.code, firstColor.dataset.color];
      let temp2 = [secondColor.dataset.code, secondColor.dataset.color];
      let temp3 = [t.dataset.code, t.dataset.color];

      firstColor.style.backgroundColor = temp3[0];
      firstColor.dataset.code = temp3[0];
      firstColor.dataset.color = temp3[1];

      secondColor.style.backgroundColor = temp1[0];
      secondColor.dataset.code = temp1[0];
      secondColor.dataset.color = temp1[1];

      t.style.backgroundColor = temp2[0];
      t.dataset.code = temp2[0];
      t.dataset.color = temp2[1];
      t.nextElementSibling.innerHTML = t.dataset.color;
    }
  }

  if (tools.paintTool) {
    currentColor = event.target.dataset.code;
    paint.style.backgroundColor = currentColor + "44";
    paint.style.filter = "none";
  };
});

// применение инструментов paintTool  к блокам элемента canvas
canvas.addEventListener("click", (event) => {
  let t = event.target;
  if (!t.classList.contains("block")) return;

  if (tools.paintTool) {
    t.style.backgroundColor = currentColor;
  };
});

// if (tools.pencilTool) {
//      canvas.addEventListener('mousedown', function(){
//         isMouseDown =true;
//      });
//      canvas.addEventListener('mouseup', function(){
//         isMouseDown =false;
//      });
//
//      canvas.addEventListener('mousemove', function(e){
//         if(isMouseDown){
//         pencil.lineTo(e.clientX, e.clientY);
//         pencil.stroke();
//
//         pencil.beginPath();
//         pencil.arc(e.clientX, e.clientY, 10, 0, Math.PI *2);
//         pencil.fill();
//
//         pencil.beginPath();
//         pencil.moveTo(e.clientX, e.clientY);
//      }
//      })
//
//      canvas.addEventListener("click", (event) =>{
//         let t = event.target;
//         if (!t.classList.contains("block")) return;
//
//         if (tools.pencilTool) {
//           t.style.('mousemove');
//         };
//  });


// сохранение состояния элементов в LocalStorage
canvas.addEventListener("click", (event) => {
  let t = event.target;
  if (!t.classList.contains("block")) return;

  let blockClass = t.dataset.class;
  let blockColor = t.style.backgroundColor || "#8afffd";


  localStorage.setItem(blockClass, JSON.stringify({blockColor}));
});

// восстановления состояния элементов после перезагрузки
window.onload = function() {
  const blocks = document.querySelectorAll(".block");

  blocks.forEach((item, index) => {
    let styles = JSON.parse(localStorage.getItem(`block${index + 1}`));
    if (!styles) return;

    item.style.backgroundColor = styles.blockColor || "#8afffd";
});
}
