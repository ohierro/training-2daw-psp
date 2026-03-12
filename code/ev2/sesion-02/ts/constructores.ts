// Constructores y propiedades
class Usuario {
  id: number;
  nombre: string;
  email: string;

  constructor(id: number, nombre: string, email: string) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
  }
}

// Forma abreviada
class UsuarioAbreviado {
  constructor(
    public id: number,
    public nombre: string,
    public email: string
  ) {}
}
