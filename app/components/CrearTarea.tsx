import { useState } from "react"

export default function CrearTarea({ setShowCrearTarea }: { setShowCrearTarea: (show: boolean) => void }) {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const submitTarea = async () => {
        const response = await fetch('http://localhost:3000/api/tareas', {
            method: 'POST',
            body: JSON.stringify({ titulo, descripcion }),
        })
        const data = await response.json()
        console.log(data)
        setShowCrearTarea(false)
        setTitulo('')
        setDescripcion('')
    }

    const handleClose = () => {
        setShowCrearTarea(false)
    }

    return (
        <div
            className="flex flex-col justify-center items-center w-180 h-full bg-black/30 text-white px-4 py-2 absolute top-0 left-0 backdrop-blur-md"
            onClick={handleClose}
        >
            <div
                className="grid grid-cols items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-full h-70 shadow-2xl p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-2">Crear Tarea</h2>
                <form onSubmit={submitTarea} className="grid grid-cols items-center justify-center gap-5 w-full">
                    <input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                    />
                    <button
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-white/30 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:scale-105 font-semibold"
                        type="submit"
                    >
                        Crear Tarea
                    </button>
                </form>
            </div>

        </div>
    )
}
