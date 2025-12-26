import { useViewTransition } from '@/app/hooks/useViewTransition';
import { FilePlusCorner } from 'lucide-react';
import { useRef, useState } from "react";
import CrearTarea from "./CrearTarea";


interface HeaderProps {
    onTareaCreated?: () => void
}

export default function Header({ onTareaCreated }: HeaderProps) {
    const [showCrearTarea, setShowCrearTarea] = useState(false)

    const dialogRef = useRef<HTMLDialogElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const { openWithTransition, closeWithTransition } = useViewTransition()

    const handleOpenDialog = async () => {
        setShowCrearTarea(true)
        // Esperar al próximo frame para que el dialog se renderice
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined))))
        if (dialogRef.current && buttonRef.current) {
            await openWithTransition(dialogRef.current, buttonRef.current)
        }
    }

    const handleCloseDialog = async () => {
        if (dialogRef.current && buttonRef.current) {
            await closeWithTransition(dialogRef.current, buttonRef.current)
        }
        setShowCrearTarea(false)
    }

    return (
        <div className="flex items-center justify-between p-2">
            <h1 className="text-2xl font-bold">Tareas</h1>
            <button
                ref={buttonRef}
                className="relative bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
                onClick={handleOpenDialog}
            >
                <FilePlusCorner />
            </button>

            {showCrearTarea && (
                <CrearTarea
                    ref={dialogRef}
                    id="dialog-messages"
                    onClose={handleCloseDialog}
                    onTareaCreated={onTareaCreated}
                />
            )}

        </div>
    )
}
