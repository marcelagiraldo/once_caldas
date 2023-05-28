import React, { useState } from 'react'
import { LockOutlined} from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import './AdminRegister.scss';
import { FirstTop } from "../../../components/TopComponents/FirstTop/FirstTop"
import { Auth } from '../../../api/auth';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AdminRegisterForm.form';
/* import { useRef } from 'react'; */

const MyFormItemContext = React.createContext([]);
function toArr(str) {
    return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const authController = new Auth();

export const AdminRegister = () => {
    const [error, setError] = useState("");
    const onFinish = (value) => {
        console.log(value);
    };

    const formik = useFormik ({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (formValue) => {
            try{
                setError("");
                await authController.register(formValue);
            } catch (error) {
                setError("Error en el servidor con validación de formato de evolución");
            }
        },
    });

    return (
        <div>
            <FirstTop addtitle="Registro administrador"/>
        <Form name="form_item_path" layout="vertical" onSubmit={formik.handleSubmit} onFinish={onFinish} className='register-admin' >
            <MyFormItemGroup prefix={['user']}>
                <MyFormItemGroup prefix={['name']}>
                    <MyFormItem name="Nombre">
                        <label className='my-label'>Nombre</label>
                        <Input className='input-admin-register' 
                            autoComplete='nombre' 
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.nombre}
                            error={formik.values.nombre}
                        />
                    </MyFormItem>
                    <MyFormItem name="Apellidos">
                        <label className='my-label'>Apellidos</label>
                        <Input 
                            autoComplete='apellido' 
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.apellidos}
                            error={formik.values.apellidos}
                        />
                    </MyFormItem>
                    <MyFormItem name="email" 
                        rules={[
                                    {
                                        required: true,
                                        message: '¡Ingresa tu correo electrónico!',
                                    },
                                ]}
                    >
                        <label className='my-label'>Correo electrónico</label>
                        <Input autoComplete='nombre' 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.values.email}/>
                    </MyFormItem>
                    <MyFormItem name="contraseña" 
                            rules={[
                                        {
                                            required: true,
                                            message: '¡Ingresa tu contraseña!',
                                        },
                                    ]}
                    >
                        <label className='my-label'>Contraseña</label>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                            autoComplete='nombre' 
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.contraseña}
                            error={formik.values.contraseña}
                        />
                    </MyFormItem>
                    <MyFormItem name="contraseña2" 
                            rules={[
                                        {
                                            required: true,
                                            message: '¡Ingresa tu contraseña por segunda vez!',
                                        },
                                    ]}
                    >
                        <label className='my-label'>Rectifica tu contraseña</label>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                            autoComplete='nombre' 
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.verifica_contraseña}
                            error={formik.values.verifica_contraseña}
                        />
                    </MyFormItem>
                </MyFormItemGroup>
            </MyFormItemGroup>
            <Button type="primary" htmlType="submit" className="register-admin-form-button" loading={formik.isSubmitting}>
                Listo
            </Button>
            {error && <p className='register-admin__error'>{error}</p>}
        </Form>
        </div>
    );
};

