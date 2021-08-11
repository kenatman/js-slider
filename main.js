const items = document.querySelectorAll(`.bg`);
const totalItems = items.length;
let slide = 0;
let moving = true;

function setBgStart() {
  items[totalItems - 1].classList.add(`bg-prev`);
  items[0].classList.add(`bg-active`);
  items[1].classList.add(`bg-next`);
}

function setEventListener() {
  const next = document.querySelector(`.next`);
  const prev = document.querySelector(`.prev`);
  next.addEventListener("click", moveNext);
  prev.addEventListener("click", movePrev);
}

function moveNext() {
  if (!moving) {
    if (slide === totalItems - 1) {
      slide = 0;
    } else {
      slide++;
    }
    moveSlideTo(slide);
  }
}

function movePrev() {
  if (!moving) {
    if (slide === 0) {
      slide = totalItems - 1;
    } else {
      slide--;
    }
    moveSlideTo(slide);
  }
}

function handleMoving() {
  moving = true;
  setTimeout(() => {
    moving = false;
  }, 500);
}

function moveSlideTo(slide) {
  if (!moving) {
    handleMoving();
    let newPrevious = slide - 1;
    let newNext = slide + 1;
    let oldPrevious = slide - 2;
    let oldNext = slide + 2;
    if (totalItems - 1 >= 3) {
      if (newPrevious <= 0) {
        oldPrevious = totalItems - 1;
      } else if (newNext >= totalItems - 1) {
        oldNext = 0;
      }
      if (slide === 0) {
        newPrevious = totalItems - 1;
        oldPrevious = totalItems - 2;
        oldNext = slide + 1;
      } else if (slide === totalItems - 1) {
        newPrevious = slide - 1;
        newNext = 0;
        oldNext = 1;
      }

      items[oldPrevious].className = `bg`;
      items[oldNext].className = `bg`;

      items[newPrevious].className = `bg bg-prev`;
      items[slide].className = `bg bg-active`;
      items[newNext].className = `bg bg-next`;
    }
  }
}

function init() {
  setBgStart();
  setEventListener();
  moving = false;
}

init();
