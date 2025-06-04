import { StateTodo, Todo } from '../../interfaces/interface';

describe('Test Selectors', () => {
  const selectTodos = (state: StateTodo) => state.todos;

  it('should return todos', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
      { id: '3', title: 'Task 3', completed: false },
    ];
    const state: StateTodo = { todos, loading: false, error: null };
    expect(selectTodos(state)).toEqual(todos);
  });
});
