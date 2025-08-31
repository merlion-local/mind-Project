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

  @media (max-width: 768px) {
    padding: 30px 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px 15px;
    box-sizing: border-box;
  }
`;

export const MainTitle = styled.h1`
  color: #cc9a9a;
  font-size: 80px;
  font-weight: 200;
  margin: 0 0 40px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 60px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
    margin-bottom: 20px;
  }
`;

export const Container = styled.div`
  background: white;
  border-radius: 0;
  width: 100%;
  max-width: 550px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 12px;
  }
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
  flex-shrink: 0;
  
  &:hover {
    color: #cc9a9a;
  }
  
  &::after {
    content: '❯';
    transform: ${props => props.isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)'};
    display: block;
    transition: transform 0.2s;
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
    font-size: 18px;
    margin-right: 8px;
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
  min-width: 0;
  
  &::placeholder {
    color: #e6e6e6;
    font-style: italic;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 16px;
    
    &::placeholder {
      font-size: 16px;
    }
  }
`;

export const TodoList = styled.ul<{ isCollapsed: boolean; itemCount: number }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${props => props.isCollapsed ? 'none' : 'block'};
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 4px;
    right: 4px;
    height: 8px;
    background: white;
    z-index: -1;
    box-shadow: 
      0 3px 10px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    bottom: ${props => Math.min(props.itemCount * 4, 20)}px;
    display: ${props => props.itemCount > 0 ? 'block' : 'none'};
    height: 10px;
    left: 6px;
    right: 6px;
  }
  
  &::after {
    bottom: ${props => Math.min(props.itemCount * 8, 40)}px;
    display: ${props => props.itemCount > 1 ? 'block' : 'none'};
    height: 12px;
    left: 8px;
    right: 8px;
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.12),
      0 2px 5px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    &::before,
    &::after {
      display: none;
    }
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
      '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'};
  }

  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    ${props => props.index < props.totalItems - 1 ? 
      '0 4px 12px rgba(0, 0, 0, 0.12)' : 'none'};

  @media (max-width: 480px) {
    padding: 12px 16px;
    box-shadow: none;
    
    &:last-child {
      box-shadow: none;
    }
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
  flex-shrink: 0;

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

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
    margin-right: 10px;

    &::after {
      font-size: 16px;
    }
  }
`;

export const TodoText = styled.span<TodoTextProps>`
  flex: 1;
  color: ${props => props.completed ? '#d9d9d9' : '#4d4d4d'};
  font-size: 24px;
  font-weight: 300;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  transition: color 0.3s;
  word-break: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
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
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.1);
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 6px;
    right: 6px;
    height: 10px;
    background: white;
    z-index: -1;
    box-shadow: 
      0 3px 12px rgba(0, 0, 0, 0.15),
      0 1px 4px rgba(0, 0, 0, 0.1);
    display: ${props => props.hasItems ? 'block' : 'none'};
  }
  
  &::before {
    bottom: -10px;
  }
  
  &::after {
    bottom: -20px;
    left: 10px;
    right: 10px;
    height: 12px;
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.12),
      0 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    flex-direction: column;
    gap: 16px;
    
    &::before,
    &::after {
      display: none;
    }
    
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const ItemsLeft = styled.span`
  font-weight: 300;
  white-space: nowrap;

  @media (max-width: 768px) {
    flex: 1;
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: static;
    transform: none;
    flex: 1;
    justify-content: center;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    gap: 6px;
  }
`;

export const FilterButton = styled.button<FilterButtonProps>`
  padding: 6px 12px;
  background: transparent;
  color: ${props => props.active ? '#6c6c6c' : '#777'};
  border: 1px solid ${props => props.active ? 'rgba(175, 47, 47, 0.3)' : 'transparent'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 300;
  white-space: nowrap;
  
  &:hover {
    border-color: ${props => props.active ? 'rgba(175, 47, 47, 0.3)' : 'rgba(175, 47, 47, 0.1)'};
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 13px;
    min-width: 60px;
  }
`;

export const ClearButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  color: #777;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 300;
  white-space: nowrap;
  
  &:hover {
    text-decoration: underline;
    background: rgba(0, 0, 0, 0.03);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      text-decoration: none;
      background: transparent;
    }
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: right;
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    padding: 8px;
  }
`;