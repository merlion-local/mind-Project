import styled from "@emotion/styled";

// Интерфейсы для пропсов
interface TodoTextProps {
  completed: boolean;
}

interface FilterButtonProps {
  active?: boolean;
}

interface CheckboxProps {
  completed: boolean;
}

interface ToggleAllButtonProps {
  isCollapsed: boolean;
}

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

export const Container = styled.div`
  background: white;
  border-radius: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0;
  width: 100%;
  max-width: 550px;
  margin-top: 60px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #2d3748;
  margin: 0;
  padding: 16px;
  font-size: 24px;
  font-weight: 300;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
`;

export const ToggleAllButton = styled.button<ToggleAllButtonProps>`
  width: 30px;
  height: 30px;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  background: transparent;
  color: #a0aec0;
  font-size: 16px;
  cursor: pointer;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    border-color: #cbd5e0;
  }
  
  &::after {
    content: '❯';
    transform: ${props => props.isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)'};
    display: block;
    transition: transform 0.2s;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 0;
  font-size: 16px;
  outline: none;
  
  &::placeholder {
    color: #a0aec0;
    font-style: italic;
  }
`;

export const TodoList = styled.ul<{ isCollapsed: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${props => props.isCollapsed ? 'none' : 'block'};
`;

export const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

export const Checkbox = styled.span<CheckboxProps>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid ${props => props.completed ? '#4caf50' : '#e2e8f0'};
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  background: ${props => props.completed ? '#4caf50' : 'transparent'};
  cursor: pointer;

  &::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
    opacity: ${props => props.completed ? 1 : 0};
  }
`;

export const TodoText = styled.span<TodoTextProps>`
  flex: 1;
  color: ${props => props.completed ? '#a0aec0' : '#2d3748'};
  font-size: 16px;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

export const Footer = styled.div<{ isCollapsed: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'flex'};
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #e2e8f0;
  color: #777;
  font-size: 14px;
`;

export const ItemsLeft = styled.span`
  font-weight: 500;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const FilterButton = styled.button<FilterButtonProps>`
  padding: 4px 8px;
  background: transparent;
  color: ${props => props.active ? '#2d3748' : '#777'};
  border: 1px solid ${props => props.active ? 'rgba(175, 47, 47, 0.2)' : 'transparent'};
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }
`;

export const ClearButton = styled.button`
  padding: 4px 8px;
  background: transparent;
  color: #777;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      text-decoration: none;
    }
  }
`;