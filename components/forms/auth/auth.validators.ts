import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Muy corto minimo 2 caracteres")
      .max(20, "Muy Largo maximo 20 caracteres")
      .required("Es requerido")
      .nullable(),
  
    password: Yup.string()
      .min(8, "Muy corto! minimo 8 caracteres")
      .max(255, "Muy Largo! maximo 255 caracteres")
      .required("Es requerido")
      .nullable(),
  
    email: Yup.string().email("Correo invalido").required("Required"),
  
    nombres: Yup.string()
      .min(2, "Muy corto! minimo 2 caracteres")
      .max(50, "Muy Largo! maximo 50 caracteres")
      .required("Es requerido")
      .nullable(),
  
    a_paterno: Yup.string()
      .min(2, "Muy corto! minimo 2 caracteres")
      .max(50, "Muy Largo! maximo 50 caracteres")
      .required("Es requerido")
      .nullable(),
  
    a_materno: Yup.string()
      .min(2, "Muy corto! minimo 2 caracteres")
      .max(50, "Muy Largo! maximo 50 caracteres")
      .required("Es requerido")
      .nullable(),
  
    n_control: Yup.string()
      .min(8, "Muy corto! minimo 8 caracteres")
      .max(10, "Muy Largo! maximo 10 caracteres")
      .required("Es requerido")
      .nullable(),
  
    telefono: Yup.string()
      .min(10, "Muy corto! minimo 10 caracteres")
      .max(10, "Muy Largo! maximo 10 caracteres")
      .required("Es requerido")
      .nullable(),
  
    whatsapp: Yup.string()
      .min(10, "Muy corto! minimo 10 caracteres")
      .max(15, "Muy Largo! maximo 15 caracteres")
      .required("Es requerido")
      .nullable(),
  
    email_institucional: Yup.string()
      .email("Correo invalido")
      .min(20, "Muy corto! minimo 20 caracteres")
      .max(27, "Muy Largo! maximo 27 caracteres")
      .required("Es requerido")
      .nullable(),
  
    campus: Yup.number().required("Selecciona una opcion").nullable(),
  
    carreraId: Yup.number().required("Selecciona una opcion").nullable(),
  });