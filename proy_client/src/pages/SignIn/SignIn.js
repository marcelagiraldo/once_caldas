import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './SignIn.scss'
import {FirstTop} from "../../components/TopComponents/FirstTop/FirstTop"

export const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
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
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          {/* <label className='my-label'>Correo electrónico</label> */}
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="cédula/correo electrónico" />
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
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
