import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!-- HTML-разметка -->
    <div class="welcome-container">
      <h1 class="welcome-header">Привет!</h1>
      <p class="welcome-text">Добро пожаловать в наше приложение. Мы рады видеть вас здесь!</p>
      <div class="feature-card">
        <h2>Наши API</h2>
        <p>Получить доступ к нашему <a href="http://localhost:3001/api" target="_blank">API</a></p>
      </div>
    </div>
    <!-- CSS-стили -->
    <style>
      body {
        background-color: #12192c; /* Цвет фона страницы */
        font-family: 'Roboto', sans-serif; /* Используем шрифт Roboto для всей страницы */
        margin: 0; /* Убираем внешние отступы */
        padding: 0; /* Убираем внутренние отступы */
      }
      .welcome-container {
        background-color: #f9f9f9;
        border: 1px solid #1f1f1f;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        margin: 0 auto;
        text-align: center;
        padding: 20px;
        overflow: hidden;
      }

      .welcome-header {
        color: #333;
        font-size: 24px;
        margin-bottom: 16px;
      }

      .welcome-text {
        font-size: 18px;
        color: #666;
        line-height: 1.6;
        margin-bottom: 30px; /* Увеличили пространство между описанием и карточкой */
      }

      .feature-card {
        background-color: #fff;
        padding: 20px;
        transition: transform 0.3s ease-in-out;
        border-radius: 8px;
        margin-top: 30px; /* Увеличили пространство между карточкой и описанием */
        border: 2px solid #1f1f1f; /* Добавили границу с цветом */
      }

      .feature-card:hover {
        transform: translateY(-5px);
      }

      .feature-list {
        list-style-type: none;
        padding: 0;
      }

      .feature-list li {
        margin-bottom: 10px;
      }

      .feature-list li a {
        color: #007bff;
        text-decoration: none;
      }

      .feature-list li a:hover {
        text-decoration: underline;
      }
    </style>
    `;
  }
}
