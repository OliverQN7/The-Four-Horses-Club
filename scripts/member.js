(function () {
  // Массив объектов с данными участников
  const allParticipants = [
    {
      name: "Хозе-Рауль Капабланка",
      status: "Чемпион мира по шахматам",
      id: 1,
    },
    {
      name: "Эммануил Ласкер",
      status: "Чемпион мира по шахматам",
      id: 2,
    },
    {
      name: "Александр Алехин",
      status: "Чемпион мира по шахматам",
      id: 3,
    },
    {
      name: "Арон Нимцович",
      status: "Чемпион мира по шахматам",
      id: 4,
    },
    {
      name: "Рихард Рети",
      status: "Чемпион мира по шахматам",
      id: 5,
    },
    {
      name: "Остап Бендер",
      status: "Гроссмейстер",
      id: 6,
    },
  ];

  // Поиск элементо по id
  const sliderLine = document.getElementById("slider-line");
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");
  const counterElement = document.getElementById("counter");

  const firstIndex = 0;
  const lastIndex = allParticipants.length - 1;

  let count; // Переменная для хранения текущего количества отображаемых участников
  let flag = false; // Флаг для отслеживания состояния анимации
  let elemWidth; // Ширина элемента слайдера
  let direction = null; // Переменная для отслеживания направления сдвига слайдера
  let activeArray = []; // Массив для хранения активных участников (отображаемых в данный момент)
  let isAnimating = false;

  if (window.innerWidth > 1024) {
    count = 3;
    elemWidth = 203;
  } else if (window.innerWidth <= 1024 && window.innerWidth > 680) {
    count = 2;
    elemWidth = 207;
  } else if (window.innerWidth < 680) {
    count = 1;
    elemWidth = 207;
  }

  function createSliderCard(name, status) {
    const sliderCard = document.createElement("div");
    sliderCard.className = "member";
    sliderCard.innerHTML = `
    <div class="member-img"><img src="./images/member.png" alt="member"/></div>
    <div class="member-title">${name}</div>
    <div class="member-description">${status}</div>
    <button class="member-button">Подробнее</button>`;

    return sliderCard;
  }

  allParticipants.forEach((item, index) => {
    if (index + 1 <= count) {
      activeArray.push(item);
      const sliderCard = createSliderCard(
        item.name,
        item.status,
        count,
        allParticipants.length
      );
      sliderLine.append(sliderCard);
    }
  });

  counterElement.innerHTML = `${count}/${allParticipants.length}`;

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      if (Array.isArray(activeArray) && activeArray.length < 3) {
        activeArray.allParticipants.slice(0, 3);
      }
      doInsideSlider(3);
    } else if (window.innerWidth < 1000 && window.innerWidth > 680) {
      if (Array.isArray(activeArray) && activeArray.length < 2) {
        activeArray.allParticipants.slice(0, 2);
      }
      doInsideSlider(2);
    } else if (window.innerWidth < 680) {
      doInsideSlider(1);
    }
  });

  function doInsideSlider(idx) {
    sliderLine.style.transform = "translateX(0)";
    sliderLine.innerHTML = "";
    activeArray.slice(0, idx).forEach((item) => {
      const sliderCard = createSliderCard(
        item.name,
        item.status,
        count,
        allParticipants.length
      );
      sliderLine.append(sliderCard);
    });
  }

  const movePrev = () => {
    if (isAnimating) {
      return;
    }
    isAnimating = true;
    if (count < allParticipants.length) {
      nextBtn.classList.remove("disable");
    }
    if (
      (window.innerWidth > 1024 && count === 3) ||
      (window.innerWidth <= 1024 && window.innerWidth > 680 && count === 2) ||
      (window.innerWidth < 680 && count === 1)
    ) {
      prevBtn.removeEventListener("click", movePrev);
      prevBtn.setAttribute("disabled", "disabled");
    } else {
      if (count === 0) {
        count = allParticipants.length;
      }

      count--;

      const indexToFindElemToUnshift = allParticipants.findIndex(
        (item) => item === activeArray[0]
      );
      if (indexToFindElemToUnshift !== -1) {
        const elemToUnshift = allParticipants[indexToFindElemToUnshift - 1];
        activeArray.unshift(elemToUnshift);

        const sliderCard = createSliderCard(
          elemToUnshift.name,
          elemToUnshift.status
        );
        sliderLine.classList.add("tempo");

        sliderLine.style.transition = "0.5s";
        sliderLine.style.transform = `translateX(${elemWidth}px)`;

        sliderLine.prepend(sliderCard);

        nextBtn.removeEventListener("click", moveNext);
        prevBtn.removeEventListener("click", movePrev);

        counterElement.innerText = `${count}/${allParticipants.length}`;

        if (
          (window.innerWidth > 1024 && count === 3) ||
          (window.innerWidth < 1024 &&
            window.innerWidth > 680 &&
            count === 2) ||
          (window.innerWidth < 680 && count === 1)
        ) {
          prevBtn.removeEventListener("click", movePrev);
          prevBtn.setAttribute("disabled", "disabled");
        }

        if (count < allParticipants.length) {
          nextBtn.removeAttribute("disabled");
        }

        flag = true;
        direction = "prev";
      }
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    }
  };

  const moveNext = () => {
    if (isAnimating) {
      return;
    }
    isAnimating = true;
    count++;

    const elemToPush = allParticipants.find((item) => item.id === count);
    if (elemToPush) {
      activeArray.push(elemToPush);
      const sliderCard = createSliderCard(elemToPush.name, elemToPush.status);
      sliderLine.classList.add("tempo");

      sliderLine.append(sliderCard);

      sliderLine.style.transition = "0.5s";
      sliderLine.style.transform = `translateX(${-elemWidth}px)`;

      nextBtn.removeEventListener("click", moveNext);
      prevBtn.removeEventListener("click", movePrev);

      counterElement.innerText = `${count}/${allParticipants.length}`;

      if (count === allParticipants.length) {
        count = firstIndex;
      }

      if (count === allParticipants.length - 1) {
        count = lastIndex;
      }

      prevBtn.removeAttribute("disabled");

      flag = true;
      direction = "next";
    }
    setTimeout(() => {
      isAnimating = false;
    }, 1000);
  };

  prevBtn.setAttribute("disabled", "disabled");

  prevBtn.addEventListener("click", movePrev);
  nextBtn.addEventListener("click", moveNext);

  sliderLine.addEventListener("transitionend", handleTransitionEnd);

  // setInterval(moveNext, 4000);

  function handleTransitionEnd(transitionEvent) {
    if (transitionEvent.propertyName === "transform" && flag) {
      prevBtn.removeEventListener("click", movePrev);
      nextBtn.removeEventListener("click", moveNext);

      if (direction === "next") {
        activeArray.shift();
      } else if (direction === "prev") {
        activeArray.pop();
      }

      const tmpDiv = document.createElement("div");
      activeArray.forEach((item) => {
        const sliderCard = createSliderCard(item.name, item.status);
        tmpDiv.append(sliderCard);
      });

      setTimeout(() => {
        let firstSlide = document.querySelector(".member:first-child");
        let lastSlide = document.querySelector(".member:last-child");

        if (direction === "next") {
          firstSlide.remove();
        } else {
          lastSlide.remove();
        }
        sliderLine.style.transition = "unset";
        sliderLine.style.transform = "unset";
      }, 500);

      nextBtn.addEventListener("click", moveNext);
      prevBtn.addEventListener("click", movePrev);
    }
  }
})();
