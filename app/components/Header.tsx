import { FilePlusCorner } from 'lucide-react';
import { useState } from "react";
import CrearTarea from "./CrearTarea";

interface HeaderProps {
    onTareaCreated?: () => void
}

export default function Header({ onTareaCreated }: HeaderProps) {
    const [showCrearTarea, setShowCrearTarea] = useState(false)

    return (
        <div className="flex items-center justify-between p-2">
            <h1 className="text-2xl font-bold">Tareas</h1>
            <button
                className="relative bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
                onClick={() => setShowCrearTarea(true)}
            >
                <FilePlusCorner />
            </button>

            {showCrearTarea && (
                <CrearTarea
                    setShowCrearTarea={setShowCrearTarea}
                    onTareaCreated={onTareaCreated}
                />
            )}

        </div>
    )
}
