class GestorDePagos {
    #estadoPago = "Pendiente";
    #metodoPago;
    #apartamentoSeleccionado;
  
    mostrarMontoDeCuotaMensual(apartamentos) {
      const codigoApart = prompt("Ingrese código de apartamento:");
      if (codigoApart === null) return false;
  
      const codApartamento = parseInt(codigoApart.trim());
      for (const apto of apartamentos) {
        if (apto.numApt === codApartamento) {
          Calculo.calcularCostos(apto);
          this.#apartamentoSeleccionado = apto;
  
          alert(
            `Factura Nº ${apto.numApt}\nDueño: ${apto.propietario}\nInquilino: ${apto.inquilino}\nTotal: $${apto.total.toFixed(2)}`
          );
          return true;
        }
      }
  
      alert("Apartamento no encontrado.");
      return false;
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
  
    iniciar(apartamentos) {
      if (!this.mostrarMontoDeCuotaMensual(apartamentos)) return;
      while (true) {
        const opcion = prompt("¿Qué hacer?\n1. Pagar\n2. Ver estado\n3. Volver");
        if (opcion === null || opcion.trim() === "3") break;
        if (opcion.trim() === "1") this.gestionarMetodoDePago();
        else if (opcion.trim() === "2") this.confirmarEstadoPago();
        else alert("Opción inválida.");
      }
    }
  }
  