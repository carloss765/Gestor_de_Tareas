"use client"
import "@/app/globals.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskPreview from "./components/TaskPreview";

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

export default function Home() {

  const [tareas, setTareas] = useState<Tarea[]>([])
  const [focusTarea, setFocusTarea] = useState<Tarea | null>(null)
  useEffect(() => {
    const fetchTareas = () => {
      fetch("http://localhost:3000/api/tareas")
        .then(res => res.json())
        .then(data => setTareas(data))
    }
    fetchTareas()
  }, [])

  return (
    <div className="grid grid-cols-2 items-center justify-center gap-2 h-screen w-screen p-4 bg-[var(--background)]">
      <div className="flex flex-col gap-2 h-full w-full overflow-hidden rounded-3xl bg-[var(--background-secondary)] p-4 shadow-xl border border-white/5">
        <Header />
        <ul className="flex items-center flex-col overflow-y-auto custom-scrollbar px-2 gap-2 w-full">
          {tareas.map((t: Tarea, index: number) => (
            <div
              className={`w-full flex justify-center items-center py-3 rounded-xl transition-all duration-200 hover:bg-white/5 ${focusTarea?.id === t.id ? 'bg-white/10 border border-white/10 shadow-lg' : 'bg-transparent'}`}
              key={t.id}
            >
              <li className="cursor-pointer text-center w-full h-full outline-none text-lg font-medium text-gray-300 hover:text-white" tabIndex={0} onClick={() => {
                setFocusTarea(t)
              }} onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setFocusTarea(t)
                }
              }}>{t.titulo}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className="h-full w-full">
        <TaskPreview tarea={focusTarea} />
      </div>
    </div>
  )
}
