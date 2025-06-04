import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { URL } from '../shared/url';
import { StateTodo, Todo, TodoProps } from '../interfaces/interface';
import { WritableDraft } from 'immer';
import { RootState } from './index';

// функция для получения списка задач
export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { state: RootState }
>(
  'todos/fetchTodos',

  async function (_, { rejectWithValue }): Promise<Todo[]> {
    try {
      const response = await fetch(`${URL}`);
      if (!response.ok) {
        throw new Error(
          'Не удалось загрузить список задач, попробуйте обновить страницу'
        );
      }
      const result = await response.json();
      return result as Todo[];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// функция для добавления новой задачи
export const newTodo = createAsyncThunk<Todo, string, { state: RootState }>(
  'todos/newTodo',
  async function (title, { rejectWithValue, dispatch }): Promise<Todo> {
    try {
      const todo: Todo = {
        id: new Date().toISOString()!,
        title: title,
        completed: false,
      };
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error(
          'Не удалось добавить задачу, попробуйте обновить страницу'
        );
      }
      const data: Todo = (await response.json()) as Todo;
      dispatch(addTask(data) as PayloadAction<Todo>);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// функция для удаления задачи
export const deleteTodo = createAsyncThunk<[], string, { state: RootState }>(
  'todos/deleteTodo',
  async function (id, { rejectWithValue, dispatch }): Promise<[]> {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(
          'Не удалось удалить задачу, попробуйте обновить страницу'
        );
      }
      dispatch(
        deleteTask({
          id,
          title: '',
          completed: false,
        })
      );
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// функция для изменения статуса
export const toggleStatus = createAsyncThunk<
  Todo,
  string,
  { state: RootState }
>(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }): Promise<Todo> {
    const todo = getState().todos.todos.find(
      (todo: { id: string }) => todo.id === id
    ) as WritableDraft<Todo>;
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });
      if (!response.ok) {
        throw new Error(
          'Не удалось изменить статус задачи, попробуйте обновить страницу'
        );
      }
      dispatch(
        toggleTodoCompleted({
          id,
          title: '',
          completed: false,
        })
      ) as PayloadAction<Todo>;

      return todo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// функция для изменения текста
export const updateTask = createAsyncThunk(
  'todos/updateTask',
  async function (
    { id, title, completed }: TodoProps,
    { rejectWithValue, dispatch }
  ): Promise<Todo> {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title,
          completed: false,
        }),
      });
      if (!response.ok) {
        throw new Error(
          'Не удалось изменить текст задачи, попробуйте обновить страницу'
        );
      }
      dispatch(
        updateTaskText({ id, title, completed })
      ) as PayloadAction<TodoProps>;
      return { id, title, completed };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Обновляет состояние ошибки и устанавливает загрузку на значение false.
 *
 * @param {StateTodo} state -Текущее состояние среза задач.
 * @param {PayloadAction<string>} action - Действие, содержащее сообщение об ошибке.
 */

const setError = (state: StateTodo, action: unknown) => {
  state.loading = false;
  state.error = action.payload;
};

// создание среза
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as TodoProps[],
    loading: false,
    error: null,
  },
  // определение редьюсеров
  reducers: {
    /**
     *Добавляет новую задачу в список дел.
     *
     * @param {StateTodo} state - Текущее состояние среза задач.
     * @param {PayloadAction<TodoProps>} action - Действие, содержащее новую задачу для добавления,
     * представлено как объект TodoProps.
     */
    addTask: (state: StateTodo, action: PayloadAction<TodoProps>) => {
      state.todos.push(action.payload as WritableDraft<Todo>);
    },

    toggleTodoCompleted(state, action: PayloadAction<TodoProps>) {
      const todo = state.todos.find(
        (todo: { id: string }) => todo.id === action.payload.id
      );
      if (todo) todo.completed = !todo.completed;
    },

    /**
     *Обновляет текст задачи.
     *
     * @param {StateTodo} state - Текущее состояние среза задач.
     * @param {PayloadAction<TodoProps>} action - Действие, содержащее текст и id задачи,
     * представлено как объект TodoProps.
     */
    updateTaskText: (state: StateTodo, action: PayloadAction<TodoProps>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) todo.title = action.payload.title;
      if (todo) todo.completed = action.payload.completed;
    },

    /**
     *Удаляет задачу из списка дел.
     *
     * @param {StateTodo} state - Текущее состояние среза задач.
     * @param {PayloadAction<Todo>} action - Действие, содержащее id задачи,
     * которую нужно удалить, представлено как объект Todo.
     */
    deleteTask: (state: StateTodo, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(
        (task: { id: string }) => task.id !== action.payload.id
      );
    },
  },

  /**
Обрабатывает дополнительные действия для асинхронных thunk, связанных с todos.
*
* Использует шаблон builder для добавления редукторов case для каждого жизненного цикла действия thunk,
* обновляет состояние на основе типа действия и полезной нагрузки. В частности, он управляет
* статусом загрузки и сообщениями об ошибках для извлечения, добавления, удаления, переключения и
* обновления todos.
*
* - При `fetchTodos.fulfilled` обновляет состояние с извлеченными todos и сбрасывает
* состояния загрузки и ошибки.
* - При `fetchTodos.pending` устанавливает состояние загрузки на `true` и сбрасывает состояние ошибки.
* - В случаях `fetchTodos.rejected`, `deleteTodo.rejected`, `toggleStatus.rejected`, `newTodo.rejected`,
* и `updateTask.rejected` вызывает `setError` для обновления состояния ошибки с помощью полезной нагрузки действия.
*/
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.rejected, (state, action) =>
      setError(state, action)
    );
    builder.addCase(deleteTodo.rejected, (state, action) =>
      setError(state, action)
    );
    builder.addCase(toggleStatus.rejected, (state, action) =>
      setError(state, action)
    );
    builder.addCase(newTodo.rejected, (state, action) =>
      setError(state, action)
    );
    builder.addCase(updateTask.rejected, (state, action) =>
      setError(state, action)
    );
  },
});
// определение экшенов
export const { addTask, deleteTask, toggleTodoCompleted, updateTaskText } =
  todoSlice.actions;
// определение редьюсера
export default todoSlice.reducer;

/**
 * Выбирает все задачи из состояния.
 *
 * @param {RootState} state - Глобальное состояние приложения.
 * @returns {Todo[]} Массив задач.os.
 */

//
export const selectTodos = (state: RootState): Todo[] => state.todos.todos;
