import * as Yup from 'yup';

export const initialValues = () => {
    return {
        nombre: "",
        documento: "",
        fecha_nacimiento: "",
        procedencia: "",
        eps: "",
        direccion: "",
        telefono: "",
        posicion: "",
        tiempo_vinculacion: "",
        club_procedencia: "",
        ejercicio_adicional: ""
    };
};

export function validationSchema(){
    return Yup.object({
        nombre: Yup.string().required("Este campo es requerido"),
        documento: Yup.number().integer("Este campo es con números").required("Este campo es requerido"),
        fecha_nacimiento: Yup.string().required("Este campo es requerido"),
        procedencia: Yup.string().required("Este campo es requerido"),
        eps: Yup.string().required("Este campo es requerido"),
        direccion: Yup.string().required("Este campo es requerido"),
        telefono: Yup.number().integer("Este campo es con números").required("Este campo es requerido"),
        posicion: Yup.string().required("Este campo es requerido"),
        tiempo_vinculacion: Yup.string().required("Este campo es requerido"),
        club_procedencia: Yup.string().required("Este campo es requerido"),
        ejercicio_adicional: Yup.string().required("Este campo es requerido"),
    });
};
