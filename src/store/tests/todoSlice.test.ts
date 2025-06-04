import todoReducer, { addTask, toggleTodoCompleted, updateTaskText, deleteTask } from '../todoSlice';


describe('todoSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = todoReducer(undefined, { type: '' });
    expect(result).toEqual({
      todos: [],
      loading: false,
      error: null,
    });
  });
  it('should a new todo item with "addTsk" action', () => {
    const action = {
      type: addTask.type,
      payload: { id: '1', title: 'Task 1', completed: false },
    };
    const state = {
      todos: [],
      loading: false,
      error: null,
    };
    const result = todoReducer(state, action);
    expect(result).toEqual({
      todos: [{ id: '1', title: 'Task 1', completed: false }],
      loading: false,
      error: null,
    });
  });
  it('should toggle todo completed status with "toggleTodoCompleted" action', () => {
		const action = {
			type: toggleTodoCompleted.type,
			payload: { id: '1', title: 'Task 1', completed: false },
		};
		const state = {
			todos: [{ id: '1', title: 'Task 1', completed: false }],
			loading: false,
			error: null,
		};
		const result = todoReducer(state, action);
		expect(result).toEqual({
			todos: [{ id: '1', title: 'Task 1', completed: true }],
			loading: false,
			error: null,
		});
  });
	it('should update todo title status with "updateTaskText" action', () => {
		const action = {
			type: updateTaskText.type,
			payload: { id: '1', title: 'Task 2', completed: false },
		};
		const state = {
			todos: [{ id: '1', title: 'Task 2', completed: false }],
			loading: false,
			error: null,
		};
		const result = todoReducer(state, action);
		expect(result).toEqual({
			todos: [{ id: '1', title: 'Task 2', completed: false }],
			loading: false,
			error: null,
		});
	});
	it('should delete todo by id with "deleteTask" action', () => {
		const action = {
			type: deleteTask.type,
			payload: { id: '1', title: 'Task 2', completed: false },
		};
		const state = {
			todos: [{ id: '1', title: 'Task 2', completed: false }],
			loading: false,
			error: null,
		};
		const result = todoReducer(state, action);
		expect(result).toEqual({
			todos: [],
			loading: false,
			error: null,
		});
	})
});
