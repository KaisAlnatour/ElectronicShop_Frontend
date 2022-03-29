import React, { useEffect, useState } from 'react';
import { Row, Modal, Button, Form, Input, Col, Tabs, DatePicker } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;

const AddOrderModal = ({ isVisible, setVisible, addOrder, formValues, updateOrder, isUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = values;
        data.orderDate = moment(values.orderDate).format("YYYY/MM/DD");
        setLoading(true);
        if (isUpdate) {
            (async () => {
                await updateOrder(data);
                setLoading(false);
            })();
        } else {
            (async () => {
                await addOrder(data);
                setLoading(false);
            })();
        }
    };

    useEffect(() => {
        if (isUpdate) {
            form.setFieldsValue({
                customerId: formValues.customerId,
                orderDate: moment(formValues.orderDate),                
                orderNumber: formValues.orderNumber,
                TotalAmount: formValues.TotalAmount,
            });
        } else {
            form.resetFields();
        }

    }, [formValues, form, isUpdate]);
    return (
        <>
            <Modal
                title='Create Order'
                visible={isVisible}
                onCancel={() => { setVisible(false); form.resetFields(); }}
                okButtonProps={{ hidden: true }}
                cancelButtonProps={{ hidden: true }}
                width={675}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Tabs >
                        <TabPane key='info  ' tab="Info" >

                            <Row gutter={24} justify='space-between'>
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="customerId"
                                        name="customerId"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add customerId!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="Order Date"
                                        name="orderDate"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Start Date!',
                                            },
                                        ]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                {/* <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="orderDate"
                                        name="orderDate"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add orderDate !',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item> 
                                </Col> */}
                            </Row>
                            <Row gutter={24} justify='space-between'>
                                <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="orderNumber"
                                        name="orderNumber"           
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="TotalAmount"
                                        name="TotalAmount"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                            </Row>
                        </TabPane>

                    </Tabs>
                    <Row justify='end'>
                        <Col style={{ margin: '0 8px 0 0' }}>
                            <Form.Item >
                                <Button htmlType="button" onClick={() => {
                                    setVisible(false);
                                }}>
                                    Close
                                </Button>
                            </Form.Item>
                        </Col>
                        <Form.Item>
                            <Col>
                                <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
                                    {isUpdate ? 'Update' : 'Add'}
                                </Button>
                            </Col>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </>
    );

};

export default AddOrderModal;