
/* ==========================================
   1. ELEMENTOS HTML
========================================== */

// Pantallas principales
const introScreen = document.getElementById("intro-screen");
const dedicationScreen = document.getElementById("dedication-screen");
const loginScreen = document.getElementById("login-screen");
const usernameAlert = document.getElementById("username-alert");
const mainContent = document.getElementById("main-content");

// Botones
const dedicationButton = document.getElementById("dedication-continue");
const alertButton = document.getElementById("alert-continue");

// Formulario
const loginForm = document.getElementById("login-form");

// Entradas
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Mensajes
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const passwordHint = document.getElementById("password-hint");


/* ==========================================
   2. CONFIGURACIÓN DE ACCESO
========================================== */

const CORRECT_USERNAME = "Niggel";
const CORRECT_PASSWORD = "26/11/2026";

// Contadores de intentos
let usernameAttempts = 0;
let passwordAttempts = 0;

// Estado del inicio de sesión
let usernameVerified = false;


/* ==========================================
   3. FUNCIONES PARA CAMBIAR DE PANTALLA
========================================== */

function showScreen(screen) {
    screen.hidden = false;
    screen.classList.add("active");
}


function hideScreen(screen) {
    screen.hidden = true;
    screen.classList.remove("active");
}


/* ==========================================
   4. GIF DE BIENVENIDA
========================================== */

// Esperar a que la página termine de cargar
window.addEventListener("load", () => {

    // Duración de la introducción: 2 segundos
    setTimeout(() => {

        hideScreen(introScreen);

        showScreen(dedicationScreen);

    }, 2000);

});


/* ==========================================
   5. PANTALLA DE DEDICATORIA
========================================== */

dedicationButton.addEventListener("click", () => {

    hideScreen(dedicationScreen);

    showScreen(loginScreen);

    usernameInput.focus();

});


/* ==========================================
   6. COMPROBACIÓN DEL USUARIO
========================================== */

// La contraseña no es obligatoria hasta verificar
// correctamente el nombre de usuario.
passwordInput.required = false;


function checkUsername() {

    const enteredUsername = usernameInput.value.trim();

    // Comprobación sin distinguir mayúsculas
    if (
        enteredUsername.toLocaleLowerCase() !==
        CORRECT_USERNAME.toLocaleLowerCase()
    ) {

        usernameAttempts++;

        usernameError.textContent =
            "Ese no es el nombre correcto. Inténtalo otra vez.";

        passwordInput.value = "";

        // Dos intentos incorrectos
        if (usernameAttempts >= 2) {

            showUsernameAlert();

        }

        return false;

    }

    // Usuario correcto
    usernameVerified = true;

    usernameInput.readOnly = true;

    passwordInput.required = true;

    usernameError.textContent = "";

    passwordInput.focus();

    return true;

}


/* ==========================================
   7. AVISO ESPECIAL DE USUARIO
========================================== */

function showUsernameAlert() {

    // Reiniciar los intentos del usuario
    usernameAttempts = 0;

    hideScreen(loginScreen);

    showScreen(usernameAlert);

}


alertButton.addEventListener("click", () => {

    hideScreen(usernameAlert);

    showScreen(loginScreen);

    usernameInput.value = "";

    usernameInput.readOnly = false;

    usernameError.textContent = "";

    passwordInput.value = "";

    usernameInput.focus();

});


/* ==========================================
   8. COMPROBACIÓN DE CONTRASEÑA
========================================== */

function checkPassword() {

    const enteredPassword = passwordInput.value.trim();

    // Comprobar contraseña
    if (enteredPassword !== CORRECT_PASSWORD) {

        passwordAttempts++;

        passwordError.textContent =
            "La contraseña no es correcta.";

        // PRIMER ERROR
        if (passwordAttempts === 1) {

            passwordHint.hidden = false;

            passwordHint.textContent =
                "Pista: escribe la fecha en el orden día / mes / año (DD/MM/AAAA).";

        }

        // SEGUNDO ERROR
        else if (passwordAttempts >= 2) {

            passwordHint.hidden = false;

            passwordHint.textContent =
                "Bueno, te la doy: la contraseña es 26/11/2026.";

        }

        passwordInput.value = "";

        passwordInput.focus();

        return false;

    }

    // Contraseña correcta
    passwordError.textContent = "";

    passwordHint.hidden = true;

    return true;

}


/* ==========================================
   9. FORMULARIO DE INICIO DE SESIÓN
========================================== */

loginForm.addEventListener("submit", (event) => {

    // Evitar que la página se recargue
    event.preventDefault();


    // Primero comprobar el usuario
    if (!usernameVerified) {

        const validUsername = checkUsername();

        if (!validUsername) {
            return;
        }

        // Esperar a que introduzca la contraseña
        if (!passwordInput.value.trim()) {
            return;
        }

    }


    // Después comprobar la contraseña
    const validPassword = checkPassword();

    if (!validPassword) {
        return;
    }


    // Si ambas comprobaciones son correctas,
    // entrar a la página principal.

    enterWebsite();

});


/* ==========================================
   10. ENTRADA A LA PÁGINA PRINCIPAL
========================================== */

function enterWebsite() {

    hideScreen(loginScreen);

    showScreen(mainContent);

    // Volver al principio de la página
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   11. EFECTOS VISUALES ADICIONALES
========================================== */

// Pequeño efecto al desplazarse por las secciones
// No afecta al funcionamiento del resto de la web.

const contentSections = document.querySelectorAll(
    ".content-section"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.animation =
                        "riseIn 0.9s ease both";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    contentSections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* ==========================================
   12. MENSAJE DE CONSOLA
========================================== */

console.log(
    "%cPara mi mejor amiga ♡",
    "color: #c4a4df; font-size: 20px; font-family: serif;"
);

console.log(
    "%cUna pequeña página hecha con cariño. 🦋",
    "color: #b77f9b; font-size: 13px;"
);
// =================================
// MOMENTO ESPECIAL: CONTRASEÑA
// =================================

const specialOpenButton = document.getElementById("special-touch-button");

const specialOverlay = document.getElementById("special-lock-overlay");

const specialPasswordPanel = document.getElementById("special-password-panel");

const specialWritingPanel = document.getElementById("special-writing-panel");

const specialWrongPanel = document.getElementById("special-wrong-panel");

const specialPasswordForm = document.getElementById("special-password-form");

const specialPasswordInput = document.getElementById("special-password-input");

const specialPasswordError = document.getElementById("special-password-error");

const specialWritingArea = document.getElementById("special-writing-area");

const specialWritingClose = document.getElementById("special-writing-close");

const specialWrongClose = document.getElementById("special-wrong-close");

const SPECIAL_PASSWORD = "inseguridades";


// Abrir el panel

function openSpecialPanel() {

    specialOverlay.hidden = false;

    specialPasswordPanel.hidden = false;
    specialWritingPanel.hidden = true;
    specialWrongPanel.hidden = true;

    specialPasswordInput.value = "";
    specialPasswordError.textContent = "";

    specialPasswordInput.focus();
}


// Cerrar el panel

function closeSpecialPanel() {

    specialOverlay.hidden = true;

    specialOpenButton.focus();
}


// Botón "Tocar aquí"

specialOpenButton.addEventListener("click", openSpecialPanel);


// Comprobar contraseña

specialPasswordForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const answer = specialPasswordInput.value.trim().toLowerCase();

    if (answer === SPECIAL_PASSWORD) {

        // CONTRASEÑA CORRECTA

        specialPasswordPanel.hidden = true;
        specialWrongPanel.hidden = true;

        specialWritingPanel.hidden = false;

        specialWritingArea.focus();

    } else {

        // CONTRASEÑA INCORRECTA

        specialPasswordPanel.hidden = true;
        specialWritingPanel.hidden = true;

        specialWrongPanel.hidden = false;

    }

});


// Cerrar después de responder correctamente

specialWritingClose.addEventListener("click", closeSpecialPanel);


// Cerrar después de responder incorrectamente

specialWrongClose.addEventListener("click", closeSpecialPanel);


// Permitir cerrar con Escape

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && !specialOverlay.hidden) {
        closeSpecialPanel();
    }

});