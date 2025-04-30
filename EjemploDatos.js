class EjemploDatos {
    constructor(numero, dueno, inquilino, adultos, ninos) {
      this.numero = numero;
      this.dueno = dueno;
      this.inquilino = inquilino;
      this.adultos = adultos;
      this.ninos = ninos;
      this.piscina = 0;
      this.juegos = 0;
      this.zonasSociales = 0;
      this.aseo = 0;
      this.subtotal = 0;
      this.descuento = 0;
      this.total = 0;
    }
  
    calcularCostos() {
      // Calcular piscina
      if (this.adultos > 0) {
        this.piscina = this.adultos * 2000;
      }
      
      // Calcular juegos
      if (this.ninos > 0) {
        this.juegos = 5000;
      }
  
      // Calcular zonas sociales
      if (this.inquilino && this.inquilino !== "") {
        this.zonasSociales = 10000;
      }
  
      // Calcular aseo
      const piso = Math.floor(this.numero / 100);
      if (piso === 1 || piso === 2) {
        this.aseo = 15000;
      }
  
      // Calcular subtotal
      this.subtotal = this.piscina + this.juegos + this.zonasSociales + this.aseo;
  
      // Calcular descuento
      if (this.dueno.toLowerCase() === this.inquilino.toLowerCase()) {
        this.descuento = (this.subtotal + 50000) * 0.20;
      }
  
      // Calcular total
      this.total = 50000 + this.subtotal - this.descuento;
    }
  
    mostrarDatos() {
      alert(
        "\nApartamento registrado con éxito.\n" +
        "--- DATOS DEL APARTAMENTO REGISTRADO ---\n" +
        `Número de apartamento: ${this.numero}\n` +
        `Dueño: ${this.dueno}\n` +
        `Inquilino: ${this.inquilino}\n` +
        `Adultos: ${this.adultos}\n` +
        `Niños: ${this.ninos}\n` +
        `Costo Piscina: $${this.piscina}\n` +
        `Costo Juegos: $${this.juegos}\n` +
        `Costo Zonas Sociales: $${this.zonasSociales}\n` +
        `Costo Aseo: $${this.aseo}\n` +
        `Subtotal: $${this.subtotal}\n` +
        `Descuento: $${this.descuento}\n` +
        `TOTAL A PAGAR: $${this.total}`
      );
    }
  }
  
  // Inicio del programa
  const MAX_APARTAMENTOS = parseInt(prompt("¿Cuántos apartamentos existen?"));
  const apartamentos = [];
  let cantidadRegistrada = 0;
  
  while (true) {
    if (cantidadRegistrada >= MAX_APARTAMENTOS) {
      alert("Ya se registraron todos los apartamentos permitidos.");
      break;
    }
  
    const numero = parseInt(prompt("Número del apartamento a registrar:"));
  
    const yaExiste = apartamentos.some(ap => ap.numero === numero);
    if (yaExiste) {
      alert("Ese número de apartamento ya está registrado.");
      continue;
    }
  
    const dueno = prompt("Dueño:");
    const inquilino = prompt("Inquilino:");
    const adultos = parseInt(prompt("¿Cuántos adultos viven?"));
    const ninos = parseInt(prompt("¿Cuántos niños viven?"));
  
    const apto = new EjemploDatos(numero, dueno, inquilino, adultos, ninos);
    apto.calcularCostos();
    apartamentos.push(apto);
    cantidadRegistrada++;
  
    apto.mostrarDatos();
  
    const continuar = prompt("¿Deseas registrar otro apartamento? (s/n):");
    if (continuar.toLowerCase() !== "s") break;
  }
  
  // Mostrar resumen final en consola
  console.log("\n--- Datos de apartamentos registrados ---");
  apartamentos.forEach(ap => {
    console.log(`Apartamento #${ap.numero}`);
    console.log(`  Dueño: ${ap.dueno}`);
    console.log(`  Inquilino: ${ap.inquilino}`);
  });
  