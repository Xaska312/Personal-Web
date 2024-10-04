// Mostrar u ocultar el botón de "Volver al inicio" según el desplazamiento
window.onscroll = function() {
    const btn = document.getElementById("back-to-top");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Volver al inicio al hacer clic en el botón
document.getElementById("back-to-top").onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

const sections = document.querySelectorAll('.section-container');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;

    sections.forEach(section => {
        if (scrollPosition > section.offsetTop + section.offsetHeight / 3) {
            section.classList.add('section-visible');
        }
    });
});

function addRecommendation() {
    var name = document.getElementById("recommendation_name").value || "Anónimo";
    var message = document.getElementById("new_recommendation").value;

    if (message.trim() === "") {
        alert("Por favor, ingresa un mensaje.");
        return;
    }

    var testimonialBox = document.querySelector(".testimonial-box");
    testimonialBox.innerHTML += "<p><strong>" + name + ":</strong> " + message + "</p>";

    document.getElementById("recommendation_name").value = "";
    document.getElementById("new_recommendation").value = "";

    showPopup(true);
}

function showPopup(show) {
    var popup = document.getElementById("popup");
    popup.style.display = show ? "flex" : "none";
}

// Función para agregar la recomendación y guardarla en localStorage
function addRecommendation() {
    var name = document.getElementById("recommendation_name").value || "Anónimo";
    var message = document.getElementById("new_recommendation").value;

    if (message.trim() === "") {
        alert("Por favor, ingresa un mensaje.");
        return;
    }

    // Obtenemos las recomendaciones actuales del localStorage
    var recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];

    // Añadimos la nueva recomendación
    recommendations.push({ name: name, message: message });

    // Guardamos las recomendaciones en localStorage
    localStorage.setItem("recommendations", JSON.stringify(recommendations));

    // Actualizamos la visualización
    displayRecommendations();

    // Limpiamos el formulario
    document.getElementById("recommendation_name").value = "";
    document.getElementById("new_recommendation").value = "";

    // Mostramos el popup de confirmación
    showPopup(true);
}

// Función para mostrar las recomendaciones guardadas
function displayRecommendations() {
    var recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
    var testimonialBox = document.querySelector(".testimonial-box");

    // Limpiamos el contenido actual
    testimonialBox.innerHTML = "";

    recommendations.forEach(function (recommendation, index) {
        testimonialBox.innerHTML += `
            <p><strong>${recommendation.name}:</strong> ${recommendation.message} 
            <button onclick="deleteRecommendation(${index})" class="delete-btn">Eliminar</button>
            </p>`;
    });
}

// Función para eliminar una recomendación
function deleteRecommendation(index) {
    var recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];

    // Eliminamos la recomendación seleccionada
    recommendations.splice(index, 1);

    // Guardamos el nuevo array en localStorage
    localStorage.setItem("recommendations", JSON.stringify(recommendations));

    // Actualizamos la visualización
    displayRecommendations();
}

// Función para mostrar/ocultar el popup
function showPopup(show) {
    var popup = document.getElementById("popup");
    popup.style.display = show ? "flex" : "none";
}

// Mostramos las recomendaciones cuando la página cargue
document.addEventListener("DOMContentLoaded", displayRecommendations);

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
}

// Inicializa EmailJS con tu User ID
(function () {
    emailjs.init("cB38yuivgRMqb9dK9"); 
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Muestra un mensaje de carga o desactiva el botón de envío
    var submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.textContent = "Enviando...";

    emailjs.sendForm('service_kd534be', 'template_w9hmen4', this)
        .then(function() {
            // Muestra el popup de confirmación
            showPopup(true);

            // Restablece el formulario y el botón de envío
            document.getElementById("contact-form").reset();
            submitButton.textContent = "Enviar";
        }, function(error) {
            alert("Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.");
            submitButton.textContent = "Enviar";
        });
});

function showPopup(show) {
    var popup = document.getElementById("popup");
    if (show) {
        popup.style.display = "flex"; // Muestra el popup
    } else {
        popup.style.display = "none"; // Oculta el popup
    }
}


document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Esto evita que el formulario recargue la página

    // Continúa con el resto del código para enviar el formulario
});
