import { IconDelete, IconDescription, IconEdit, IconSelectTask } from './Icons';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

interface TaskPreviewProps {
  tarea: Tarea | null;
}

export default function TaskPreview({ tarea }: TaskPreviewProps) {
  if (!tarea) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[var(--background-secondary)] rounded-3xl border border-white/5 shadow-inner p-6">
        <div className="text-center space-y-4 opacity-40 max-w-md">
            <IconSelectTask className="w-24 h-24 mx-auto" />
          <p className="text-xl font-medium">Selecciona una tarea de la lista para ver sus detalles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-[var(--background-secondary)] rounded-3xl p-8 shadow-2xl border border-white/5 relative overflow-hidden transition-all duration-300">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 pb-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
                    Tarea #{tarea.id}
                </span>
                <span className="text-xs text-gray-500 font-mono">ID: {tarea.id}</span>
            </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">{tarea.titulo}</h2>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar pr-4 -mr-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <IconDescription className="w-4 h-4" />
            Descripción
          </h3>
          <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap font-light">
            {tarea.descripcion}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex justify-end gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all duration-200 text-sm font-medium border border-white/5 hover:border-white/10 flex items-center gap-2">
                <IconEdit className="w-4 h-4" />
                Editar
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200 text-sm font-medium border border-red-500/10 hover:border-red-500/20 flex items-center gap-2">
                <IconDelete className="w-4 h-4" />
                Eliminar
            </button>
        </div>
      </div>
    </div>
  );
}
