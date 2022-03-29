import React from 'react';
import { Row } from "antd";

export const columns = [

    {
        dataIndex: 'supplier',
        title: 'Supplier',
        render: (text, record, index) => {
            return (
                <>
                    <Row>
                        {record?.supplier?.companyName}
                    </Row>
                </>
            );
        },
    },
    {
        dataIndex: 'productName',
        title: 'Product Name',
    },
    {
        dataIndex: 'unitPrice',
        title: 'Unit Price',
    }
];
