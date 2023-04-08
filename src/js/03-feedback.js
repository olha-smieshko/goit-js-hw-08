
// // Імпортуємо бібліотеку lodash.throttle
import throttle from 'lodash.throttle';

// Отримання елементів форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Функція для збереження даних форми в локальне сховище
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500); // Оновлення не частіше, ніж раз на 500 мілісекунд

// Функція для заповнення полів форми зі збереженими даними
const loadFormState = () => {
  const formState = JSON.parse(localStorage.getItem('feedback-form-state')) ?? {};
  emailInput.value = formState.email ?? '';
  messageInput.value = formState.message ?? '';
};

// Відстеження події input на формі
form.addEventListener('input', () => {
  saveFormState();
});

// Перевірка стану сховища при завантаженні сторінки
window.addEventListener('load', () => {
  loadFormState();
});

// Обробка події сабміту форми
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formState = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  if (!formState.email || !formState.message) {
    alert('Заповніть, будь ласка, форму');
    return;
  }
  console.log(formState);
    // console.log('Email:', formState.email);
    // console.log('Message:', formState.message);
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
  });
