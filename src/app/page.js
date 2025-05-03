import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-200 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-900"> </h1>
      <TaskForm />
      <TaskList />
      </div>
    </main>
  );
}
