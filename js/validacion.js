export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajeDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio",
  },
  email: {
    valueMissing: "El campo email no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacio",
    patternMismatch:
      "Al menos 6 caracteres, maximo 12, debe contener una letra miniscula, una mayuscula, un numero, y no puede contener  caracteres especiales",
  },
  nacimiento: {
    valueMissing: "El campo fecha de nacimiento no puede estar vacio",
    customError: "Debes tener almenos 18 años de edad",
  },
  numero: {
    valueMissing: "El campo telefono no puede estar vacio",
    patternMismatch: "El formato requerido es de 10 numeros",
  },
  dirección: {
    valueMissing: "El campo direccion no puede estar vacio",
    patternMismatch: "La direccion debe tener entre 10 y 40 caracteres",
  },
  ciudad: {
    valueMissing: "El campo ciudad no puede estar vacio",
    patternMismatch: "La ciudad debe tener entre 10 y 40 caracteres",
  },
  estado: {
    valueMissing: "El campo estado no puede estar vacio",
    patternMismatch: "El estado debe tener entre 10 y 40 caracteres",
  },
};
const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoDeInput, input) {
  let mensaje = " ";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajeDeError[tipoDeInput][error]);
      mensaje = mensajeDeError[tipoDeInput][error];
    }
  });

  return mensaje;
}

function validarNacimiento(input) {
  const fechaCLiente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCLiente)) {
    mensaje = "Debes ser mayor de 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
