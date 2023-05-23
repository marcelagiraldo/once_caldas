import { PlusOutlined } from '@ant-design/icons';
import { MenuTop } from "../../components/TopComponents/MenuTop/MenuTop"
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
    return (
        <div className='container'>
            <MenuTop addtitle='F.EVOLUCIÓN' userName='Lina Marin Montealegre Mesa'/>
            <Row>
                <h5 className='label-fecha'>Fecha: </h5>
                <h5 className='label-fecha'>Hora: </h5>
            </Row>
            <Row>
                <Col className='custom-form-item' flex="auto" md={8}>
                    <Form.Item label="Diagnóstico médico" style={{ flex: 1 }}>
                        <Select placeholder="Info api C01X" >
                            <Select.Option value="demo">api</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Nombre Completo: </label>
                </Col>
                <Col md={19}>
                    <Input className="custom-input large" />
                </Col>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Documento:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" />
                </Col>
                <Col md={3} className='custom-label'>
                    <label>Fecha de nacimiento:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" />
                </Col>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Procedencia:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" />
                </Col>
                <Col md={3} className='custom-label'>
                    <label>EPS:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" />
                </Col>
            </Row>
            <Row>
                <Col md={4} className='custom-form-item'>
                    <label>Dirección de residencia:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" />
                </Col>
                <Col md={3} className='custom-label'>
                    <label>Teléfono/Celular:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" />
                </Col>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Posición de juego:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" />
                </Col>
                <Col md={4} className='custom-label'>
                    <label>Tiempo de vinculación:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" />
                </Col>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Club de procedencia:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" />
                </Col>
                <Col md={4} className='custom-label'>
                    <label>Ejercicio físico adicional:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" />
                </Col>
            </Row>
            <Row className='label-text-area'>
                <label >Interpretación/Observación:</label>
            </Row>
            <Row>
                <TextArea rows={4} className='text-area'/>
            </Row>
            <Row className='btn-position-evolution'>
                <Button className='btn-style-evolution'>Salir</Button>
            </Row>
        </div>
    );
};

//export default () => <FormDisabledDemo />;

