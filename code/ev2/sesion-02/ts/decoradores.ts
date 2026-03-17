// Decoradores de clase
function Sellado(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sellado
class Producto {
  nombre: string = 'Producto';
}

function AgregarTimestamp(constructor: Function) {
  constructor.prototype.creado = new Date();
}

// @AgregarTimestamp
// class Usuario {
//   nombre: string;
//   creado?: Date;
// }

// const usuario = new Usuario();
// console.log(usuario.creado); // Fecha actual
