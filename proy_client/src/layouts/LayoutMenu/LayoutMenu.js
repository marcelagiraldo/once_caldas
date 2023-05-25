/* rafc */
import React from 'react'
import "./LayoutMenu.scss"
import { FooterPage } from '../../components/FooterPage/FooterPage';
import { Layout } from 'antd';

export const LayoutMenu = (props) => {
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

