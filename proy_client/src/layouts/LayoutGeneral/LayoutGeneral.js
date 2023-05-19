/* rafc */
import React from 'react'
import "./LayoutGeneral.scss"
import { FooterPage } from '../../components/FooterPage/FooterPage';
import { Layout } from 'antd';

export const LayoutGeneral = (props) => {
  const {children} = props;
  const {Header,Content,Footer} = Layout;

  return (
    <Layout>
      <Layout className='InicioLayout'>
        <Header className='InicioLayout-header'>  </Header>
        <Content className='InicioLayout-content'>{children}</Content>
        <Footer className='InicioLayout-footer'><FooterPage/></Footer>
      </Layout>
    </Layout>
  );
};

