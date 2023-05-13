import React from 'react'
import { Col, Row } from 'antd'
import "./FooterPage.scss"
import { EnvironmentFilled, InfoCircleFilled, MailFilled, PhoneFilled } from '@ant-design/icons'

export const FooterPage = () => {
    return (
        <footer className="footer">
            <div className='container'>
                <Row gutter={[20,20]}>
                    <Col xs={24} sm={12} md={12}>
                        <h4 className='h'>DATOS DE CONTACTO</h4>
                        <p><EnvironmentFilled /> Sede social: Estadio Palogrande Puerta 18. Tercer Piso Cra. 25 N° 64-00. Manizales, Colombia</p>
                        <p><PhoneFilled /> Teléfono: (+57) 3116448565</p>
                        <p><MailFilled /> contacto@oncecaldas.com.co</p>
                        <p><InfoCircleFilled /> Nit: 890801447-5</p>
                    </Col>
                </Row>
            </div>
            <div className='footer-bottom'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <p className='text-center'>
                                Copyright © {new Date().getFullYear()} | Once Caldas DAF
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

