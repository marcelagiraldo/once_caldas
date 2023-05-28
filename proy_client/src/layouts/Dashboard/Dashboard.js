/* rafc */
import React from 'react'
import { DashboardSider } from '../../components/MenuComponents/DashboardSider/DashboardSider';
import "./Dashboard.scss"
import { FooterPage } from '../../components/FooterPage/FooterPage';
import { Layout } from 'antd';

export const Dashboard = (props) => {
  const {children} = props;
  const {Content,Footer} = Layout;

  return (
    <Layout>  
      <DashboardSider/>
      <Layout className='Dashboard'>
        <Content className='Dashboard-content'>{children}</Content>
        <Footer className='Dashboard-footer'><FooterPage/></Footer>
      </Layout>
    </Layout>
  );
};
