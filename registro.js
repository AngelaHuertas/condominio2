class Procesos {
    constructor() {
        this.numApto = 0;
        this.numAdultos = 0;
        this.numNinos = 0;

        this.nomPropietario = "";
        this.nomInquilino = "";
        this.elPassword = "";

        this.apartamentos = [];
    }

    registrarPropietario() {
        this.ingresarNumApto();
    }

    ingresarNumApto() {
        alert("Bienvenido a REGISTROS");
        let valido = false;
    
        while (!valido) {
            let entrada = prompt("Ingrese el número de su apartamento");
    
            if (entrada === null || entrada.trim() === "" || isNaN(entrada) || parseInt(entrada) != Number(entrada)) {
                alert("Debe ingresar un número válido, sin letras ni símbolos.");
                continue;
            }
    
            this.numApto = parseInt(entrada);
    
            if (this.numApto < 100) {
                alert("Nuestro condominio cuenta con apartamentos a partir del N°100");
                continue;
            }
    
            let repetido = false;
            for (let a of this.apartamentos) {
                if (a.numApt === this.numApto) {
                    repetido = true;
                    alert("Error: el apartamento ya está registrado.");
                    break;
                }
            }
    
            if (!repetido) {
                valido = true;
            }
        }
    
        this.ingresarNombres();
    }
    

    ingresarNombres() {
       
        do {
            this.nomPropietario = prompt("Ingrese el nombre del propietario");
            if (!this.nomPropietario || this.nomPropietario.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados");
                continue;
            }
            if (!isNaN(this.nomPropietario)) {
                alert("Este campo no admite números");
                continue;
            }
            if (this.nomPropietario && !/^[a-zA-Z\s]+$/.test(this.nomPropietario)) {
                alert("Este campo solo admite letras. No se permiten números ni símbolos.");
                continue;
            }
            break;
        } while (true);
    
        do {
            this.nomInquilino = prompt("Ingrese el nombre del inquilino");
            if (this.nomInquilino && !/^[a-zA-Z\s]+$/.test(this.nomInquilino)) {
                alert("Este campo solo admite letras. No se permiten números ni símbolos.");
                continue;
            }
            if (!this.nomInquilino || this.nomInquilino.trim() === "") {
                this.nomInquilino = "";
                this.numAdultos = 0;
                this.numNinos = 0;
                alert("No se ingresó el nombre del inquilino, se omiten los campos de adultos y niños.");
                break; 
            } else {
                this.ingresarPersonas(); 
                break;
            }
        } while (true);
    
       
        this.ingresarContrasena(); 
    }
    

    ingresarPersonas() {
        do {
            let adultos = prompt("Ingrese el número de adultos que viven en el apartamento " + this.numApto);

            if (!adultos || adultos.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados.");
                continue;
            } 

            if (isNaN(adultos) || parseInt(adultos) != Number(adultos)) {
                alert("Debe ingresar un número válido, sin letras ni símbolos.");
                continue;
            } 
            
            if (adultos<0) {
                alert("En este campo no se permiten numeros negativos")
                continue;
            }
            
        
            this.numAdultos = parseInt(adultos);
            
        } while (isNaN(this.numAdultos));

        do {
            let ninos = prompt("Ingrese el número de niños que viven en el apartamento " + this.numApto);
            if (!ninos || ninos.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados.");
            } else {
                this.numNinos = parseInt(ninos);
            }
        } while (isNaN(this.numNinos));

       
    }

    ingresarContrasena(){
        do {
            this.elPassword = prompt("Ingrese una contraseña para el inquilino");
            if (!this.elPassword || this.elPassword.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados");
            }
        } while (!this.elPassword || this.elPassword.trim() === "");

        this.guardarApto();
    }



    guardarApto() {
        let apto = new Apartamento();
        apto.numApt = this.numApto;
        apto.propietario = this.nomPropietario;
        apto.adultos = this.numAdultos;
        apto.ninos = this.numNinos;
        apto.inquilino = this.nomInquilino;
        apto.password = this.elPassword;

        this.apartamentos.push(apto);

        alert("Apartamento registrado con éxito.");

        this.mostrarApto(apto);
    }

    mostrarApto(apto) {
        alert("RESUMEN REGISTRO:\n" +
            "Número del apartamento: " + apto.numApt +
            "\nPropietario: " + apto.propietario +
            "\nInquilino: " + apto.inquilino +
            "\nAdultos: " + apto.adultos +
            "\nNiños: " + apto.ninos);

        alert("Volviendo al menú principal...");
    }

    actualizacion() {
        alert("Bienvenido a actualizaciones");

        let encontrado = false;
        let aptoSeleccionado = null;

        while (!encontrado) {
            let buscarApto = parseInt(prompt("Ingrese el número del apartamento que desea modificar"));

            for (let a of this.apartamentos) {
                if (buscarApto === a.numApt) {
                    encontrado = true;
                    aptoSeleccionado = a;
                    break;
                }
            }

            if (!encontrado) {
                alert("No se encontró ningún apartamento con ese número. Intente de nuevo.");
            }
        }

        let opcion;
        do {
            opcion = parseInt(prompt("Ingrese la opción del dato que desea cambiar:\n" +
                "1. Nombre de Propietario\n" +
                "2. Nombre de Inquilino\n" +
                "3. Número de Adultos\n" +
                "4. Número de Niños\n" +
                "5. Todos los datos"));

            switch (opcion) {
                case 1:
                    aptoSeleccionado.propietario = prompt("Digite el nuevo Propietario");
                    break;
                case 2:
                    aptoSeleccionado.inquilino = prompt("Digite el nuevo Inquilino");
                    break;
                case 3:
                    aptoSeleccionado.adultos = parseInt(prompt("Digite el nuevo número de adultos"));
                    break;
                case 4:
                    aptoSeleccionado.ninos = parseInt(prompt("Digite el nuevo número de niños"));
                    break;
                case 5:
                    aptoSeleccionado.propietario = prompt("Digite el nuevo Propietario");
                    aptoSeleccionado.inquilino = prompt("Digite el nuevo Inquilino");
                    aptoSeleccionado.adultos = parseInt(prompt("Digite el nuevo número de adultos"));
                    aptoSeleccionado.ninos = parseInt(prompt("Digite el nuevo número de niños"));
                    break;
                default:
                    alert("Opción incorrecta, inténtalo de nuevo.");
            }
        } while (opcion < 1 || opcion > 5);

        alert("¡Registro actualizado con éxito!");
    }
}



const procesos = new Procesos();
procesos.registrarPropietario(); // flijo
