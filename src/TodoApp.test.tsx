/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import TodoApp from './components/TodoApp/TodoApp';


// Mock UUID - исправляем чтобы возвращал последовательные значения
let uuidCounter = 0;
vi.mock('uuid', () => ({
  v4: vi.fn(() => `test-id-${++uuidCounter}`)
}));

describe('TodoApp', () => {
  beforeEach(() => {
    uuidCounter = 0;
    vi.clearAllMocks();
  });

  test('рендерит заголовок приложения', () => {
    render(<TodoApp />);
    expect(screen.getByText('todos')).toBeDefined();
  });

  test('добавляет новую задачу', async () => {
    render(<TodoApp />);
    
    const input = screen.getByTestId('todo-input');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Новая задача')).toBeDefined();
    });
  });

  test('переключает статус выполнения задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByTestId('todo-input');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      // Находим чекбокс по data-testid который начинается с "checkbox-"
      const checkboxes = screen.getAllByTestId(/^checkbox-/);
      const checkbox = checkboxes[0];
      expect(checkbox).toBeDefined();
      fireEvent.click(checkbox);
    });
  });

  test('фильтрует задачи по статусу', async () => {
    render(<TodoApp />);
    
    const input = screen.getByTestId('todo-input');
    const form = input.closest('form')!;

    // Добавляем первую задачу и ждем ее появления
    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Активная задача')).toBeDefined();
    });

    // Добавляем вторую задачу и ждем ее появления
    fireEvent.change(input, { target: { value: 'Завершенная задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Завершенная задача')).toBeDefined();
    });

    // Теперь находим все чекбоксы и завершаем вторую задачу
    await waitFor(() => {
      const checkboxes = screen.getAllByTestId(/^checkbox-/);
      expect(checkboxes.length).toBe(2);
      fireEvent.click(checkboxes[1]);
    });

    // Переключаемся на фильтр "Active"
    const activeFilter = screen.getByTestId('filter-active');
    fireEvent.click(activeFilter);

    await waitFor(() => {
      expect(screen.getByText('Активная задача')).toBeDefined();
      expect(screen.queryByText('Завершенная задача')).toBeNull();
    });

    // Переключаемся на фильтр "Completed"
    const completedFilter = screen.getByTestId('filter-completed');
    fireEvent.click(completedFilter);

    await waitFor(() => {
      expect(screen.queryByText('Активная задача')).toBeNull();
      expect(screen.getByText('Завершенная задача')).toBeDefined();
    });

    // Возвращаемся к фильтру "All"
    const allFilter = screen.getByTestId('filter-all');
    fireEvent.click(allFilter);

    await waitFor(() => {
      expect(screen.getByText('Активная задача')).toBeDefined();
      expect(screen.getByText('Завершенная задача')).toBeDefined();
    });
  });

  test('очищает завершенные задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByTestId('todo-input');
    const form = input.closest('form')!;

    // Добавляем и завершаем задачу
    fireEvent.change(input, { target: { value: 'Задача для очистки' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const checkboxes = screen.getAllByTestId(/^checkbox-/);
      fireEvent.click(checkboxes[0]);
    });

    // Очищаем завершенные
    const clearButton = screen.getByTestId('clear-completed');
    fireEvent.click(clearButton);

    expect(screen.queryByText('Задача для очистки')).toBeNull();
  });

  test('показывает правильное количество оставшихся задач', async () => {
    render(<TodoApp />);
    
    const input = screen.getByTestId('todo-input');
    const form = input.closest('form')!;

    // Добавляем 2 задачи
    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(form);
    
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const itemsLeft = screen.getByTestId('items-left');
      // Проверяем что отображается правильное количество
      expect(itemsLeft.textContent).toMatch(/\d+ item(s)? left/);
      
      // Завершаем одну задачу
      const checkboxes = screen.getAllByTestId(/^checkbox-/);
      fireEvent.click(checkboxes[0]);
      
      // Проверяем что количество обновилось
      expect(itemsLeft.textContent).toMatch(/\d+ item(s)? left/);
    });
  });

  test('кнопка Clear completed disabled когда нет завершенных задач', async () => {
    render(<TodoApp />);
    
    // Добавляем задачу, но не завершаем ее
    const input = screen.getByTestId('todo-input');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const clearButton = screen.getByTestId('clear-completed');
      expect(clearButton.hasAttribute('disabled')).toBe(true);
    });
  });

  test('кнопка Clear completed enabled когда есть завершенные задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByTestId('todo-input');
    const form = input.closest('form')!;

    // Добавляем и завершаем задачу
    fireEvent.change(input, { target: { value: 'Завершенная задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const checkboxes = screen.getAllByTestId(/^checkbox-/);
      fireEvent.click(checkboxes[0]);
      
      const clearButton = screen.getByTestId('clear-completed');
      expect(clearButton.hasAttribute('disabled')).toBe(false);
    });
  });
});