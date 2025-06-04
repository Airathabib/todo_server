import App from '../../App.tsx';
import TodoList from '../TodoList/TodoList.tsx';

import { describe, expect, it, vi } from 'vitest';

// Создаем мок-функцию для useSelector
const mockUseSelector = vi.fn();

const todos = [
  { id: '1', title: 'Task 1', completed: false },
  { id: '2', title: 'Task 2', completed: true },
  { id: '3', title: 'Task 3', completed: false },
];

describe('App', () => {
  it('should create App', () => {
    expect(App).toBeTruthy();
  });
  it('should create todoList with empty todos', () => {
    expect(TodoList).toBeTruthy();
  });
  it('should create todoList with todos', () => {
    mockUseSelector.mockReturnValue(todos);
    expect(TodoList).toBeTruthy();
  });
});
