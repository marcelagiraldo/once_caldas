import { Dropdown, Button, Space } from 'antd';
import React, { useState } from 'react';
import { DownOutlined} from '@ant-design/icons';
import './DropdownActivity.scss';

const items = [
    {
        label: 'Educativo',
        key: '1',
    },
    {
        label: 'Preventivo',
        key: '2',
    },
];

export const DropdownActivity = () => {
    const [selectedOption, setSelectedOption] = useState('Tipo de actividad realizada');

    const handleMenuClick = (e) => {
        const selectedKey = e.key;
        const selectedItem = items.find((item) => item.key === selectedKey);
        setSelectedOption(selectedItem.label);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Dropdown menu={menuProps}>
            <Button>
                    <Space>
                        <label className="label">{selectedOption}</label>
                        <DownOutlined />
                    </Space>
            </Button>
        </Dropdown>
    )
};
