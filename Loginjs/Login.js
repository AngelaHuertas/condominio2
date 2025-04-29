const usuarios = [
    { username: "santiago", password: "123", role: "Administrador" },
    { username: "angela", password: "456", role: "Usuario" }
];

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

function mostrarMenuPorRol(role) {
    while (true) {
        let menu = `Menú ${role}\n`;

        if (role === "Administrador") {
            menu += "1. Registrar propietario\n";
            menu += "2. Ver cuotas pagadas\n";
            menu += "3. Ver cuotas pendientes\n";
            menu += "4. Cerrar sesión\n";
            menu += "5. Salir del sistema\n";
        } else {
            menu += "1. Gestión de pagos\n";
            menu += "2. Actualizar datos\n";
            menu += "3. Cerrar sesión\n";
            menu += "4. Salir del sistema\n";
        }

        const opcion = prompt(menu);
        if (opcion === null) return false;

        switch (role) {
            case "Administrador":
                switch (opcion.trim()) {
                    case "1":
                        alert("Registro de propietario");
                        break;
                    case "2":
                        alert("Actualización de datos");
                        break;
                    case "3":
                        alert("Cuotas pagadas");
                        break;
                    case "4":
                        alert("Cuotas pendientes");
                        break;
                    case "5":
                        return true; 
                    case "6":
                        return false; 
                    default:
                        alert("⚠️ Opción no válida");
                }
                break;
            case "Usuario":
                switch (opcion.trim()) {
                    case "1":
                        alert("Gestión de pagos");
                        break;
                    case "2":case "2":
                        alert("Actualización de datos");
                        break; 
                    case "3":
                        return false; 
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
