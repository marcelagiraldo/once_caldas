import React from 'react'
import OnceCaldas from "../../../assets/img/png/OnceCaldas.png"
import UAM from "../../../assets/img/png/UAM.png";
import "./FirstTop.scss"
import { Col, Row } from 'antd';

//MenuTop recibe las propiedades y se las comparte a menusider
//Las propiedades las recibe de LayoutGeneral
//propiedad: saber si el menu esta o no extendido
export const FirstTop = (props) => {
    const {addtitle} = props;
  return (
    <div className='FirstTop'>
         <Row>
      <Col xs={24} sm={12} md={8}>
      <img src={OnceCaldas} alt='Logo' className='Logo'/>
      </Col>
      <Col xs={24} sm={12} md={8} className='ant-row-text'>
      <h2 className='text-out' >{addtitle}</h2>
      
      </Col>
      <Col xs={24} sm={12} md={8}>
      <img src={UAM} alt='Logo' className='Logo-UAM'/>
      </Col>
      </Row>
    </div>
  )
}

