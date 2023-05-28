import React, { useState } from 'react';
import { Button, Space } from 'antd';
import Dropdown from 'antd/es/dropdown';
import { DownOutlined} from '@ant-design/icons';
import './DropdownGender.scss';

const items = [
    {
        label: 'Masculino',
        key: '1',
    },
    {
        label: 'Femenino',
        key: '2',
    },
    {
        label: 'Otro',
        key: '2',
    },
];

export const DropdownGenero = () => {
    const [selectedOption, setSelectedOption] = useState('Género');

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




