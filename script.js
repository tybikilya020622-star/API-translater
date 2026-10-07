// Отримання HTML-елементів
const inputArea = document.querySelector('#input');
const translateBtn = document.querySelector('#translateBtn');
const outputDiv = document.querySelector('#output');

// Опціонально: вкажіть ваш email для підвищення лімітів API MyMemory
const email = 'example@gmail.com';

// Асинхронна функція перекладу
async function translateText() {
  const text = inputArea.value.trim();

  // Перевірка на порожній ввід
  if (!text) {
    outputDiv.textContent = 'Будь ласка, введіть текст для перекладу.';
    return;
  }

  // Індикація завантаження
  outputDiv.textContent = 'Перекладаємо...';

  try {
    // Кодування тексту
    const safeText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${safeText}&langpair=uk|en&de=${email}`;

    // Виконання HTTP-запиту
    const response = await fetch(url);
    const data = await response.json();

    // Виведення результату
    if (data.responseData && data.responseData.translatedText) {
      outputDiv.textContent = data.responseData.translatedText;
    } else {
      outputDiv.textContent = 'Не вдалося отримати переклад.';
    }
  } catch (error) {
    console.error('Помилка при запиті:', error);
    outputDiv.textContent = 'Сталася помилка з\'єднання з сервером.';
  }
}

// Прив'язка функції до кліку по кнопці
translateBtn.addEventListener('click', translateText);