import React from "react";
import { DashboardTop } from "../../../components/TopComponents/DashboardTop/DashboardTop";
import "./StudentsRegister.scss";
import { Col, Input } from "antd";
import { SaveButton } from "../../../components/UsersComponents/SaveButton/SaveButton";
import { Auth } from "../../../api/auth"; 
import { useFormik } from 'formik';


export const StudentsRegister = () => {
    const formik = useFormik({
    initialValues: {
        nombres: '',
        apellidos: '',
        codigo: '',
        semestre: ''
    },
    onSubmit: async (values) => {
        try {
        await Auth.registerStudents(values);
        // Realiza alguna acción adicional después de registrar el estudiante
        } catch (error) {
        console.error(error);
        // Maneja el error de alguna forma apropiada
        }
    },
});

return (
    <div>
        <DashboardTop addtitle="ESTUDIANTES" userName="Lina Maria Montereal Mesa" />
        <form onSubmit={formik.handleSubmit}>
        <div className="FirstStudentsRegister">
            <Col>
            <h1 className="textRegister">Nombres :</h1>
            </Col>
            <Col md={8}>
            <Input
                className="inputStudent"
                name="nombres"
                value={formik.values.nombres}
                onChange={formik.handleChange}
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
                value={formik.values.apellidos}
                onChange={formik.handleChange}
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
                value={formik.values.correo}
                onChange={formik.handleChange}
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
                value={formik.values.Documento}
                onChange={formik.handleChange}
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
                value={formik.values.semestre}
                onChange={formik.handleChange}
            />
            </Col>
        </div>
        <div className="SButton">
            <SaveButton type="submit"  handleSubmit={formik.handleSubmit}/>
        </div>
        </form>
    </div>
    );
};
