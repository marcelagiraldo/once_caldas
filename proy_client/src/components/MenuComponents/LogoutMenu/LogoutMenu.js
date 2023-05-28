import React from 'react';
import "./LogoutMenu.scss"

import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: <a href="https://www.antgroup.com">Gestión</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">Asistencia Grupal</a>,
    key: '1',
  },
  {
    label: <a href="https://www.aliyun.com">Logout</a>,
    key: '2',
  }

];
export const LogoutMenu = (props) => (

  <Dropdown className='dropD'
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a className='Logout' onClick={(e) => e.preventDefault()}>
      <Space>
        {props.userName}
        <UserOutlined className='logout__logo' />
      </Space>
    </a>
  </Dropdown>
);
