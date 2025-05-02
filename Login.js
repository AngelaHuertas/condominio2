export const usuarios = [  
    { username: "admin", password: "123", role: "Administrador" },
    { username: "angela", password: "456", role: "Usuario" }
];

import { GestorDePagos } from './gestorDePagos.js'; 
import { procesos } from './registro.js'; 


function iniciarSistema() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (username === "" || password === "") {
        alert("Por favor, ingrese un nombre de usuario y contraseña.");
        return;
    }


    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/;
    if (!soloLetras.test(username)) {
        alert("⚠️ El nombre de usuario solo debe contener letras (sin números ni símbolos).");
        document.getElementById('usernameInput').value = '';
        return;
    }
    
    const usuario = autenticar(username.trim(), password.trim());
    if (usuario) {
        alert(`✅ Bienvenido, ${usuario.username}!`);
        mostrarMenuPorRol(usuario.role);
        document.getElementById('usernameInput').value = '';
        document.getElementById('passwordInput').value = '';
    } else {
        alert("❌ Credenciales incorrectas. Intente nuevamente.");
        document.getElementById('usernameInput').value = '';
        document.getElementById('passwordInput').value = '';
    }
}

function autenticar(username, password) {
    return usuarios.find(user => user.username === username && user.password === password) || null;
}

export function mostrarMenuPorRol(role) {
    let salir = false;
    while (!salir) {
        let menu = `Menú ${role}\n`;

        if (role === "Administrador") {
            menu += "1. Registrar propietario\n";
            menu += "2. Ver cuotas pagadas\n";
            menu += "3. Ver cuotas pendientes\n";
            menu += "4. Cerrar sesión\n";
        } else {
            menu += "1. Gestión de pagos\n";
            menu += "2. Actualizar datos\n";
            menu += "3. Cerrar sesión\n";
        }

        const opcion = prompt(menu);
        if (opcion === null) return false;

        switch (role) {
            case "Administrador":
                switch (opcion.trim()) {
                    case "1":
                        procesos.registrarPropietario(); // Lanza el registro de propietario
                        break;
                    case "2":
                        const pagados = procesos.apartamentos.filter(a => a.pagoRealizado);
                        let listaPagados = "CUOTAS PAGADAS: \n\n";
                        pagados.forEach(apto => {
                            listaPagados += `N°${apto.numApt} - Propietario: ${apto.propietario}`;
                            listaPagados += apto.inquilino ? ` | Inquilino: ${apto.inquilino}\n` : "\n";
                        });
                        alert(`${listaPagados}\nTotal pagados: ${pagados.length} ${pagados.length === 1 ? 'apartamento' : 'apartamentos'}` 
                            || "No hay cuotas pagadas registradas.");
                        break;
                    case "3":
                        const pendientes = procesos.apartamentos.filter(a => !a.pagoRealizado);
                        let listaPendientes = "⚠️ CUOTAS PENDIENTES:\n\n";
                        pendientes.forEach(apto => {
                            listaPendientes += `N°${apto.numApt} - Propietario: ${apto.propietario}`;
                            listaPendientes += apto.inquilino ? ` | Inquilino: ${apto.inquilino}\n` : "\n";
                        });
                        alert(`${listaPendientes}\nTotal pendientes: ${pendientes.length} ${pendientes.length === 1 ? 'apartamento' : 'apartamentos'}` 
                            || "¡Todos los apartamentos están al día!");
                        break;
                    case "4":
                        window.location.href("./index.html")
                        return true;
                    default:
                        alert("⚠️ Opción no válida");
                }
                break;
            case "Usuario":
                switch (opcion.trim()) {
                    case "1":
                        const gestor = new GestorDePagos();
                        gestor.iniciar();
                        break;
                    case "2":
                        procesos.actualizacion();
                        break;
                    case "3":
                        window.location.href("./index.html")
                        return true;
                    default:
                        alert("⚠️ Opción no válida");
                }
                break;
            default:
                alert("⚠️ Rol desconocido");
                return false;
        }
    }
}

export function iniciar() {
    iniciarSistema();
}

  // Exponer iniciarSistema al scope global
window.iniciarSistema = iniciarSistema;
