import Apartamento from './apartamento.js';
import { usuarios} from './Login.js'; 
import { mostrarMenuPorRol } from './Login.js';  

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
    
            if (entrada === null) {
                mostrarMenuPorRol("Administrador");
                return;
            }
            
            entrada = entrada.trim();

            if (entrada.trim() === "" || isNaN(entrada) || parseInt(entrada) != Number(entrada)) {
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
        let volverAPropietario = false;
        do{  
            do {
                this.nomPropietario = prompt("Ingrese el nombre del propietario");

                if(this.nomPropietario === null){
                    this.ingresarNumApto();
                    return;
                }

                this.nomPropietario = this.nomPropietario.trim();

                if (this.nomPropietario.trim() === "") {
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
                
                if(this.nomInquilino === null){
                    volverAPropietario = true;
                    break;
                }else{
                    volverAPropietario=false;
                }
                
                this.nomInquilino = this.nomInquilino.trim();

                if (this.nomInquilino && !/^[a-zA-Z\s]+$/.test(this.nomInquilino)) {
                    alert("Este campo solo admite letras. No se permiten números ni símbolos.");
                    continue;
                }

                if ( this.nomInquilino.trim() === "") {
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

        } while (volverAPropietario);
    
        this.ingresarContrasena(); 
    }
    

    ingresarPersonas() {
        let volverAAdultos = false;
        do{ 
            do {
                let adultos = prompt("Ingrese el número de adultos que viven en el apartamento " + this.numApto);
                
                if(adultos === null){
                    this.ingresarNombres();
                    return;
                }

                adultos = adultos.trim();

                if (adultos.trim() === "") {
                    alert("Recuerde que todos los campos deben ser llenados.");
                    continue;
                }
        
                if (isNaN(adultos) || parseInt(adultos) != Number(adultos)) {
                    alert("Debe ingresar un número válido, sin letras ni símbolos.");
                    continue;
                }
        
                if (parseInt(adultos) < 1) {
                    alert("Parece que el apartamento tiene por lo menos un adulto.");
                    continue;
                }
        
                this.numAdultos = parseInt(adultos);
                break; 
            } while (true);
        
            do {
                let ninos = prompt("Ingrese el número de niños que viven en el apartamento " + this.numApto);

                if(ninos === null){
                    volverAAdultos = true;
                    break;
                }else{
                    volverAAdultos=false;
                }

                ninos = ninos.trim();

                if (ninos.trim() === "") {
                    alert("Recuerde que todos los campos deben ser llenados.");
                    continue;
                }
        
                if (isNaN(ninos) || parseInt(ninos) != Number(ninos)) {
                    alert("Debe ingresar un número válido, sin letras ni símbolos.");
                    continue;
                }
        
                if (parseInt(ninos) < 0) {
                    alert("En este campo no se permiten números negativos.");
                    continue;
                }
        
                this.numNinos = parseInt(ninos);
                break; 

            } while (true); 
            
        }while (volverAAdultos);

        
        
    }
    

    ingresarContrasena(){
        do {
            this.elPassword = prompt("Ingrese una contraseña para el inquilino");
            
            if(this.elPassword === null){
                this.ingresarPersonas();
                return;
            }
            
            this.elPassword = this.elPassword.trim();

            if (this.elPassword.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados");
                continue;
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
        apto.pagoRealizado = false;
        apto.total = 0;

        this.apartamentos.push(apto);

        // crea un perfil de usuario con el nombre del propietario
        usuarios.push({ username: apto.propietario, password: apto.password, role: "Usuario" }); // Nueva línea

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
        mostrarMenuPorRol("Administrador"); 
    }

    mostrarAptoUser(apto) {
        alert("RESUMEN REGISTRO:\n" +
            "Número del apartamento: " + apto.numApt +
            "\nPropietario: " + apto.propietario +
            "\nInquilino: " + apto.inquilino +
            "\nAdultos: " + apto.adultos +
            "\nNiños: " + apto.ninos);

        alert("Volviendo al menú principal...");
        mostrarMenuPorRol("Usuario"); 
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
                    aptoSeleccionado.propietario = this.actualizarProp();
                    break;
                case 2:
                    const nuevoInqui = this.actualizarInqui();
                    if (nuevoInqui === null) {
                        aptoSeleccionado.inquilino = "";
                        aptoSeleccionado.adultos = 0;
                        aptoSeleccionado.ninos = 0;
                        alert("No hay inquilino, se eliminan adultos y niños.");
                    } else {
                        aptoSeleccionado.inquilino = nuevoInqui;
                    }
                    break;
                case 3:
                    aptoSeleccionado.adultos = this.actualizarAdultos();
                    break;
                case 4:
                    aptoSeleccionado.ninos = this.actualizarNinos();
                    break;
                    case 5:
                    aptoSeleccionado.propietario = this.actualizarProp();
                        const nuevoInquilino = this.actualizarInqui(); 

                        if (nuevoInquilino === null) {
                            aptoSeleccionado.inquilino = "";
                            aptoSeleccionado.adultos = 0;
                            aptoSeleccionado.ninos = 0;
                            alert("No hay inquilino, se eliminan adultos y niños.");
                        } else {
                            aptoSeleccionado.inquilino = nuevoInquilino;
                            aptoSeleccionado.adultos = this.actualizarAdultos();
                            aptoSeleccionado.ninos = this.actualizarNinos();
                        }
                        break;  
                default:
                    alert("Opción incorrecta, inténtalo de nuevo.");
            }
        } while (opcion < 1 || opcion > 5);
    
        alert("¡Registro actualizado con éxito!");
        this.mostrarAptoUser(aptoSeleccionado); 
    }

    actualizarProp() {
        let nuevoPropietario;
        do {
        
            nuevoPropietario = prompt("Digite el nuevo Propietario");
    
        
            if (!nuevoPropietario || nuevoPropietario.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados");
                continue;
            }
    
            if (!isNaN(nuevoPropietario)) {
                alert("Este campo no admite números");
                continue;
            }
    
            if (nuevoPropietario && !/^[a-zA-Z\s]+$/.test(nuevoPropietario)) {
                alert("Este campo solo admite letras. No se permiten números ni símbolos.");
                continue;
            }
    
            break; 
        } while (true);
    
        return nuevoPropietario;
    }

    actualizarInqui() {
        let nuevoInquilino;
        do {
            nuevoInquilino = prompt("Digite el nuevo Inquilino");
    
            if (!nuevoInquilino || nuevoInquilino.trim() === "") {
                alert("No se ingresó el nombre del inquilino.");
                return null;
            }
    
            if (!/^[a-zA-Z\s]+$/.test(nuevoInquilino)) {
                alert("Este campo solo admite letras. No se permiten números ni símbolos.");
                continue;
            }
    
            break;
        } while (true);
    
        return nuevoInquilino;
    }
    

    actualizarAdultos(){
        let nuevoAdulto;
        do {
            nuevoAdulto = prompt("Digite el nuevo numero de adultos");
    
            if (!nuevoAdulto|| nuevoAdulto.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados.");
                continue;
            }
    
            if (isNaN(nuevoAdulto) || parseInt(nuevoAdulto) != Number(nuevoAdulto)) {
                alert("Debe ingresar un número válido, sin letras ni símbolos.");
                continue;
            }
    
            if (parseInt(nuevoAdulto) < 1) {
                alert("Parece que el apartamento tiene por lo menos un adulto.");
                continue;
            }
    
        
            break; 
    
        } while (true);
        return parseInt (nuevoAdulto)
    }

    actualizarNinos(){
        let nuevoNino;
        do {
            nuevoNino = prompt("Digite el nuevo numero de niños"); 
            if (!nuevoNino || nuevoNino.trim() === "") {
                alert("Recuerde que todos los campos deben ser llenados.");
                continue;
            }
    
            if (isNaN(nuevoNino) || parseInt(nuevoNino) != Number(nuevoNino)) {
                alert("Debe ingresar un número válido, sin letras ni símbolos.");
                continue;
            }
    
            if (parseInt(nuevoNino) < 0) {
                alert("En este campo no se permiten números negativos.");
                continue;
            }
    
        
            break;  
    
        } while (true);
        return parseInt(nuevoNino);
    }

    
    }

//metodos de actualizaciones

export const procesos = new Procesos(); // exporta la instancia para usar desde Login.js
