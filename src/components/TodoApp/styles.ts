import styled from "@emotion/styled";

// Интерфейсы для пропсов
interface InputProps {
  hasError?: boolean;
}

interface TodoTextProps {
  completed: boolean;
}

interface FilterButtonProps {
  active?: boolean;
}

interface CheckboxProps {
  completed: boolean;
}

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

export const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 32px;
  width: 100%;
  max-width: 500px;
  margin-top: 60px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #2d3748;
  margin-bottom: 32px;
  font-size: 32px;
  font-weight: 300;
  letter-spacing: -0.5px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Input = styled.input<InputProps>`
  flex: 1;
  padding: 16px;
  border: 2px solid ${props => props.hasError ? '#e53e3e' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  background: #f7fafc;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53e3e' : '#4299e1'};
    background: white;
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(229, 62, 62, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const Button = styled.button`
  padding: 16px 24px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #3182ce;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TodoText = styled.span<TodoTextProps>`
  flex: 1;
  cursor: pointer;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#a0aec0' : '#2d3748'};
  font-size: 16px;
  padding: 4px 0;
  transition: all 0.2s;
  margin-right: 12px;

  &:hover {
    color: ${props => props.completed ? '#a0aec0' : '#4299e1'};
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.7;

  &:hover {
    background: #c53030;
    transform: scale(1.05);
    opacity: 1;
  }
`;

export const ErrorText = styled.span`
  color: #e53e3e;
  font-size: 14px;
  margin-top: 4px;
  display: block;
  margin-bottom: 16px;
  font-weight: 500;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<FilterButtonProps>`
  padding: 8px 16px;
  background: ${props => props.active ? '#4299e1' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: 2px solid ${props => props.active ? '#4299e1' : '#e2e8f0'};
  border-radius: 20px;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#3182ce' : '#f7fafc'};
    border-color: ${props => props.active ? '#3182ce' : '#cbd5e0'};
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f7fafc;
  border-radius: 8px;
  font-size: 14px;
  color: #4a5568;
  border: 1px solid #e2e8f0;
`;

export const ClearButton = styled.button`
  padding: 8px 16px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #c53030;
    transform: scale(1.05);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #a0aec0;
  font-style: italic;
`;

export const Checkbox = styled.span<CheckboxProps>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.completed ? '#4299e1' : '#cbd5e0'};
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  background: ${props => props.completed ? '#4299e1' : 'transparent'};
  transition: all 0.2s;
  flex-shrink: 0;

  &::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
    opacity: ${props => props.completed ? 1 : 0};
    transition: opacity 0.2s;
  }
`;