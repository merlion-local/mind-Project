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
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 60px 20px 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

export const MainTitle = styled.h1`
  color: #cc9a9a;
  font-size: 80px;
  font-weight: 200;
  margin: 0 0 40px 0;
  text-align: center;
`;

export const Container = styled.div`
  background: white;
  border-radius: 0;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: -1;
  }
  
  &::before {
    height: 5px;
    bottom: -5px;
    left: 4px;
    right: 4px;
  }
  
  &::after {
    height: 10px;
    bottom: -10px;
    left: 8px;
    right: 8px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
  position: relative;
  z-index: 2;
`;

export const ToggleAllButton = styled.button<ToggleAllButtonProps>`
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: #e6e6e6;
  font-size: 22px;
  cursor: pointer;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    color: #cc9a9a;
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
  padding: 16px;
  border: none;
  border-radius: 0;
  font-size: 24px;
  outline: none;
  background: white;
  font-weight: 300;
  
  &::placeholder {
    color: #e6e6e6;
    font-style: italic;
    font-weight: 300;
  }
`;

export const TodoList = styled.ul<{ isCollapsed: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${props => props.isCollapsed ? 'none' : 'block'};
  position: relative;
  z-index: 1;
`;

export const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ededed;
  background: #fff;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`;

export const Checkbox = styled.span<CheckboxProps>`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid ${props => props.completed ? '#5dc2af' : '#e6e6e6'};
  border-radius: 50%;
  margin-right: 12px;
  position: relative;
  background: transparent;
  cursor: pointer;

  &::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.completed ? '#5dc2af' : 'transparent'};
    font-size: 18px;
    font-weight: bold;
  }
`;

export const TodoText = styled.span<TodoTextProps>`
  flex: 1;
  color: ${props => props.completed ? '#d9d9d9' : '#4d4d4d'};
  font-size: 24px;
  font-weight: 300;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  transition: color 0.3s;
`;

export const Footer = styled.div<{ isCollapsed: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'flex'};
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  color: #777;
  font-size: 14px;
  position: relative;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 100%);
  }
`;

export const ItemsLeft = styled.span`
  font-weight: 300;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const FilterButton = styled.button<FilterButtonProps>`
  padding: 4px 8px;
  background: transparent;
  color: ${props => props.active ? '#6c6c6c' : '#777'};
  border: 1px solid ${props => props.active ? 'rgba(175, 47, 47, 0.2)' : 'transparent'};
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 300;
  
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
  font-weight: 300;
  
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