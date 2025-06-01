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

// --- Переменные ---
const teacherCards = document.querySelectorAll('.teacher-card');

// --- Логика работы ---
if (teacherCards.length > 0) {
    teacherCards.forEach((card, index) => {
        card.addEventListener('mouseover', () => {
            console.log(`Курсор наведён на преподавателя №${index + 1}`);
        });
    });
} else {
    console.error("Ошибка: карточки преподавателей не найдены.");
}

// === Слайдер преподавателей ===
const prevButton = document.getElementById('prev-teachers');
const nextButton = document.getElementById('next-teachers');
const teacherCardContainer = document.getElementById('teacherCards');

if (teacherCardContainer && prevButton && nextButton) {
    const cardWidth = teacherCards[0].offsetWidth + 20;

    prevButton.addEventListener('click', () => {
        teacherCardContainer.scrollLeft -= cardWidth;
    });

    nextButton.addEventListener('click', () => {
        teacherCardContainer.scrollLeft += cardWidth;
    });
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