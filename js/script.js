
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea, select");
    const charCount = document.getElementById("charCount");
    const messageField = document.getElementById("inputMessage");

    messageField.addEventListener("input", function () {
        let texto = messageField.value;
        charCount.textContent = `${texto.length}/400`;

        if (texto.length > 400) {
            messageField.classList.add("is-valid");
        } else {
            messageField.classList.remove("is-valid");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;
        let formData = new FormData();

        inputs.forEach((input) => {
            if (input.value.trim()  === "" || (input.tagName === "SELECT" && input.value === "Choose..."  )) {
                isValid = false;
                input.classList.add("is-invalid");
            } else{
                input.classList.remove("is-invalid");
                formData.append(input.id, input.value);
            }
        });

        if (!isValid) {
            alert("Por favor completa todos los campos.");
            return;
          }

          fetch("https://formspree.io/f/{tu_email}", {
            method: "POST",
            body: formData,
          })

          .then((response) => {
            if (response.ok) {
                alert("Mensaje enviado con exito");
                form.reset();
                charCount.textContent = "0/400";
            } else {
                alert("Error al enviar mensaje");
            }
          })
          .catch(()=> {
            alert("Hubo un problema al enviar el mensaje");
          });
    });
});