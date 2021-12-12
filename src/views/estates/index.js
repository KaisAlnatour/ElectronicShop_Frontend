import React, { useEffect, useState } from "react";

import { Table, Row, Modal, Button, Col, Spin, Tooltip, Typography, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { columns } from './columns';
import AddEstatesModal from './add-modal';
import * as EstatesServices from '../../services/estates/index';

function Estates() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [record, setRecord] = useState();
    const [estates, setEstate] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setSpinning(true);
        (async () => {
            const data = await EstatesServices.showAllEstates();
            setEstate(data.data);
            setSpinning(false);
        })();
    };
    const handleDelete = () => {
        (async () => {
            const data = await EstatesServices.deleteEstates(record.id);
            // setEstate(data.data);
            setDeleteModalVisible(false);
            getData();
            setSpinning(false);
        })();
    };
    const onFinish = (values) => {

        (async () => {
            await EstatesServices.addEstates(values);
            getData();
        })();
    };
    const updateEstates = (values) => {

        (async () => {
            await EstatesServices.updateEstates({ ...values, userID: record.userID, trainerID: record.id });
            setModalVisible(false);
            getData();

        })();
    };
    const actionColumn = {
        key: 'actions',
        width: '13%',
        className: 'actions',
        render: (text, record, index) => {
            return (
                <Row justify="space-between">
                    <Col>
                        <Tooltip title={'Delete Estate'}>
                            <Button
                                type='link'
                                danger
                                size="small"
                                shape="circle"
                                onClick={() => {
                                    setDeleteModalVisible(true);
                                    setRecord(record);
                                }}
                            >
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip title={'EditEstate'}>
                            <Button
                                type='link'
                                size="small"
                                shape="circle"
                                onClick={() => {
                                    setRecord(record);
                                    setModalVisible(true);
                                    setIsUpdate(true);
                                }}
                            >
                                <EditOutlined />
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
            );
        },
    };


    return (
        <>
            <div className="content">
                <Card style={{ minHeight: '85vh', borderRadius: '5px' }}>
                    <Spin spinning={spinning} >
                        <Row justify='end' align='middle'>

                            <Button type='primary' onClick={() => { setModalVisible(true); setIsUpdate(false); }} >
                                <Row align='middle'>
                                    <PlusOutlined /> Add  Estates
                                </Row>
                            </Button>
                        </Row>
                        <Row>
                            <Table dataSource={estates} columns={[...columns, actionColumn]} style={{
                                width: '100%',
                                padding: ' 16px 0 0',
                                borderRadius: '7px'
                            }} />
                        </Row>
                        <AddEstatesModal
                            isVisible={isModalVisible}
                            setVisible={setModalVisible}
                            addEstates={onFinish}
                            updateEstates={updateEstates}
                            formValues={record}
                            isUpdate={isUpdate}
                        />
                        <Modal
                            title='Delete  Estates'
                            visible={isDeleteModalVisible}
                            onCancel={() => { setDeleteModalVisible(false); }}
                            onOk={() => handleDelete()}

                        >
                            <Typography.Text strong>
                                Are you Sure You Want To Delete This  Estates ?
                            </Typography.Text>

                        </Modal>
                    </Spin>
                </Card>
            </div>
        </>
    );
}

export default Estates;
