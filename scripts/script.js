// =============================
// ЗАДАНИЕ 3.2 — Динамическая составляющая
// Алгоритм:
// 1. Начало
// 2. Получаем элемент кнопки по ID ("theme-toggle")
// 3. Проверяем: найден ли элемент?
//    3.1. Да:
//        3.1.1. Добавляем обработчик события "mouseover"
//        3.1.2. Выводим сообщение в консоль при наведении
//        3.1.3. Добавляем обработчик события "mouseleave"
//        3.1.4. Выводим сообщение в консоль при уходе курсора
//    3.2. Нет:
//        3.2.1. Выводим ошибку в консоль
// 4. Конец
//
// Блок-схема: images/Block-schema.png
//

// --- Переменные ---
const themeToggle = document.getElementById('theme-toggle');

// --- Логика работы ---
if (themeToggle) {
    // Если кнопка найдена

    // При наведении выводим сообщение
    themeToggle.addEventListener('mouseover', () => {
        console.log("Курсор наведён на кнопку смены темы");
    });

    // При уходе курсора выводим другое сообщение
    themeToggle.addEventListener('mouseleave', () => {
        console.log("Курсор ушёл с кнопки");
    });

} else {
    // Если кнопка не найдена
    console.error("Ошибка: кнопка с ID 'theme-toggle' не найдена.");
}

// =============================
// ОСНОВНЫЙ ФУНКЦИОНАЛ САЙТА
// =============================

// --- Сообщение о загрузке скрипта ---
console.log("✅ Скрипт успешно загружен!");

// --- Переключение темы (светлая / тёмная) ---
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');

        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// --- Загрузка сохранённой темы ---
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
});

// --- AOS (анимация при скролле) ---
AOS.init({
    duration: 1000,
    once: true // Анимация проигрывается один раз
});

// --- Валидация формы обратной связи ---
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