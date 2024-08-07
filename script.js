/*Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

Регистрация на Unsplash:

• Перейдите на веб-сайт Unsplash (https://unsplash.com/).
• Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

Создание приложения:

• Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
• Нажмите "New Application".
• Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
• Получите свой API-ключ после создания приложения.

Разработка веб-приложения:

• Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
• Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
• Отобразите информацию о фотографе под изображением.
• Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.

* Дополнительные задачи (по желанию):

• Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
• Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.*/

// Ваш API-ключ от Unsplash
const ACCESS_KEY = '...';

// Функция для получения случайного изображения из Unsplash
async function fetchRandomImage() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`);
    const data = await response.json();
    return data;
}

// Функция для отображения изображения и информации о фотографе
async function displayRandomImage() {
    const image = await fetchRandomImage();
    document.getElementById('random-image').src = image.urls.regular;
    document.getElementById('photographer-name').textContent = image.user.name;
    document.getElementById('photographer-link').href = image.user.links.html;
}

// Инициализация приложения и отображение случайного изображения
document.addEventListener('DOMContentLoaded', () => {
    displayRandomImage();
    loadLikeCount();
});

// Функция для увеличения счетчика лайков
function likeImage() {
    const likeCountElement = document.getElementById('like-count');
    let likeCount = parseInt(likeCountElement.textContent);
    likeCount++;
    likeCountElement.textContent = likeCount;
    saveLikeCount(likeCount);
}

// Функция для сохранения количества лайков в локальное хранилище
function saveLikeCount(count) {
    localStorage.setItem('likeCount', count);
}

// Функция для загрузки количества лайков из локального хранилища
function loadLikeCount() {
    const likeCount = localStorage.getItem('likeCount');
    if (likeCount !== null) {
        document.getElementById('like-count').textContent = likeCount;
    }
}


// Функция для добавления изображения в историю
function saveToHistory(image) {
    let history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    history.push(image);
    localStorage.setItem('imageHistory', JSON.stringify(history));
}

// Функция для отображения истории
function displayHistory() {
    let history = JSON.parse(localStorage.getItem('imageHistory')) || [];
    const historyContainer = document.getElementById('history-container');
    history.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.urls.thumb;
        historyContainer.appendChild(imgElement);
    });
}

// Добавляем вызов функции сохранения в функцию displayRandomImage
async function displayRandomImage() {
    const image = await fetchRandomImage();
    document.getElementById('random-image').src = image.urls.regular;
    document.getElementById('photographer-name').textContent = image.user.name;
    document.getElementById('photographer-link').href = image.user.links.html;
    saveToHistory(image);
}

// Добавляем элемент для отображения истории в HTML
document.addEventListener('DOMContentLoaded', () => {
    displayRandomImage();
    loadLikeCount();
    displayHistory();
});