import * as Yup from 'yup';

export const initialValues = () => {
    return {
        nombre: "",
        apellidos: "",
        email: "",
        contraseña: "",
        verifica_contraseña: ""
    };
};

export function validationSchema(){
    return Yup.object({
        nombre: Yup.string().required("Este campo es requerido"),
        apellidos: Yup.string().required("Este campo es requerido"),
        email: Yup.string().email("El correo no es válido").required("Este campo es requerido"),
        contraseña: Yup.string().required("Este campo es requerido"),
        verifica_contraseña: Yup.string().required("Este campo es requerido")
                            .oneOf([Yup.ref("contraseña")], "Las contraseñas no coindicen")
    });
};
