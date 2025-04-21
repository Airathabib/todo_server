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
const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <div className={styles.TodoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
