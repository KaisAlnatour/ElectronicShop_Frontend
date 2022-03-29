import React, { useEffect, useState } from "react";

import { Table, Row, Modal, Button, Col, Spin, Tooltip, Typography, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { columns } from './columns';
import AddProductModal from './add-modal';
import * as ProductServices from '../../services/product/index';

function Product() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [record, setRecord] = useState();
    const [product, setProduct] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);    

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setSpinning(true);
        (async () => {
            const data = await ProductServices.showAllProduct();            
            setProduct(data.data.data);            
            setSpinning(false);
        })();
    };
    const handleDelete = () => {
        (async () => {
            const data = await ProductServices.deleteProduct(record.id);            
            setDeleteModalVisible(false);
            getData();
            setSpinning(false);
        })();
    };
    const onFinish = (values) => {

        (async () => {
            await ProductServices.addProduct(values);
            getData();
        })();
    };
    const updateProduct = (values) => {

        (async () => {
            await ProductServices.updateProduct({ ...values, id: record.id });
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
                        <Tooltip title={'Delete product'}>
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
                        <Tooltip title={'Edit product'}>
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
                                    <PlusOutlined /> Create Product
                                </Row>
                            </Button>
                        </Row>
                        <Row>
                            <Table dataSource={product} columns={[...columns, actionColumn]} style={{
                                width: '100%',
                                padding: ' 16px 0 0',
                                borderRadius: '7px'
                            }} />
                        </Row>
                        <AddProductModal
                            isVisible={isModalVisible}
                            setVisible={setModalVisible}
                            addProduct={onFinish}
                            updateProduct={updateProduct}
                            formValues={record}
                            isUpdate={isUpdate}
                        />
                        <Modal
                            title='Delete product'
                            visible={isDeleteModalVisible}
                            onCancel={() => { setDeleteModalVisible(false); }}
                            onOk={() => handleDelete()}

                        >
                            <Typography.Text strong>
                                Are you Sure You Want To Delete This  Product ?
                            </Typography.Text>

                        </Modal>
                    </Spin>
                </Card>
            </div>
        </>
    );
}

export default Product;
