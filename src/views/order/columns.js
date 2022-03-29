import React from 'react';
import { Row } from "antd";

export const columns = [
    
    {
        dataIndex: 'customer',
        title: 'Customer',
        render: (text, record, index) => {
            return (
                <>
                    <Row>
                        {record?.customer?.firstName + ' ' + record?.customer?.lastName}
                    </Row>
                </>
            );
        },
    },
    {
        dataIndex: 'orderDate',
        title: 'Order Date',
    },
    {
        dataIndex: 'orderNumber',
        title: 'Order Number',
    },
    {
        dataIndex: 'TotalAmount',
        title: 'Total Amount',
    }
];
