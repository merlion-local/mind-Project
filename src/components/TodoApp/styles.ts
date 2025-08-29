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
  width: 100%;
  max-width: 550px;
  position: relative;
  
  /* Основная тень контейнера */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
  position: relative;
  z-index: 10;
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

export const TodoList = styled.ul<{ isCollapsed: boolean; itemCount: number }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${props => props.isCollapsed ? 'none' : 'block'};
  position: relative;
  
  /* Эффект стопки - тени для наложения */
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 2px;
    right: 2px;
    height: 5px;
    background: white;
    z-index: -1;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 1px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    bottom: ${props => Math.min(props.itemCount * 3, 15)}px;
    display: ${props => props.itemCount > 0 ? 'block' : 'none'};
  }
  
  &::after {
    bottom: ${props => Math.min(props.itemCount * 6, 30)}px;
    display: ${props => props.itemCount > 1 ? 'block' : 'none'};
  }
`;

export const TodoItem = styled.li<{ index: number; totalItems: number }>`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ededed;
  background: #fff;
  position: relative;
  z-index: ${props => props.totalItems - props.index};

  &:last-child {
    border-bottom: none;
    box-shadow: ${props => props.index === props.totalItems - 1 ? 
      '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  }

  /* Эффект тени для элементов стопки */
  box-shadow: 
    0 1px 0 rgba(0, 0, 0, 0.03),
    ${props => props.index < props.totalItems - 1 ? 
      '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none'};
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

export const Footer = styled.div<{ isCollapsed: boolean; hasItems: boolean }>`
  display: ${props => props.isCollapsed ? 'none' : 'flex'};
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  color: #777;
  font-size: 14px;
  position: relative;
  z-index: 5;
  min-height: 20px;
  box-shadow: 
    0 1px 1px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1);
  
  /* Дополнительные тени для эффекта стопки в футере */
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 2px;
    right: 2px;
    height: 5px;
    background: white;
    z-index: -1;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 1px rgba(0, 0, 0, 0.1);
    display: ${props => props.hasItems ? 'block' : 'none'};
  }
  
  &::before {
    bottom: -5px;
  }
  
  &::after {
    bottom: -10px;
  }
`;

export const ItemsLeft = styled.span`
  font-weight: 300;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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