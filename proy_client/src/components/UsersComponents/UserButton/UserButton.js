import { Button, Space } from 'antd';
import "./UserButton.scss"

export const UserButton = (props) => {
    const {PersonName} = props;
    return(
  <Space wrap className='UserSpace'>
    <Button type="primary" className='UserButton'>{PersonName}</Button>
  </Space>)
};