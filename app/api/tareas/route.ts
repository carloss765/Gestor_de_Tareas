
const tareas = [
        {id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea 1'},
        {id: 2, titulo: 'Tarea 2', descripcion: 'Descripción de la tarea 2'},
        {id: 3, titulo: 'Tarea 3', descripcion: 'Descripción de la tarea 3'},
        {id: 4, titulo: 'Tarea 4', descripcion: 'Descripción de la tarea 4'},
        {id: 5, titulo: 'Tarea 5', descripcion: 'Descripción de la tarea 5'},
        {id: 6, titulo: 'Tarea 6', descripcion: 'Descripción de la tarea 6'},
        {id: 7, titulo: 'Tarea 7', descripcion: 'Descripción de la tarea 7'},
        {id: 8, titulo: 'Tarea 8', descripcion: 'Descripción de la tarea 8'},
        {id: 9, titulo: 'Tarea 9', descripcion: 'Descripción de la tarea 9'},
        {id: 10, titulo: 'Tarea 10', descripcion: 'Descripción de la tarea 10'},
        {id: 11, titulo: 'Tarea 11', descripcion: 'Descripción de la tarea 11'},
        {id: 12, titulo: 'Tarea 12', descripcion: 'Descripción de la tarea 12'},
        {id: 13, titulo: 'Tarea 13', descripcion: 'Descripción de la tarea 13'},
        {id: 14, titulo: 'Tarea 14', descripcion: 'Descripción de la tarea 14'},
        {id: 15, titulo: 'Tarea 15', descripcion: 'Descripción de la tarea 15'},
        {id: 16, titulo: 'Tarea 16', descripcion: 'Descripción de la tarea 16'},
        {id: 17, titulo: 'Tarea 17', descripcion: 'Descripción de la tarea 17'},
        {id: 18, titulo: 'Tarea 18', descripcion: 'Descripción de la tarea 18'},
        {id: 19, titulo: 'Tarea 19', descripcion: 'Descripción de la tarea 19'},
]
export async function GET() {
    return Response.json(tareas)
}

export async function POST(req: Request) {
    const body = await req.json()
    const newTarea = {
        id: tareas.length + 1,
        titulo: body.titulo,
        descripcion: body.descripcion,
    }
    tareas.push(newTarea)
    return Response.json(newTarea)
}
