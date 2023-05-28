import { Dropdown, Button, Space } from 'antd';
import React, { useState } from 'react';
import { DownOutlined} from '@ant-design/icons';
import './DropdownDay.scss';

const items = [
    {
        label: 'Mañana',
        key: '1',
    },
    {
        label: 'Tarde',
        key: '2',
    },
];

export const DropdownDay = () => {
    const [selectedOption, setSelectedOption] = useState('Jornada');

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
                        {selectedOption}
                        <DownOutlined />
                    </Space>
            </Button>
        </Dropdown>
    )
};
