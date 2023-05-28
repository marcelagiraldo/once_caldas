import React from 'react'
import { FirstTop } from '../../components/TopComponents/FirstTop/FirstTop';
import { LockOutlined} from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import './AdminRegister.scss';
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

export const AdminRegister = () => {
    const onFinish = (value) => {
        console.log(value);
    };

    /* const formRef = useRef();
    const validatePassword = (_, value) => {
        const password = formRef.current.getFieldValue('contraseña'); // Obtiene el valor de la contraseña
        if (value !== password) {
            return Promise.reject(new Error('Las contraseñas no coinciden')); // Devuelve un error si las contraseñas no coinciden
        }
        return Promise.resolve(); // Devuelve una promesa resuelta si las contraseñas coinciden
    };
 */
    return (
        <div >
            <FirstTop addtitle="Registro Administrador"/>
        <Form name="form_item_path" layout="vertical" onFinish={onFinish} className='register-admin' >
            <MyFormItemGroup prefix={['user']}>
                <MyFormItemGroup prefix={['name']}>
                    <MyFormItem name="Nombre">
                        <label className='my-label'>Nombre</label>
                        <Input className='input-admin-register'/>
                    </MyFormItem>
                    <MyFormItem name="Apellidos">
                        <label className='my-label'>Apellidos</label>
                        <Input />
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
                        <Input />
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
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}/>
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
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}/>
                    </MyFormItem>
                </MyFormItemGroup>
            </MyFormItemGroup>
            <Button type="primary" htmlType="submit" className="register-admin-form-button">
                Listo
            </Button>
        </Form>
        </div>
    );
};

