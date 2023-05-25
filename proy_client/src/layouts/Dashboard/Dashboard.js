/* rafc */
import React from 'react'
import { DashboardSider } from '../../components/MenuComponents/DashboardSider/DashboardSider';
import { MenuTop } from '../../components/MenuComponents/MenuTop/MenuTop';
import "./Dashboard.scss"
import { FooterPage } from '../../components/FooterPage/FooterPage';
import { Layout } from 'antd';

export const Dashboard = (props) => {
  const {children} = props;
  const {Header,Content,Footer} = Layout;

  return (
    <Layout>
      <DashboardSider/>
      <Layout className='Dashboard'>
        <Header className='Dashboard-header'>
          <MenuTop/>
        </Header>
        <Content className='Dashboard-content'>{children}</Content>
        <Footer className='Dashboard-footer'><FooterPage/></Footer>
      </Layout>
    </Layout>
  );
};
