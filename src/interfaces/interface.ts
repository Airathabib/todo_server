export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  addTask?: () => Promise<Todo>;
  deleTask?: (id: string) => Promise<Todo>;
  toggleTask?: (id: string) => Promise<Todo>;
  updateTask?: (id: string) => Promise<Todo>;
};

export type StateTodo = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}

export type Props = {
  setDone: React.Dispatch<React.SetStateAction<string>>;
  activeTasks: Todo[];
  completedTasks: Todo[];
  tasks: Todo[];
};

export type InputProps = {
  handleInput: (text: string) => void;
  handleSubmit: () => void;
  id: string;
  title: string;
  completed: boolean;
};
