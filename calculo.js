export class Calculo {
    static calcularCostos(apto) {
      // Calcular piscina
      apto.piscina = apto.adultos * 2000;

    // Calcular juegos
    apto.juegos = apto.ninos > 0 ? 5000 : 0;

    // Calcular zonas sociales
    apto.zonasSociales = apto.inquilino ? 10000 : 0;

    // Calcular aseo
    const piso = Math.floor(apto.numApt / 100);
    apto.aseo = (piso === 1 || piso === 2) ? 15000 : 0;

    // Subtotal
    apto.subtotal = apto.piscina + apto.juegos + apto.zonasSociales + apto.aseo;

    // Descuento
    if (apto.propietario.toLowerCase() === (apto.inquilino || '').toLowerCase()) {
    apto.descuento = (apto.subtotal + 50000) * 0.20;
    } else {
    apto.descuento = 0;
    }

      // Total
    apto.total = 50000 + apto.subtotal - apto.descuento;
    }
}