import React, { useState, useEffect } from 'react';
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    Checkbox 
} from 'antd';

import './Fevolution.scss';
import {DropdownGenero} from '../../../components/DropdownComponents/DropdownGender/DropdownGender';
import { DropdownDay } from '../../../components/DropdownComponents/DropdownDay/DropdownDay';
import { DropdownActivity } from '../../../components/DropdownComponents/DropdownActivity/DropdownActivity';

import { useFormik } from 'formik';
import { initialValues, validationSchema } from './FevolutionForm.form';
import { Auth } from '../../../api/auth';

const { TextArea } = Input;

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const authController = new Auth();

export const Fevolution = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [error, setError] = useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Actualizar cada segundo

        return () => {
            clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
        };
    }, []);

    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

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
        <Form className='form-evolution' onSubmit={formik.handleSubmit}>
            <Row>
                <h5 className='label-fecha'>Fecha: {formattedDate}</h5>
                <h5 className='label-fecha'>Hora: {formattedTime}</h5>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Diagnóstico médico</label>
                </Col>
                <Col flex="auto" md={8}>
                    <Form.Item style={{ flex: 1 }}>
                        <Select placeholder="Info api C01X" className='select'>
                            <Select.Option value="demo">api</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col md={4} >
                    <label className='custom-form-item'>Nombre Completo: </label>
                </Col>
                <Col md={19}>
                    <Input className="custom-input large" 
                        autoComplete='nombre' 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.nombre}
                        error={formik.values.nombre}
                        />
                </Col>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Documento:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" 
                        autoComplete='documento'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.documento}
                        error={formik.values.documento}
                        />
                </Col>
                <Col md={3} className='custom-label'>
                    <label>Fecha de nacimiento:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" 
                        autoComplete='fecha_nacimiento'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fecha_nacimiento}
                        error={formik.values.fecha_nacimiento}
                        />
                </Col>
            </Row>
            <Row>
                <Col md={3} className='custom-form-item'>
                    <label>Procedencia:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" 
                        autoComplete='procedencia'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.procedencia}
                        error={formik.values.procedencia}
                        />
                </Col>
                <Col md={3} className='custom-label'>
                    <label>EPS:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" 
                        autoComplete='eps'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.eps}
                        error={formik.values.eps}
                        />
                </Col>
            </Row>
            <Row>
                {/* 23 */}
                <Col md={4} className='custom-form-item'>
                    <label>Dirección de residencia:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" 
                        autoComplete='direccion'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.direccion}
                        error={formik.values.direccion}
                        />
                </Col>
                <Col md={3} className='custom-label'>
                    <label>Teléfono/Celular:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" 
                        autoComplete='telefono'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.telefono}
                        error={formik.values.telefono}
                        />
                </Col>
            </Row>
            <Row>
                {/* 23 */}
                <Col md={3} className='custom-form-item'>
                    <label>Posición de juego:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" 
                        autoComplete='posicion'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.posicion}
                        error={formik.values.posicion}
                        />
                </Col>
                <Col md={4} className='custom-label'>
                    <label>Tiempo de vinculación:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" 
                        autoComplete='tiempo_vinculacion'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.tiempo_vinculacion}
                        error={formik.values.tiempo_vinculacion}
                        />
                </Col>
            </Row>
            <Row>
                {/* 23 */}
                <Col md={3} className='custom-form-item'>
                    <label>Club de procedencia:</label>
                </Col>
                <Col md={9}>
                    <Input className="custom-input small" 
                        autoComplete='club_procedencia'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.club_procedencia}
                        error={formik.values.club_procedencia}
                        />
                </Col>
                <Col md={4} className='custom-label'>
                    <label>Ejercicio físico adicional:</label>
                </Col>
                <Col md={7}>
                    <Input className="custom-input small" 
                        autoComplete='ejercicio_adicional'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.ejercicio_adicional}
                        error={formik.values.ejercicio_adicional}
                        />
                </Col>
            </Row>
            <Row>
                <Col md={2} className='dropdown-gender'>
                    <DropdownGenero/>
                </Col>
                <Col md={2}></Col>
                <Col md={2} className='label-dropdown'>
                    <DropdownDay/>
                </Col> 
                <Col md={2}></Col>
                <Col md={5} className='label-dropdown'>
                    <DropdownActivity/>
                </Col>
            </Row>
            <Row className='label-text-area'>
                <label>Interpretación/Observación:</label>
            </Row>
            <Row>
                <TextArea rows={4} className='text-area'/>
            </Row>
            <Row>
                <Col >
                    <Checkbox onChange={onChange} className='checkbox'>Aprobado</Checkbox>
                </Col>
                <Col>
                    <Button className='btn-style-evolution' htmlType="submit" loading={formik.isSubmitting}>Guardar</Button>
                    {error && <p className='form-evolution__error'>{error}</p>}
                </Col>
            </Row>
        </Form>
    );
};


