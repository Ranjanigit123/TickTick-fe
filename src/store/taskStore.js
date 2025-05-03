//taskStore.js
import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    set({ tasks: data });
  },
  addTask: async (task) => {
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
  },
  deleteTask: async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
}));
export default useTaskStore;