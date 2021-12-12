import React, { useEffect, useState } from "react";

import { Table, Row, Modal, Button, Col, Spin, Tooltip, Typography, Card, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { columns } from './columns';
import AddEstatesModal from './add-modal';
import * as EstatesServices from '../../services/estates/index';
import { Select } from 'antd';
import Search from "antd/lib/transfer/search";

const { Option } = Select;
function Estates() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [spinning, setSpinning] = useState(true);
    const [record, setRecord] = useState();
    const [estates, setEstate] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [valueFilter, setValueFilter] = useState(false);
    const [valueSelect, setValueSelect] = useState(false);
    var estate_name;
    var price;
    var stock_count;



    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setSpinning(true);
        (async () => {
            const data = await EstatesServices.showAll();
            console.log(data.data)
            setEstate(data.data);
            setSpinning(false);
        })();
    };
    const handleDelete = () => {
        (async () => {
            const data = await EstatesServices.buyEstates([record.id]);
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
            await EstatesServices.updateEstates( values );
            setModalVisible(false);
            getData();

        })();
    };

    function handleChangeSelect(value) {
        setValueSelect(value.value)
    }

    const filterEstates = () => {

        valueSelect == "estate_name" ? estate_name = valueFilter : estate_name = ""
        valueSelect == "price" ? price = valueFilter : price = ""
        valueSelect == "stock_count" ? stock_count = valueFilter : stock_count = ""

        const data  = { "estate_name" : estate_name , "price" : price , "stock_count" : stock_count};
        
        (async () => {
            const dataApi = await EstatesServices.filterEstates(data);
            console.log(dataApi.data)
            setEstate(dataApi.data);
            // getData();
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
                                {/* <DeleteOutlined /> */}
                                <i class="fas fa-shopping-cart"></i>
                            </Button>
                        </Tooltip>
                    </Col>
                    {/* <Col>
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
                    </Col> */}
                </Row>
            );
        },
    };

    return (
        <>
            <div className="content">
                <Card style={{ minHeight: '85vh', borderRadius: '5px' }}>
                    <Spin spinning={spinning} >
                        <Row gutter={36} justify='space-between'>
                            <Col sm={36} lg={12}>
                                <Select
                                    labelInValue
                                    defaultValue={{ value: 'price' }}
                                    style={{ width: 150 }}
                                    onChange={handleChangeSelect}
                                >
                                    <Option value="price"> price </Option>
                                    <Option value="estate_name"> Estate Name </Option>
                                    <Option value="stock_count"> Stock Count </Option>

                                </Select>
                            </Col>
                            <Col sm={36} lg={12}>
                                <Input
                                    // ref={node => {
                                    //     this.searchInput = node;
                                    // }}
                                    // placeholder="Search"
                                    // value={selectedKeys[0]}
                                    onChange={e => setValueFilter(e.target.value ? e.target.value : [])}
                                    // onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                                />
                            </Col>
                            <Col sm={36} lg={12}>
                                <Row justify='end' align='middle'>
                                    <Button type='primary' onClick={filterEstates} >
                                        <Row align='middle'>
                                            Filter
                                        </Row>
                                    </Button>
                                </Row>
                            </Col>
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
                            title='Buy  Estates'
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
