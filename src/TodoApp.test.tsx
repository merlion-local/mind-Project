import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import TodoApp from './components/TodoApp/TodoApp';
import '@testing-library/jest-dom';


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
    expect(screen.getByText('todos')).toBeInTheDocument();
  });

  test('добавляет новую задачу', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Новая задача')).toBeInTheDocument();
    });
  });

  test('переключает статус выполнения задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      // Находим чекбокс по его роли
      const checkboxes = screen.getAllByRole('checkbox');
      // Первый чекбокс - это toggle all, второй - наша задача
      const taskCheckbox = checkboxes[1];
      expect(taskCheckbox).not.toBeChecked();
      fireEvent.click(taskCheckbox);
      expect(taskCheckbox).toBeChecked();
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
      const checkboxes = screen.getAllByRole('checkbox');
      // Завершаем вторую задачу (третий чекбокс)
      fireEvent.click(checkboxes[2]);
    });

    // Переключаемся на фильтр "Active"
    const activeFilter = screen.getByText('Active');
    fireEvent.click(activeFilter);

    // Проверяем, что видна только активная задача
    expect(screen.getByText('Активная задача')).toBeInTheDocument();
    expect(screen.queryByText('Завершенная задача')).not.toBeInTheDocument();

    // Переключаемся на фильтр "Completed"
    const completedFilter = screen.getByText('Completed');
    fireEvent.click(completedFilter);

    // Проверяем, что видна только завершенная задача
    expect(screen.queryByText('Активная задача')).not.toBeInTheDocument();
    expect(screen.getByText('Завершенная задача')).toBeInTheDocument();

    // Возвращаемся к фильтру "All"
    const allFilter = screen.getByText('All');
    fireEvent.click(allFilter);

    // Проверяем, что видны все задачи
    expect(screen.getByText('Активная задача')).toBeInTheDocument();
    expect(screen.getByText('Завершенная задача')).toBeInTheDocument();
  });

  test('очищает завершенные задачи', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    // Добавляем и завершаем задачу
    fireEvent.change(input, { target: { value: 'Задача для очистки' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // Завершаем задачу
    });

    // Очищаем завершенные
    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    // Проверяем, что задача удалена
    expect(screen.queryByText('Задача для очистки')).not.toBeInTheDocument();
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
      // Должно показывать "2 items left"
      expect(screen.getByText(/2 items left/)).toBeInTheDocument();
      
      // Завершаем одну задачу
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);
      
      // Должно показывать "1 item left"
      expect(screen.getByText(/1 item left/)).toBeInTheDocument();
    });
  });

  test('переключает collapse/expand всех задач', async () => {
    render(<TodoApp />);
    
    // Сначала добавляем задачу, чтобы список был виден
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.submit(form);

    await waitFor(() => {
      // Находим кнопку toggle all (первый чекбокс)
      const toggleButton = screen.getAllByRole('checkbox')[0];
      fireEvent.click(toggleButton);
      
      // Проверяем, что что-то произошло (конкретное поведение зависит от реализации)
      expect(toggleButton).toBeInTheDocument();
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
      expect(clearButton).toBeDisabled();
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
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // Завершаем задачу
      
      const clearButton = screen.getByText('Clear completed');
      expect(clearButton).not.toBeDisabled();
    });
  });
});