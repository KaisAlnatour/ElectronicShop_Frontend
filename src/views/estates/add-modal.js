import React, { useEffect, useState } from 'react';
import { Row, Modal, Button, Form, Input, Col, Tabs, InputNumber } from 'antd';
const { TabPane } = Tabs;

const AddEstatesModal = ({ isVisible, setVisible, addEstates, formValues, updateEstates, isUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = values;
        setLoading(true);
        if (isUpdate) {
            (async () => {
                await updateEstates(data);
                setLoading(false);
            })();
        } else {
            (async () => {
                await addEstates(data);
                setLoading(false);
            })();
        }
    };

    useEffect(() => {
        if (isUpdate) {
            form.setFieldsValue({
                name: formValues.name,
                stock_price: formValues.stock_price,
                stock_count: formValues.stock_count,
            });
        } else {
            form.resetFields();
        }

    }, [formValues, form, isUpdate]);
    return (
        <>
            <Modal
                title='Add Estates'
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
                                        label="name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="stock_price"
                                        name="stock_price"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Stock Price !',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item> </Col>
                            </Row>
                            <Row gutter={24} justify='space-between'>
                                {/* <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="investor_name"
                                        name="investor_name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Investor Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col> */}

                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="stock_count"
                                        name="stock_count"
                                        // rules={[
                                        //     {
                                        //         required: true,
                                        //         message: 'Please Add Stock Count!',
                                        //     },
                                        // ]}
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

export default AddEstatesModal;