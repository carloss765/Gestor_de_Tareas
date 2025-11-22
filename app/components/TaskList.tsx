interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

interface TaskListProps {
  tareas: Tarea[];
  onSelectTask: (tarea: Tarea) => void;
}

export default function TaskList({ tareas, onSelectTask }: TaskListProps) {
  return (
    <ul className="flex items-center flex-col overflow-y-auto custom-scrollbar px-2 w-full h-full">
      {tareas.map((t: Tarea, index: number) => (
        <div
          className={`m-0.5 w-full max-w-md justify-center items-center py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
            index % 2 === 0 ? 'bg-white/5 hover:bg-white/10' : 'bg-white/10 hover:bg-white/15'
          }`}
          key={t.id}
        >
          <li
            className="cursor-pointer text-center w-full h-full outline-none focus:text-blue-400 transition-colors"
            tabIndex={0}
            onFocus={() => onSelectTask(t)}
            onClick={() => onSelectTask(t)} // Added onClick for better UX
          >
            <span className="font-medium text-lg">{t.titulo}</span>
          </li>
        </div>
      ))}
    </ul>
  );
}
