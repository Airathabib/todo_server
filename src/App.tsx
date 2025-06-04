import { useEffect, useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import InputTodo from './components/InpitTodo/InputTodo';
import CheckedBtn from './components/CheckedBtn/CheckedBtn';
import { StateTodo, Todo } from './interfaces/interface';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, newTodo } from './store/todoSlice';
import { AppDispatch } from './store/index';

import './App.css';

/**
 * Основной компонент приложения.
 * Отображает ввод для добавления новых задач, флажок для выбора типа задач,
 * информацию о количестве задач и выполненных задачах, а также список задач.
 * @returns {React.ReactElement} JSX компонент.
 */

function App(): React.ReactElement {
  const [title, setTitle] = useState<string>('');
  const [done, setDone] = useState<string>('');

  // получение состояния загрузки и ошибки
  const { error, loading }: StateTodo = useSelector(
    (state: { todos: StateTodo }) => state.todos
  );

  // получение списка задач
  const todos: Todo[] = useSelector(
    (state: { todos: StateTodo }) => state.todos.todos
  );

  // диспатч
  const dispatch = useDispatch<AppDispatch>();

  let copyTasks = todos;

  /**
   * При монтировании компонента диспатчится экшн fetchTodos.
   */
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  /**
   * Создает новую задачу.
   * Если текст задачи не пуст, то диспатчится экшн newTodo.
   * Очищает input для ввода задачи.
   */
  const addTask = async () => {
    if (title.trim() === '') return;
    dispatch(newTodo(title));
    setTitle('');
  };

  // фильтр для выполненных, не выполненных и всех задач
  const activeTasks = todos.filter(
    (task: { completed: boolean }) => task.completed === false
  );

  const completedTasks = todos.filter(
    (task: { completed: boolean }) => task.completed === true
  );

  const tasks = [...activeTasks, ...completedTasks];

  // выбор типа задач
  switch (done) {
    case 'All':
      copyTasks = tasks;
      break;
    case 'Active':
      copyTasks = tasks.filter((task) => task.completed === false);
      break;
    case 'Completed':
      copyTasks = tasks.filter((task) => task.completed === true);
      break;
    default:
      break;
  }

  return (
    <div className='container' data-testid='App'>
      <h1 className='title'>Список задач</h1>
      <InputTodo
        handleSubmit={addTask}
        title={title}
        handleInput={setTitle}
        id=''
        completed={false}
      />
      <CheckedBtn
        tasks={copyTasks}
        setDone={setDone}
        activeTasks={activeTasks}
        completedTasks={completedTasks}
      />
      <>
        {' '}
        <div className={'info'}>
          {todos.length ? (
            <>
              <h3>Количество задач: {activeTasks.length}</h3>
              <h3>Количество выполненных задач: {completedTasks.length}</h3>
            </>
          ) : (
            ''
          )}

          <h3>{!tasks.length ? 'Список задач пуст' : ''}</h3>
        </div>
        {loading && <h2 className='loader'>Loading...</h2>}
        {error && <h2 className='error'>{error}</h2>}
        <TodoList todos={copyTasks} data-testid='TodoList' />
      </>{' '}
    </div>
  );
}

export default App;
