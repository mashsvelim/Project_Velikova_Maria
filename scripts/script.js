// scripts/script.js

console.log("✅ Скрипт успешно загружен!");

// --- Переключение темы (светлая / тёмная) ---
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
