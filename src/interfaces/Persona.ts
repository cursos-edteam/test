export interface Persona {
  idUser: string,
  nombre: string,
  apellido: string,
  edad?: number,
  genero: string,
  crecer?: () => void
}
