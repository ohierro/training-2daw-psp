// Clases en TypeScript
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  presentarse(): string {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
  }
}

const persona = new Persona('Juan', 30);
console.log(persona.presentarse());
