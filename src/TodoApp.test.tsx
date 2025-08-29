import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import TodoApp from './components/TodoApp/TodoApp';


// Mock UUID
vi.mock('uuid', () => ({
  v4: vi.fn()
    .mockReturnValueOnce('test-id-1')
    .mockReturnValueOnce('test-id-2')
    .mockReturnValueOnce('test-id-3')
}));

describe('TodoApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('рендерит заголовок приложения', () => {
    render(<TodoApp />);
    expect(screen.getByText('todos')).toBeDefined();
  });

  test('добавляет новую задачу', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Новая задача')).toBeDefined();
    });
  });

  test('переключает статус выполнения задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      const taskCheckbox = checkboxes[1];
      
      // Вместо toBeChecked используем проверку свойства checked
      expect(taskCheckbox.checked).toBe(false);
      fireEvent.click(taskCheckbox);
      expect(taskCheckbox.checked).toBe(true);
    });
  });

  test('фильтрует задачи по статусу', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    // Добавляем активную задачу
    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.submit(form);

    // Добавляем и завершаем вторую задачу
    fireEvent.change(input, { target: { value: 'Завершенная задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      fireEvent.click(checkboxes[2]);
    });

    // Переключаемся на фильтр "Active"
    const activeFilter = screen.getByText('Active');
    fireEvent.click(activeFilter);

    // Проверяем, что видна только активная задача
    expect(screen.getByText('Активная задача')).toBeDefined();
    expect(screen.queryByText('Завершенная задача')).toBeNull();

    // Переключаемся на фильтр "Completed"
    const completedFilter = screen.getByText('Completed');
    fireEvent.click(completedFilter);

    // Проверяем, что видна только завершенная задача
    expect(screen.queryByText('Активная задача')).toBeNull();
    expect(screen.getByText('Завершенная задача')).toBeDefined();
  });

  test('очищает завершенные задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    // Добавляем и завершаем задачу
    fireEvent.change(input, { target: { value: 'Задача для очистки' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      fireEvent.click(checkboxes[1]);
    });

    // Очищаем завершенные
    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    // Проверяем, что задача удалена
    expect(screen.queryByText('Задача для очистки')).toBeNull();
  });

  test('показывает правильное количество оставшихся задач', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    // Добавляем 2 задачи
    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(form);
    
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/2 items left/)).toBeDefined();
      
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      fireEvent.click(checkboxes[1]);
      
      expect(screen.getByText(/1 item left/)).toBeDefined();
    });
  });

  test('кнопка Clear completed disabled когда нет завершенных задач', async () => {
    render(<TodoApp />);
    
    // Добавляем задачу, но не завершаем ее
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const clearButton = screen.getByText('Clear completed');
      // Вместо toBeDisabled проверяем атрибут disabled
      expect(clearButton.hasAttribute('disabled')).toBe(true);
    });
  });

  test('кнопка Clear completed enabled когда есть завершенные задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    // Добавляем и завершаем задачу
    fireEvent.change(input, { target: { value: 'Завершенная задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
      fireEvent.click(checkboxes[1]);
      
      const clearButton = screen.getByText('Clear completed');
      expect(clearButton.hasAttribute('disabled')).toBe(false);
    });
  });
});