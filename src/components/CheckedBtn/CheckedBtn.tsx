import React from 'react';
import { deleteTodo } from '../../store/todoSlice';
import { Props } from '../../interfaces/interface';
import styles from './CheckedBtn.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index';

/**
 * Компонент CheckedBtn отображает контейнер с кнопками
 * для фильтрации и удаления выполненных задач.
 *
 * @param {Object} props - объект props.
 * @param {Todo[]} props.tasks - массив объектов todo для фильтрации.
 * @param {Function} props.setDone - функция для установки состояния выполненных задач.
 * @param {Todo[]} props.activeTasks - массив объектов todo для активных задач.
 * @param {Todo[]} props.completedTasks - массив объектов todo для выполненных задач.
 *
 * @returns {React.ReactElement} JSX-элемент компонента CheckedBtn.
 */
const CheckedBtn: React.FC<Props> = ({
  tasks,
  setDone,
  activeTasks,
  completedTasks,
}) => {
  // диспатч
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Функция для удаления выполненных задач.
   * При вызове функции, если есть выполненные задачи,
   * отображается диалоговое окно для подтверждения удаления.
   * Если пользователь подтверждает удаление, то функция
   * диспатчит эшн deleteTodo для каждого выполненного задания,
   * передавая id задания.
   */
  async function delTasks() {
    if (tasks === undefined) return;
    const approve = confirm(
      'Вы действительно хотите удалить выполненные задачи?'
    );
    if (!approve) return;
    await tasks.forEach((task) => {
      if (task.completed === true) {
        dispatch(deleteTodo(task.id));
      }
    });
  }

  return (
    // Компонент отображает кнопки для фильтрации и удаления выполненных задач
    <div className={styles.Wrapper}>
      <button
        className={tasks.length === 0 ? styles.BtnDisabled : styles.Btn}
        disabled={tasks.length === 0}
        onClick={() => setDone('All')}
      >
        Все
      </button>

      <button
        className={activeTasks.length === 0 ? styles.BtnDisabled : styles.Btn}
        disabled={activeTasks.length === 0}
        onClick={() => setDone('Active')}
      >
        Активные
      </button>

      <button
        className={
          completedTasks.length === 0 ? styles.BtnDisabled : styles.Btn
        }
        disabled={completedTasks.length === 0}
        onClick={() => setDone('Completed')}
      >
        Выполненные
      </button>

      <button
        className={
          completedTasks.length === 0 ? styles.BtnDisabled : styles.Btn
        }
        disabled={completedTasks.length === 0}
        onClick={() => delTasks()}
      >
        Удалить выполненные
      </button>
    </div>
  );
};

export default CheckedBtn;
