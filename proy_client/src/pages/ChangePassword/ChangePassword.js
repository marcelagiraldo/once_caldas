import React from 'react'
import { LockOutlined} from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import './ChangePassword.scss';
<<<<<<< HEAD
import { FirstTop } from "../../components/TopComponents/FirstTop/FirstTop"
=======
>>>>>>> f337300 (register admin & change password)
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

<<<<<<< HEAD
export const ChangePassword = () => {
=======
const App = () => {
>>>>>>> f337300 (register admin & change password)
    const onFinish = (value) => {
        console.log(value);
    };

    return (
<<<<<<< HEAD
        <div>
            <FirstTop addtitle="Cambio Contraseña"/>
=======
>>>>>>> f337300 (register admin & change password)
        <Form name="form_item_path" layout="vertical" onFinish={onFinish} className='change-password' >
            <MyFormItemGroup prefix={['user']}>
                <MyFormItemGroup prefix={['name']}>
                    <MyFormItem name="email" 
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Ingresa tu correo electrónico!',
                                    },
                                ]}>
                        <label className='my-label'>Correo electrónico</label>
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="contraseña" 
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Ingresa tu contraseña!',
                                    },
                                ]}>
                        <label className='my-label'>Nueva contraseña</label>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}/>
                    </MyFormItem>
                    <MyFormItem name="contraseña2" 
                        rules={[
                                    {
                                        required: true,
                                        message: '¡Ingresa tu contraseña de nuevo!',
                                    },
                                ]}
                    >
                        <label className='my-label'>Repetir nueva contraseña</label>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}/>
                    </MyFormItem>
                </MyFormItemGroup>
            </MyFormItemGroup>
            <Button type="primary" htmlType="submit" className="register-admin-form-button">
                Listo
            </Button>
        </Form>
<<<<<<< HEAD
        </div>
    );
};
=======
    );
};

export default App;
>>>>>>> f337300 (register admin & change password)
