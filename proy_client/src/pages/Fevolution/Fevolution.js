import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import { useState } from 'react';
import './Fevolution.scss';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const FormDisabledDemo = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <div className='container'>
            <Form
            labelCol={{
            span: 4,
            }}
            wrapperCol={{
            span: 14,
            }}
            layout="horizontal"
            //disabled={componentDisabled}
            style={{
            maxWidth: 600,
            }}
            >
                <h5 className='label-fecha'>Fecha: </h5>
                <h5 className='label-fecha'>Hora: </h5>
                <Row>
                    <Col xs={4} sm={4} md={6} >
                        <label className='label-izquierda'>Diagnóstico médico</label>
                    </Col>
                    <Col xs={4} sm={4} md={6}>
                        <Form.Item className="custom-form-item">
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Nombre Completo">
                    <Input />
                </Form.Item>
                <Form.Item label="Documento">
                    <Input />
                </Form.Item>
                <Form.Item label="Fecha de nacimiento">
                    <Input />
                </Form.Item>
                <Form.Item label="Procedencia">
                    <Input />
                </Form.Item>
                <Form.Item label="EPS">
                    <Input />
                </Form.Item>
                <Form.Item label="Dirección de residencia">
                    <Input />
                </Form.Item>
                <Form.Item label="Teléfono/Celular">
                    <Input />
                </Form.Item>
                <Form.Item label="Posicioón de juego">
                    <Input />
                </Form.Item>
                <Form.Item label="Tiempo de vinculación">
                    <Input />
                </Form.Item>
                <Form.Item label="Club de procedencia">
                    <Input />
                </Form.Item>
                <Form.Item label="Ejercicio físico adicional">
                    <Input />
                </Form.Item>
                <Form.Item label="Interpretación/Observación">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Button">
                <Button>Salir</Button>
                </Form.Item>
            </Form>
        </div>
        
    );
};

//export default () => <FormDisabledDemo />;
export default FormDisabledDemo;
