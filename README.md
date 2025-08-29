# TodoApp — React + TypeScript Todo Application

Современное, функционально-насыщенное Todo-приложение, построенное с использованием **React**, **TypeScript** и **Vite**. Проект демонстрирует лучшие практики разработки на React и снабжён полной тестовой покрытостью.

---

## 🚀 Основные возможности

* ✅ Добавление задач с валидацией
* ✅ Отметка задач как выполненных / невыполненных
* ✅ Фильтрация задач (All, Active, Completed)
* ✅ Удаление/очистка выполненных задач
* ✅ Адаптивный дизайн (Emotion / styled-components)
* ✅ Счётчик задач в реальном времени
* ✅ Валидация форм с помощью Formik + Yup
* ✅ Полное покрытие тестами с Vitest

---

## 🛠️ Технологии

* **React 18** + **TypeScript**
* **Vite** — сборка и dev-сервер
* **Emotion** / **styled-components** — стили
* **Formik** + **Yup** — формы и валидация
* **Vitest** + **React Testing Library** — тестирование
* **uuid** для генерации уникальных id (`import { v4 as uuidv4 } from 'uuid'`)
* **npm** — менеджер пакетов

---

## 📦 Установка

Клонируйте репозиторий:

```bash
git clone <your-repo-url>
cd todo-app
```

Установите зависимости:

```bash
npm install
```

Запустите dev-сервер:

```bash
npm run dev
npm start
```

---

## 🧪 Тестирование

В проекте предусмотрено комплексное тестирование.

Запуск тестов в режиме наблюдения:

```bash
npm test
```

Запуск тестов один раз (CI-режим):

```bash
npm run test:run
```

Покрытие и типы тестов:

* Рендеринг компонентов
* Тесты взаимодействия пользователя
* Валидация форм (Yup)
* Функциональность фильтров
* Тесты управления состоянием
* Мокирование генерации UUID (например, `vi.mock('uuid')`)

---

## 🏗️ Структура проекта

```
src/
├── components/
│   └── TodoApp/
│       ├── TodoApp.tsx          # Главный компонент приложения
│       ├── TodoApp.test.tsx     # Тесты компонента
│       ├── types.ts             # Типы TypeScript (интерфейсы для Todo и т.д.)
│       └── styles.ts            # Стили (Emotion / styled-components)
├── test/
│   └── setup.ts                 # Конфигурация тестовой среды
├── vite.config.ts               # Конфиг Vite
└── package.json
```

---

## 🎯 Ключевые компоненты и логика

### TodoApp

* Управление состоянием задач (добавление, удаление, переключение completed)
* Генерация уникальных id через `uuidv4()`
* Обработка форм через Formik
* Валидация значений через Yup
* Фильтрация задач (All / Active / Completed)
* Очистка выполненных задач и подсчёт оставшихся

#### Пример схемы валидации (Yup)

```typescript
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .trim()
    .min(1, "Task cannot be empty")
    .max(100, "Task is too long")
    .required("Enter a task"),
});
```

#### Пример генерации нового Todo

```typescript
import { v4 as uuidv4 } from 'uuid';

const newTodo: Todo = {
  id: uuidv4(),
  text: values.text.trim(),
  completed: false,
};
```

---

## 🔧 Скрипты (package.json)

```
npm run dev       # Запуск dev-сервера (Vite)
npm run build     # Сборка для production
npm run preview   # Превью production-сборки
npm test          # Тесты в режиме watch
npm run test:run  # Прогон тестов один раз (CI)
```

---

## 🧭 Стратегия тестирования

* Unit-тесты для логики компонента
* Интеграционные тесты для пользовательских сценариев
* Мокирование UUID для стабильных тестов (`vi.mock('uuid')`)
* Тесты валидации Yup
* Проверка доступности (accessibility)

---

## 📝 Качество кода

* Полная типизация через TypeScript
* ESLint и Prettier для единого стиля кода
* Модульная структура компонентов
* Повторно используемые UI-компоненты
* Поставленная цель — покрыть код тестами на 100%

---

## 🚀 Производительность

* Быстрый dev-сервер благодаря Vite
* Оптимизированная сборка для production
* Эффективная работа с перерендерингом через хуки React
* Минимальный размер бандла при сборке

---

## 🤝 Как внести вклад

1. Форкните репозиторий
2. Создайте feature-ветку (`git checkout -b feature/awesome`)
3. Внесите изменения и добавьте тесты
4. Откройте Pull Request

---

## 📄 Лицензия

Проект лицензирован под **MIT License**. Смотрите файл `LICENSE` в репозитории.

---

## 🎉 Благодарности

Проект собран с использованием:

* [Vite](https://vitejs.dev/) — сборка и dev-сервер
* [Emotion](https://emotion.sh/docs/introduction) — стилизация компонентов
* [Vitest](https://vitest.dev/) — тестирование
* [Formik](https://formik.org/) — обработка форм
* [Yup](https://github.com/jquense/yup) — валидация
* [uuid](https://www.npmjs.com/package/uuid) — генерация уникальных id

---

Оставайтесь организованными и продуктивными с TodoApp — современным приложением для управления задачами с надёжной валидацией и уникальной генерацией id!
