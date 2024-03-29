import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <div class="welcome-container">
      <h1 class="welcome-header">Greetings!</h1>
      <p class="welcome-text">Ты находишься в системе управления приложения для "Отдела кадров"</p>
      <div class="feature-card">
        <h2>API для управление запросами через Swagger</h2>
        <button class="button" onCLick="window.location.href='http://localhost:3001/api'">Swagger</button>
      </div>
    </div>
    <style>
      body {
        background-color: #12192c; 
        font-family: 'Roboto', sans-serif; 
        margin: 0; 
        padding: 0; 
      }

      .button {
        display: inline-block;
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        border: 1px solid #1f1f1f;
        background-color: #87A922;
      }

      .welcome-container {
        background-color: #f9f9f9;
        border: 1px solid #1f1f1f;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        margin: 0 auto;
        margin-top: 10rem;
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
        margin-bottom: 30px;
      }

      .feature-card {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        margin-top: 30px; 
        border: 2px solid #1f1f1f; 
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
