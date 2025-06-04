// =============================
// ЗАДАНИЕ 3.2 — Динамическая составляющая
// Алгоритм:
// 1. Начало
// 2. Получаем элементы карточек преподавателей
// 3. Проверяем: найдены ли элементы?
//    3.1. Да:
//        3.1.1. Для каждой карточки добавляем обработчик "mouseover"
//        3.1.2. При наведении выводим сообщение в консоль
//    3.2. Нет:
//        3.2.1. Выводим ошибку в консоль
// 4. Конец
//
// Блок-схема: images/Block-schema.png
//


// =============================
// ЗАДАНИЕ 3.3 — Динамическая составляющая
// Алгоритм:
// 1. Начало
// 2. Получаем элементы:
//    2.1. Все карточки преподавателей → slider
//    2.2. Кнопка "влево" → prevButton
//    2.3. Кнопка "вправо" → nextButton
// 3. Объявляем количество видимых карточек → visibleCards = 3
// 4. Объявляем текущий индекс первой карточки → currentIndex = 0
// 5. Создаём функцию updateSlider(), которая:
//    5.1. Перебирает все карточки
//    5.2. Для каждой проверяет: попадает ли она в диапазон видимости?
//        5.2.1. Да → показываем
//        5.2.2. Нет → скрываем
// 6. Добавляем слушатель события click к кнопкам
//    6.1. При нажатии на "влево":
//         Если не первая группа → currentIndex--
//         Иначе → переходим к последней группе
//    6.2. При нажатии на "вправо":
//         Если не последняя группа → currentIndex++
//         Иначе → возвращаемся к первой группе
// 7. Обновляем отображение через updateSlider()
// 8. Конец
//
// Блок-схема: images/Block-schema.png
//

// --- Переменные для Задания 3.2 ---
const teacherCards = document.querySelectorAll('.teacher-card');

// --- Логика работы для Задания 3.2 ---
if (teacherCards.length > 0) {
    teacherCards.forEach((card, index) => {
        card.addEventListener('mouseover', () => {
            console.log(`Курсор наведён на преподавателя №${index + 1}`);
        });
    });
} else {
    console.error("Ошибка: карточки преподавателей не найдены.");
}

// --- Переменные для Задания 3.3 ---
const slider = document.querySelectorAll('.teacher-card');
const prevButton = document.getElementById('prev-teachers');
const nextButton = document.getElementById('next-teachers');
const visibleCards = 6; // количество одновременно отображаемых карточек
let currentIndex = 0;

// --- Функция обновления слайдера ---
function updateSlider() {
    slider.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + visibleCards) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- Обработчики событий для Задания 3.3 ---
if (slider.length > 0 && prevButton && nextButton) {
    updateSlider(); // показываем первые три карточки

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, slider.length - visibleCards);
        }
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < slider.length - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });
} else {
    console.error("Ошибка: элементы слайдера не найдены.");
}


// === Переключение темы ===
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
});


// === Инициализация AOS ===
AOS.init({
    duration: 1000,
    once: true
});


// === Валидация формы ===
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Введите корректный email-адрес.");
        return;
    }

    alert("Форма успешно отправлена!");
    console.log("Данные формы:", { name, email, message });
    this.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// === Горизонтальный скроллер для секции "Наши группы" ===
const groupCardContainer = document.getElementById('groupCards');
const groupPrevButton = document.querySelector('.group-prev');
const groupNextButton = document.querySelector('.group-next');

if (groupCardContainer && groupPrevButton && groupNextButton) {
  const cardWidth = 270; // ширина карточки + gap

  groupPrevButton.addEventListener('click', () => {
    groupCardContainer.scrollLeft -= cardWidth;
  });

  groupNextButton.addEventListener('click', () => {
    groupCardContainer.scrollLeft += cardWidth;
  });
} else {
  console.error("Ошибка: элементы слайдера групп не найдены.");
}

// =============================
// ЗАДАНИЕ 3.4 — Показ описания в модальном окне
// Алгоритм:
// 1. Начало
// 2. Получаем все кнопки "Узнать больше"
// 3. Получаем элементы модального окна
// 4. Для каждой кнопки добавляем обработчик click
//    4.1. Находим связанное описание внутри карточки
//    4.2. Копируем текст в модальное окно
//    4.3. Открываем модальное окно
// 5. Добавляем обработчики на закрытие окна
//    5.1. По клику на крестик → закрываем окно
//    5.2. По клику вне окна → закрываем
// 6. Конец
//
// Блок-схема: images/Block-schema.png
//

const learnMoreButtons = document.querySelectorAll('.course-card__button');
const modalOverlay = document.querySelector('.modal-overlay');
const modalDescription = document.querySelector('.modal-description');
const modalClose = document.querySelector('.modal-close');

if (learnMoreButtons.length > 0 && modalOverlay && modalDescription && modalClose) {
    // Открытие модального окна
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const fullDescription = button.nextElementSibling;

            if (!fullDescription || !fullDescription.classList.contains('course-card__full-description')) {
                console.error("Ошибка: описание не найдено или имеет неверный класс");
                return;
            }

            // Копируем содержимое в модальное окно
            modalDescription.innerHTML = fullDescription.innerHTML;
            modalOverlay.classList.remove('hidden');
        });
    });

    // Закрытие по крестику
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });

    // Закрытие по клику вне окна
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    });

} else {
    console.error("Ошибка: элементы модального окна не найдены.");
}

// =============================
// ЗАДАНИЕ 4 — Вывод заголовков курсов из массива
// Алгоритм:
// 1. Начало
// 2. Создаем массив заголовков курсов
// 3. Получаем контейнер для вывода #course-titles
// 4. Проверяем: найден ли элемент?
//    4.1. Да → проходим циклом forEach() по массиву
//         Для каждого заголовка создаём <li> и добавляем на страницу
//    4.2. Нет → выводим ошибку в консоль
// 5. Конец
//
// Блок-схема: images/Block-schema.png
//

const courseTitles = [
  "Немецкий для переводчиков",
  "Немецкий язык A1–A2",
  "Немецкий язык B1–B2",
  "Английский для переводчиков",
  "Английский язык A1–A2",
  "Английский язык B1–B2"
];

const courseListOutput = document.getElementById('course-titles');

if (courseListOutput) {
  courseTitles.forEach(title => {
    const listItem = document.createElement('li');
    listItem.textContent = title;
    courseListOutput.appendChild(listItem);
  });
} else {
  console.error("Ошибка: элемент #course-titles не найден.");
}

// =============================
// ЗАДАНИЕ 4 — Кнопка скролла вверх
// Алгоритм:
// 1. Начало
// 2. Получаем кнопку по ID #scroll-to-top
// 3. Добавляем обработчик события scroll
//    3.1. Если пользователь прокрутил > 300px → показываем кнопку
//    3.2. Иначе → скрываем кнопку
// 4. Добавляем обработчик click на кнопку
//    При клике прокручиваем страницу к началу
// 5. Конец
//
// Блок-схема: images/Block-schema.png
//

const scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
  // Показываем/скрываем кнопку при скролле
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  // Прокрутка вверх при клике
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
} else {
  console.error("Ошибка: кнопка #scroll-to-top не найдена.");
}