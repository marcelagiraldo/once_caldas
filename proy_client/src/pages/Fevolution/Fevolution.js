import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
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

export const Fevolution = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <div className='container'>
            <Form
            labelCol={{
            span: 10,
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
                    <Col >
                        
                    </Col>
                </Row>
                <Form.Item label="Diagnóstico médico">
                            <Select placeholder="Info api C01X">
                                <Select.Option value="demo">api</Select.Option>
                            </Select>
                        </Form.Item>
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

