import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import './SignIn.scss'
import OnceCaldas from "../../assets/img/png/OnceCaldas.png";
import UAM from "../../assets/img/png/UAM.png";
import {FooterPage} from "../../components/FooterPage/FooterPage"
const SignIn = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <div>
      <Row>
      <Col xs={24} sm={12} md={8}>
      <img src={OnceCaldas} alt='Logo' className='Logo'/>
      </Col>
      <Col xs={24} sm={12} md={8}>
      <h2 className='text-out' >Inicio de Sesión</h2>
      </Col>
      <Col xs={24} sm={12} md={8}>
      <img src={UAM} alt='Logo' className='Logo-UAM'/>
      </Col>
      </Row>
    <Form
    name="normal_login"
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
    <FooterPage/>
    </div>
  )
}

export default SignIn
