import React from 'react';
import { Row } from "antd";

export const columns = [
    // {
    //     dataIndex: 'id',
    //     title: 'Id',
    // },
    {
        dataIndex: 'firstName',
        title: 'Name',
        render: (text, record, index) => {
            return (
                <>
                    <Row>
                        {record.firstName + ' ' + record.lastName}
                    </Row>
                </>
            );
        },
    },
    {
        dataIndex: 'email',
        title: 'Email',
        render: (text, record, index) => {
            return (
                <>
                    <Row>
                        {record.user.email}
                    </Row>
                </>
            );
        },
    },
    {
        dataIndex: 'location',
        title: 'Location',
    },
    {
        dataIndex: 'specialization',
        title: 'Specialization',
    },
    {
        dataIndex: 'phone',
        title: 'PhoneNumber',
    },
    {
        dataIndex: 'description',
        title: 'Description',
        render: (text, record, index) => {
            return (
                <>
                    <Row>
                        {record.description ? record.description : ' - '}
                    </Row>
                </>
            );
        },
    },


];
