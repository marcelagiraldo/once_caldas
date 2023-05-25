/* rafc */
import React, { useState } from 'react'
import { MenuSider } from '../../components/MenuComponents/MenuSider/MenuSider';
import { MenuTop } from '../../components/MenuComponents/MenuTop/MenuTop';
import "./LayoutGenreral.scss"
import { FooterPage } from '../../components/FooterPage/FooterPage';
import { Layout } from 'antd';

export const LayoutGenreal = (props) => {
  const {children} = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const {Header,Content,Footer} = Layout;

  return (
    <Layout>
      <MenuSider menuCollapsed = {menuCollapsed}/>
      <Layout className='general-layout'>
        <Header className='general-layout-header'>
          <MenuTop
            menuCollapsed = {menuCollapsed}
            setMenuCollapsed = {setMenuCollapsed}
          />
          {/* <Logout className="general-layout-header-logout"></Logout> */}
        </Header>
        <Content className='general-loyout-content'>{children}</Content>
        <Footer className='general-layout-footer'>
          <FooterPage></FooterPage>
        </Footer>
      </Layout>
    </Layout>
  );
};

