import { Calculo } from './calculo.js';
import { procesos } from './registro.js';

export class GestorDePagos {
    #estadoPago = "Pendiente";
    #metodoPago;
    #apartamentoSeleccionado;
    
    mostrarMontoCuota() { 
      const codigo = prompt("Ingrese número de apartamento:");
      if (!codigo) return false;

      this.#apartamentoSeleccionado = procesos.apartamentos.find(
          apto => apto.numApt === parseInt(codigo)
      );

      if (!this.#apartamentoSeleccionado) {
          alert(" Apartamento no registrado");
          return false;
      }

      Calculo.calcularCostos(this.#apartamentoSeleccionado);
      
      alert(` ** FACTURA DETALLADA **
    
Propietario: ${this.#apartamentoSeleccionado.propietario}
Inquilino: ${this.#apartamentoSeleccionado.inquilino || "N/A"}

--- COSTOS ---
Piscina: $${this.#apartamentoSeleccionado.piscina.toFixed(2)}
Juegos Infantiles: $${this.#apartamentoSeleccionado.juegos.toFixed(2)}
Zonas Sociales: $${this.#apartamentoSeleccionado.zonasSociales.toFixed(2)}
Aseo: $${this.#apartamentoSeleccionado.aseo.toFixed(2)}

Subtotal: $${this.#apartamentoSeleccionado.subtotal.toFixed(2)}
Descuento: $${this.#apartamentoSeleccionado.descuento.toFixed(2)}

-> TOTAL A PAGAR: $${this.#apartamentoSeleccionado.total.toFixed(2)}
    `);
      
      return true; // <-- Retorna true/false para controlar flujo
  }
  
    gestionarMetodoDePago() {
      if (this.#estadoPago.toLowerCase() === "aprobado") {
        alert("Pago ya realizado.");
        return;
      }
  
      const opcion = prompt("Método de pago:\n1. PSE\n2. Tarjeta\n3. Cancelar");
      if (opcion === null) return;
  
      switch (opcion.trim()) {
        case "1":
          this.#metodoPago = "PSE";
          this.#estadoPago = "Aprobado";
          if (this.#apartamentoSeleccionado) this.#apartamentoSeleccionado.pagoRealizado = true;
          alert("Pago PSE exitoso.");
          break;
        case "2":
          this.#metodoPago = "TARJETA";
          this.#estadoPago = "Aprobado";
          if (this.#apartamentoSeleccionado) this.#apartamentoSeleccionado.pagoRealizado = true;
          alert("Pago tarjeta exitoso.");
          break;
        case "3":
          this.#estadoPago = "Cancelado";
          return;
        default:
          alert("Opción inválida.");
          return;
      }
  
      this.generarComprobanteDePago();
    }
  
    confirmarEstadoPago() {
      alert("Estado: " + this.#estadoPago);
    }
  
    generarComprobanteDePago() {
      if (!this.#apartamentoSeleccionado) return;
      const fecha = new Date().toISOString().split("T")[0];
      alert(
        `COMPROBANTE\nMétodo: ${this.#metodoPago}\nEstado: ${this.#estadoPago}\nFecha: ${fecha}\nValor: $${this.#apartamentoSeleccionado.total.toFixed(2)}`
      );
    }
  
    iniciar() {
      if (!this.mostrarMontoCuota()) return;

      while (true) {
      const opcion = prompt(`Seleccione una opción:
      1. Realizar pago
      2. Ver estado actual
      3. Volver al menú`);

                switch(opcion?.trim()) {
                    case '1':
                        if (this.gestionarMetodoDePago()) return;
                        break;
                    case '2':
                        alert(`Estado actual: ${this.#estadoPago}`);
                        break;
                    case '3':
                      alert("Volviendo al menú principal...");
                        mostrarMenuPorRol("Usuario");
                    default:
                        alert("Opción no válida");
                }
            }
        }
  }

  export const gestorDePagos = new GestorDePagos();