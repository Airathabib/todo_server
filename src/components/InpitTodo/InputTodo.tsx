import React from 'react';
import { InputProps } from '../../interfaces/interface';
import styles from './Input.module.scss';

/**
 * Компонент InputTodo отображает поле ввода и кнопку отправки для добавления новых задач.
 *
 * @param {InputProps} props - Пропсы для компонента.
 * @param {string} props.title - Текущее входное значение задачи.
 * @param {(text: string) => void} props.handleInput - Функция обработки изменений в поле ввода.
 * @param {() => void} props.handleSubmit - Функция обработки отправки новой задачи.
 * @returns {JSX.Element} JSX-элемент компонента InputTodo.
 */
const InputTodo: React.FC<InputProps> = ({
  title,
  handleInput,
  handleSubmit,
}) => {
  return (
    // обертка
    <div className={styles.Wrapper}>
      <input
        className={styles.Input}
        type='text'
        value={title}
        onChange={(e) => handleInput(e.target.value)}
        placeholder='Введите задачу'
      />
      <button
        className={
          title.trim() === '' ? styles.InputBtnDisabled : styles.InputBtn
        }
        onClick={() => handleSubmit()}
        disabled={title.trim() === ''}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      >
        Добавить задачу
      </button>
    </div>
  );
};

export default InputTodo;
