import React from 'react';
import { Row } from "antd";

export const columns = [
    // {
    //     dataIndex: 'id',
    //     title: 'Id',
    // },
    // {
    //     dataIndex: 'name',
    //     title: 'Name',
    //     render: (text, record, index) => {
    //         return (
    //             <>
    //                 <Row>
    //                     {record.name }
    //                 </Row>
    //             </>
    //         );
    //     },
    // },
    // {
    //     dataIndex: 'stock_price',
    //     title: 'Email',
    //     render: (text, record, index) => {
    //         return (
    //             <>
    //                 <Row>
    //                     {record.stock_price}
    //                 </Row>
    //             </>
    //         );
    //     },
    // },
    {
        dataIndex: 'name',
        title: 'name',
    },
    {
        dataIndex: 'stockPrice',
        title: 'stock_price',
    },
    {
        dataIndex: 'stockCount',
        title: 'stock_count',
    },        
    {
        dataIndex: 'sellingPrice',
        title: 'selling_price',
    },
    {
        dataIndex: 'saleType',
        title: 'saleType',
    },
    {
        dataIndex: 'sellDate',
        title: 'sell_date',
    },



    // {
    //     dataIndex: 'description',
    //     title: 'Description',
    //     render: (text, record, index) => {
    //         return (
    //             <>
    //                 <Row>
    //                     {record.description ? record.description : ' - '}
    //                 </Row>
    //             </>
    //         );
    //     },
    // },


];
