import React from 'react'
import OnceCaldas from "../../../assets/img/png/OnceCaldas.png";
import UAM from "../../../assets/img/png/UAM.png";
import "./MenuTop.scss"
import { Row, Col } from 'antd';
import { LogoutMenu } from '../../MenuComponents/LogoutMenu/LogoutMenu';

//MenuTop recibe las propiedades y se las comparte a menusider
//Las propiedades las recibe de LayoutGeneral
//propiedad: saber si el menu esta o no extendido
export const MenuTop = (props) => {
    const {addtitle, userName} = props;
  return (
    <div className='menu-top'>
       <Row>
      <Col xs={20} sm={12} md={8}>
      <img src={OnceCaldas} alt='Logo' className='Once-Logo'/>
      </Col>
      <Col xs={20} sm={12} md={7} className='ant-row-text'>
      <h2 className='text-out-menu' >{addtitle}</h2>
      
      </Col>
      <Col xs={20} sm={12} md={5}>
      <img src={UAM} alt='Logo' className='UAM-Logo'/>
      </Col>
      <Col md={4}>
      <Row>
      <LogoutMenu userName={userName}></LogoutMenu>
      {/* <UserOutlined className='userLogo' /> */}
      </Row>
      </Col>
      </Row>
    </div>
  )
}
