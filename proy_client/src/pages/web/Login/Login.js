import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Login.scss';
import {FirstTop} from "../../../components/TopComponents/FirstTop/FirstTop"
import { Auth } from '../../../api/auth';
import { Formik, useFormik } from 'formik';
import { useAuth } from '../../../hooks';
import * as Yup from "yup";

const authController = new Auth();

function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El correo no es válido")
      .required("Este campo es requerido"),
    password: Yup.string().required("Este campo es requerido"),
  });
}

export const Login = () => {
  const {login} = useAuth();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try{
      setError("");
      const response = await authController.login(values);
      authController.setAccessToken(response.access);
      login(response);
      window.location.href = '/admin/';
      console.log(response);
  } catch (error) {
      setError("Error en el servidor con validación de formato de evolución");
  }
};
  
  const [error, setError] = useState("");
  return (
    <div>
      <FirstTop addtitle="Inicio Sesion"/>
      <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema()}
      onFinish={onFinish}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("AQUI ESTOY");
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
        try {
          console.log("aqui estoy");
          await authController.login(values);
          console.log("aqui llego");
        } catch (error) {
          console.log(
            "Error en el servidor con validación de formato de evolución" +
              error
          );
      }
      
    }}
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
        <Form 
        onFinish={onFinish}
        onSubmit={handleSubmit} className="login-form">
          <Input
            className="formInput"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <Input
            className="formInput"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Contraseña"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <Button
            disabled={isSubmitting}
            htmlType="submit"
            className="login-form-button"
          >
            Ingresar
          </Button>
        </Form>
      )}
    </Formik>
    </div>
  )
};
