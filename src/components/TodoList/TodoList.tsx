import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';
import { Todo } from '../../interfaces/interface';

/**
 * Компонент TodoList отображает список задач.
 *
 * @param {Object} props — объект props.
 * @param {Todo[]} props.todos - Массив объектов todo для отображения.
 *
 * @returns {JSX.Element} JSX-элемент компонента TodoList.
 */
const TodoList: React.FC<{ todos: Todo[] }> = ({
  todos,
}: {
  todos: Todo[];
}) => {
  return (
    <div className={styles.TodoList}  data-testid='TodoList'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo}  data-testid='TodoItem'/>
      ))}
    </div>
  );
};

export default TodoList;
