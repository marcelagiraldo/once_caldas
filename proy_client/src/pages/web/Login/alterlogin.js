[3:27 a. m., 29/5/2023] Geraldine Romero: password: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/,
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener como mínimo 8 caracteres"
    ),
[3:38 a. m., 29/5/2023] Geraldine Romero: import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Login.scss';
import {FirstTop} from "../../../components/TopComponents/FirstTop/FirstTop"
import { Auth } from '../../../api/auth';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import { useAuth } from '../../../hooks';

const authController = new Auth();

export const Login = () => {
  const {login} = useAuth();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try{
      setError("");
      await authController.login(values);
      const response = await authController.login(values);
      login(response.access);
  } catch (error) {
      setError("Error en el servidor con validación de formato de evolución");
  }
};
  
  const [error, setError] = useState("");
  const formik = useFormik ({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (formValue) => {
        try{
            //setError("");
            const response = await authController.login(formValue);
            login(response.access);
            console.log(response);
        } catch (error) {
            setError("Error en el servidor con validación de formato de evolución");
        }
    },
});
  return (
    <div>
      <FirstTop addtitle="Inicio Sesion"/>
      <Form
        name="normal_login"
        layout="vertical"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onSubmit={formik.handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          {/* <label className='my-label'>Correo electrónico</label> */}
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="cédula/correo electrónico" 
                        autoComplete='email' 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.values.email}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          {/* <label className='my-label'>Contraseña</label> */}
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
            autoComplete='contraseña' 
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.contraseña}
            error={formik.values.contraseña}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={formik.isSubmitting}>
            Ingresar
          </Button>
        </Form.Item>
        {error && <p className='form-evolution__error'>{error}</p>}
      </Form>
    </div>
  )
};
