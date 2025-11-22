import { useEffect, useState } from 'react';
import { IconCancel, IconDelete, IconDescription, IconEdit, IconSave, IconSelectTask } from './Icons';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

interface TaskPreviewProps {
  tarea: Tarea | null;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export default function TaskPreview({ tarea, onDelete, onUpdate }: TaskPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (tarea) {
      setTitle(tarea.titulo);
      setDescription(tarea.descripcion);
      setIsEditing(false);
    }
  }, [tarea]);

  const handleDelete = async () => {
    if (!tarea) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        const res = await fetch(`/api/tareas?id=${tarea.id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          if (onDelete) onDelete();
        } else {
          console.error('Error al eliminar la tarea');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSave = async () => {
    if (!tarea) return;

    try {
      const res = await fetch(`/api/tareas?id=${tarea.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: title,
          descripcion: description,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        if (onUpdate) onUpdate();
      } else {
        console.error('Error al actualizar la tarea');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-3xl md:text-4xl font-bold text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="Título de la tarea"
                />
            ) : (
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">{tarea.titulo}</h2>
            )}
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar pr-4 -mr-2 flex flex-col">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <IconDescription className="w-4 h-4" />
            Descripción
          </h3>
          {isEditing ? (
              <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg text-gray-300 leading-relaxed focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                  placeholder="Descripción de la tarea"
              />
          ) : (
              <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap font-light">
                {tarea.descripcion}
              </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex justify-end gap-3">
            {isEditing ? (
                <>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all duration-200 text-sm font-medium border border-white/5 hover:border-white/10 flex items-center gap-2"
                    >
                        <IconCancel className="w-4 h-4" />
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 transition-all duration-200 text-sm font-medium border border-blue-500/20 hover:border-blue-500/30 flex items-center gap-2"
                    >
                        <IconSave className="w-4 h-4" />
                        Guardar
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all duration-200 text-sm font-medium border border-white/5 hover:border-white/10 flex items-center gap-2"
                    >
                        <IconEdit className="w-4 h-4" />
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200 text-sm font-medium border border-red-500/10 hover:border-red-500/20 flex items-center gap-2"
                    >
                        <IconDelete className="w-4 h-4" />
                        Eliminar
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
}
