import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import TodoApp from './components/TodoApp/TodoApp';

// Mock UUID
vi.mock('uuid', () => ({
  v4: vi.fn()
    .mockReturnValueOnce('test-uuid-1')
    .mockReturnValueOnce('test-uuid-2')
    .mockReturnValueOnce('test-uuid-3')
    .mockReturnValueOnce('test-uuid-4')
    .mockReturnValueOnce('test-uuid-5')
}));

describe('TodoApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('рендерит заголовок приложения', () => {
    render(<TodoApp />);
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
  });

  test('добавляет новую задачу', () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('Введите задачу...');
    const addButton = screen.getByText('Добавить');
    
    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Новая задача')).toBeInTheDocument();
  });

  test('переключает статус выполнения задачи', () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('Введите задачу...');
    const addButton = screen.getByText('Добавить');
    
    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);
    
    const taskText = screen.getByText('Тестовая задача');
    fireEvent.click(taskText);
    
    expect(taskText).toHaveStyle('text-decoration: line-through');
  });

  test('удаляет задачу', () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('Введите задачу...');
    const addButton = screen.getByText('Добавить');
    
    fireEvent.change(input, { target: { value: 'Задача для удаления' } });
    fireEvent.click(addButton);
    
    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Задача для удаления')).not.toBeInTheDocument();
  });

  test('фильтрует задачи', () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('Введите задачу...');
    const addButton = screen.getByText('Добавить');
    
    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'Завершенная задача' } });
    fireEvent.click(addButton);
    
    const completedTask = screen.getByText('Завершенная задача');
    fireEvent.click(completedTask);
    
    const activeFilter = screen.getByText('Активные');
    fireEvent.click(activeFilter);
    
    expect(screen.getByText('Активная задача')).toBeInTheDocument();
    expect(screen.queryByText('Завершенная задача')).not.toBeInTheDocument();
  });

  test('очищает завершенные задачи', () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('Введите задачу...');
    const addButton = screen.getByText('Добавить');
    
    fireEvent.change(input, { target: { value: 'Задача для очистки' } });
    fireEvent.click(addButton);
    
    const task = screen.getByText('Задача для очистки');
    fireEvent.click(task);
    
    const clearButton = screen.getByText(/Очистить завершенные/);
    fireEvent.click(clearButton);
    
    expect(screen.queryByText('Задача для очистки')).not.toBeInTheDocument();
  });
});