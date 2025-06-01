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