// Uniones e intersecciones de tipos

type Exito = { tipo: 'exito'; datos: any };
type Error = { tipo: 'error'; mensaje: string };
type Resultado = Exito | Error;

const resultado: Resultado = {
  tipo: 'exito',
  datos: { id: 1 }
};

type Persona = { nombre: string; edad: number };
type Empleado = { empresa: string; salario: number };
type PersonaEmpleada = Persona & Empleado;

const empleado: PersonaEmpleada = {
  nombre: 'Juan',
  edad: 30,
  empresa: 'Acme',
  salario: 50000
};
