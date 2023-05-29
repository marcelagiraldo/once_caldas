import React from "react";
import { DashboardTop } from "../../../components/TopComponents/DashboardTop/DashboardTop";
import "./StudentsRegister.scss";
import { Col, Form, Input } from "antd";
import { SaveButton } from "../../../components/UsersComponents/SaveButton/SaveButton";
import { Auth } from "../../../api/auth"; 
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";



function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("El correo no es válido")
        .required("Este campo es requerido"),
      apellidos: Yup.string().required("Este campo es requerido"),
      nombres: Yup.string().required("Este campo es requerido"),
      codigo: Yup.number().required("Este campo es requerido"),
      semestre: Yup.number().required("Este campo es requerido"),
        
    });
  }

export const StudentsRegister = () => {
    const onFinish = async (values) => {
        try {
        await Auth.registerStudents(values);
        // Realiza alguna acción adicional después de registrar el estudiante
        } catch (error) {
        console.error(error);
        // Maneja el error de alguna forma apropiada
        }
    };

return (
    <div>
        <DashboardTop addtitle="ESTUDIANTES" userName="Lina Maria Montereal Mesa" />
        <Formik 
        initialValues= {{
            nombres: '',
            apellidos: '',
            email: '',
            semestre: ''
        }}
        validationSchema={validationSchema()}
        onFinish={onFinish}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <Form onFinish={onFinish}> 
        <div className="FirstStudentsRegister">
            <Col>
            <h1 className="textRegister">Nombres :</h1>
            </Col>
            <Col md={8}>
            <Input
                className="inputStudent"
                name="nombres"
                value={values.nombres}
                onChange={handleChange}
            />
            </Col>
        </div>
        <div className="StudentsRegister">
            <Col>
            <h1 className="textRegister">Apellidos :</h1>
            </Col>
            <Col md={8}>
            <Input
                className="inputStudent"
                name="apellidos"
                value={values.apellidos}
                onChange={handleChange}
            />
            </Col>
        </div>
        <div className="StudentsRegister">
            <Col>
            <h1 className="textRegister">Correo :</h1>
            </Col>
            <Col md={8}>
            <Input
                className="inputStudentC"
                name="correo"
                value={values.correo}
                onChange={handleChange}
            />
            </Col>
        </div>
        <div className="StudentsRegister">
            <Col>
            <h1 className="textRegister">Documento :</h1>
            </Col>
            <Col md={8}>
            <Input
                className="inputStudent"
                name="Documento"
                value={values.Documento}
                onChange={handleChange}
            />
            </Col>
        </div>
        <div className="StudentsRegister">
            <Col>
            <h1 className="textRegister">Semestre :</h1>
            </Col>
            <Col md={8}>
            <Input
                className="inputStudent"
                name="semestre"
                value={values.semestre}
                onChange={handleChange}
            />
            </Col>
        </div>
        <div className="SButton">
            <SaveButton type="submit"  handleSubmit={handleSubmit}/>
        </div>
        </Form>
        )}
        </Formik>
    </div>
    );
};
