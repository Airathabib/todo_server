import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleStatus, updateTask } from '../../store/todoSlice';
import { Todo } from '../../interfaces/interface';
import { AppDispatch } from '../../store';

import styles from './TodoItem.module.scss';

/**
 * Компонент TodoItem представляет собой отдельный элемент todo с функциями редактирования и удаления.
 *
 * @param {Object} props - Объект пропсов.
 * @param {string} props.id - Уникальный идентификатор элемента списка дел.
 * @param {string} props.title - Заголовок элемента списка дел.
 * @param {boolean} props.completed - Флаг, указывающий на выполненность элемента списка дел.
 *
 * @returns {React.ReactElement} JSX-элемент компонента TodoItem.
 */
const TodoItem: React.FC<Todo> = ({ id, title, completed }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  // открытие редактирования
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef.current?.focus();
    }
  }, [isEditMode]);

  /**
   * Обработчик события, вызываемый при изменении текста TodoItem в режиме редактирования.
   *
   * Если текст пустой, то режим редактирования выключается.
   *
   * В противном случае, текст TodoItem обновляется,
   * и modeEdit выключается.
   */
  const handleUpdateText = () => {
    if (editTitle === '') return setIsEditMode(false);
    if (editTitleInputRef.current) {
      setEditTitle(editTitleInputRef.current.value.trim());
      dispatch(
        updateTask({
          id,
          title: editTitleInputRef.current.value,
          completed: false,
        } as Todo)
      );
      setIsEditMode(false);
    }
  };

  /**
   * Удаляет задачу после подтверждения пользователем.
   *
   * @param {string} id - Уникальный идентификатор задачи, которую нужно удалить.
   * @returns {void}
   */
  const delTodo = (id: string) => {
    const approve = confirm('Вы действительно хотите удалить задачу?');
    if (approve) return dispatch(deleteTodo(id));
  };

  return (
    // обертка
    <div className={styles.TasksWrapper}>
      <div key={id} className={styles.InputWrapper}>
        <div className={styles.Info}>
          <div className={styles.CheckboxWrapper}>
            {/* чекбокс */}
            <label className={styles.InputLabel}>
              <input
                className={styles.InputChecked}
                disabled={isEditMode}
                type='checkbox'
                checked={completed}
                onChange={() => dispatch(toggleStatus(id))}
              />
              <span className={styles.Checkmark}></span>
            </label>
          </div>
          {/* заголовок */}
          {!isEditMode ? (
            <p className={completed ? styles.InputTaskDone : styles.InputTask}>
              {title}
            </p>
          ) : (
            <input
              className={styles.InputTaskEdit}
              ref={editTitleInputRef}
              type='text'
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          )}
          {/* кнопки */}
        </div>
        <div className={styles.InputStatusWrapper}>
          {isEditMode ? (
            // кнопка сохранить
            <button
              className={styles.InputTaskBtnSave}
              onClick={() => handleUpdateText()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M7 12l5 5l10 -10' />
                <path d='M2 12l5 5m5 -5l5 -5' />
              </svg>
            </button>
          ) : (
            // кнопка редактировать
            <button
              className={styles.InputTaskBtnEdit}
              onClick={() => setIsEditMode(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
                <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
                <path d='M16 5l3 3' />
              </svg>
            </button>
          )}
          {/* кнопка удалить */}
          <button
            className={styles.InputBtn}
            disabled={isEditMode}
            onClick={() => delTodo(id)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 7l16 0' />
              <path d='M10 11l0 6' />
              <path d='M14 11l0 6' />
              <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
              <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
            </svg>
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
