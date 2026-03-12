// Modificadores de acceso
class Cuenta {
  public saldo: number;
  private pin: number;
  protected historial: any[];

  constructor(saldo: number, pin: number) {
    this.saldo = saldo;
    this.pin = pin;
    this.historial = [];
  }

  public retirar(cantidad: number, pin: number): boolean {
    if (this.verificarPin(pin)) {
      this.saldo -= cantidad;
      this.historial.push({ tipo: 'retiro', cantidad });
      return true;
    }
    return false;
  }

  private verificarPin(pin: number): boolean {
    return pin === this.pin;
  }
}

const cuenta = new Cuenta(1000, 1234);
console.log(cuenta.saldo); // ✅
// cuenta.pin; // ❌ Error: es private
