import React from 'react';
import {  HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import "./MenuSider.scss"

export const MenuSider = (props) => {
    const {Sider} = Layout;
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key:"jugadores",icon:<HomeOutlined/>, label: "Gestion Jugadores",subMenu:[
            {key:"jugadores/lista",icon:<TeamOutlined/>,label:"Lista jugadores"},
            {key:"jugadores/new",icon:<TeamOutlined/>,label:"Nuevo jugador"}
        ]},
        {key: "jugador", icon: <TeamOutlined/>,label:"Jugadores",subMenu:[
            {key:"jugadores/incial",icon:<TeamOutlined/>,label:"F.Inicial"},
            {key:"jugadores/clinico",icon:<TeamOutlined/>,label:"F.Clínico"},
            {key:"jugadores/evolucion",icon:<TeamOutlined/>,label:"F.Evolución"}
        ]},
        { key:"estudiantes",icon:<HomeOutlined/>, label: "Gestion estudiantes",subMenu:[
            {key:"estudiantes/lista",icon:<TeamOutlined/>,label:"Lista estudiantes"},
            {key:"estudiantes/new",icon:<TeamOutlined/>,label:"Nuevo estudiante"}
        ]},
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

