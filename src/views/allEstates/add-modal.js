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
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                user_name: formValues?.user?.name,
                userID: formValues?.user?.id,
                email: formValues?.user?.email,
                phone: formValues.phone,
                age: formValues.age,
                description: formValues.description,
                location: formValues.location,
                specialization: formValues.specialization,
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
                                        label="First Name"
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add First Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="Last Name"
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Last Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item> </Col>
                            </Row>
                            <Row gutter={24} justify='space-between'>
                                <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="User Name"
                                        name="userName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add User Name!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Email!',
                                            },
                                        ]}
                                    >
                                        <Input type='email' />
                                    </Form.Item>
                                </Col>

                            </Row>
                            {!isUpdate && <Row gutter={24} justify='space-between'>
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: isUpdate ? false : true,
                                                message: 'Please Add Password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="Repeat Password"
                                        name="c_password"
                                        rules={[
                                            {
                                                required: isUpdate ? false : true,
                                                message: 'Please Add Password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>}
                        </TabPane>
                        <TabPane key='details' tab="Details" >
                            <Row gutter={24} justify='space-between'>
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Phone!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={0} />
                                    </Form.Item>
                                </Col>
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="Age"
                                        name="age"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Age!',
                                            },
                                        ]}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={0} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24} justify='space-between'>
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="Location"
                                        name="location"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Location!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="Specialization"
                                        name="specialization"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Specialization!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24} justify='space-between'>
                                <Col sm={24} >
                                    <Form.Item
                                        label="Description"
                                        name="description"
                                    >
                                        <Input.TextArea />
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