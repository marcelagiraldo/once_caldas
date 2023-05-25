import React from 'react';
import {  HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import "./DashboardSider.scss"

export const DashboardSider = (props) => {
    const {Sider} = Layout;
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key:"jugadores",icon:<HomeOutlined/>, label: "Gestion Jugadores",subMenu:[
            {key:"jugadores/lista",icon:<TeamOutlined/>,label:"Lista jugadores"},
            {key:"jugadores/new",icon:<TeamOutlined/>,label:"Nuevo jugador"}
        ]},
        { key:"estudiantes",icon:<HomeOutlined/>, label: "Gestion estudiantes",subMenu:[
            {key:"estudiantes/lista",icon:<TeamOutlined/>,label:"Lista estudiantes"},
            {key:"estudiantes/new",icon:<TeamOutlined/>,label:"Nuevo estudiante"}
        ]},
        {key:"admin-register",icon:<HomeOutlined/>, label: "Admin"}
    ];
    const navigateTo = (e) => {
        const path = e.key;
        console.log(path);
        navigate(path);
    };
    const itemRender = (item,index)=>{
        const {icon,label,subMenu} = item;
        const isSelected = location.pathname === item.key;
        if (subMenu){
            return (
                <Menu.SubMenu key={item.key} icon={icon} title={label}>
                    {subMenu.map((subMenuItem)=>(
                        <Menu.Item key={subMenuItem.key} onClick={navigateTo}>
                            {subMenuItem.label}
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            );
        }
        return (
            <Menu.Item key={item.key} icon={React.cloneElement(icon,{className: "menu-item-icon"})}
            className={
                isSelected ? "ant-menu-item ant-menu-item-selected" : "ant-menu-item"
            }>{label}</Menu.Item>
        );
    };
  return (
    <Sider className='menu-sider' collapsed={props.menuCollapsed} width={200}>
        <Menu mode='inline' onClick={navigateTo} defaultSelectedKeys={[]} style={{ height: '100%', borderRight: 0 }}>
            {menuItems.map((item)=>itemRender(item))}
        </Menu>
    </Sider>
  );
}
