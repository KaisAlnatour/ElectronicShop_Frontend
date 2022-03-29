import * as OrderServices from '../../services/order/index';
import * as ProductServices from '../../services/product/index';

import React, { useEffect, useState } from 'react';
import { Row, Modal, Button, Form, Input, Col, Tabs, Select, DatePicker,Divider ,Tooltip} from 'antd';
import moment from 'moment';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const AddOrderModal = ({ isVisible, setVisible, addOrder, formValues, updateOrder, isUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]); 
    const [products, setproducts] = useState([]); 

    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const data1 = await OrderServices.showAllCustomer();
            const data2 = await ProductServices.showAllProduct();            
            setCustomers(data1.data.data);
            setproducts(data2.data.data);
        })();
    }, []);

    const onFinish = (values) => {
        const data = values;
        data.orderDate = moment(values.orderDate).format("DD-MM-YYYY");
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
        setVisible(false);      
    };

    useEffect(() => {

        // setSpinning(true);
        if (isUpdate) {
            form.setFieldsValue({
                customerId: formValues.customerId,
                orderDate: moment(formValues.orderDate),                
                orderNumber: formValues.orderNumber,                
            });            
            // setSpinning(false);
        } else {
            // form.resetFields();
            // form.setFieldsValue({
            //     required: false,
            // });
            // setSpinning(false);
            form.resetFields();
        }

    }, [formValues, form, isUpdate]);
    return (
        <>
            <Modal
                title={isUpdate ? 'Update Product' : 'Create Product'}
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
                                        label="Order Number"
                                        name="orderNumber"           
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={24} justify='space-between'>
                                
                                <Col sm={24} lg={12}>
                                        <Form.Item
                                        label="Customer"
                                        name="customerId"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add customer!',
                                            },
                                        ]}
                                    >
                                    <Select >
                                        {customers?.map((customer) => {
                                            return (

                                                <Select.Option key={customer.id} value={customer.id}>
                                                    {customer?.firstName + ' ' + customer?.lastName}
                                                </Select.Option>

                                            );
                                        })}
                                    </Select>
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
                            </Row>                            
                        </TabPane>

                    </Tabs>

                    <Divider> items </Divider>                                                
                    <>
                        <Form.List name="itmes">
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field, index) => (
                                            <div key={field.key}>
                                                <Row gutter={24} align='top' justify='space-between'>

                                                    <Col sm={24} lg={10}>
                                                        <Form.Item
                                                            label={"product " + (index + 1)}
                                                            name={[index, "productId"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please Add Question Product!',
                                                                },
                                                            ]}
                                                        >
                                                            <Select >
                                                                {products?.map((product) => {
                                                                    return (

                                                                        <Select.Option key={product.id} value={product.id}>
                                                                            {product?.productName}
                                                                        </Select.Option>

                                                                    );
                                                                })}
                                                            </Select>                                                            
                                                        </Form.Item>
                                                    </Col>
                                                    <Col sm={24} lg={10}>
                                                        <Form.Item
                                                            label={"quantity " + (index + 1)}
                                                            name={[index, "quantity"]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    pattern: new RegExp(/^[0-9]+(.[0-9]+)?$/),
                                                                    message: 'Please Add quantity!',
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Tooltip title={'Delete Item'}>
                                                        <Button 
                                                            size='small'
                                                            danger
                                                            type="link"
                                                            shape='circle'
                                                            onClick={() => remove(field.name)}
                                                            icon={<DeleteOutlined />}
                                                        />
                                                    </Tooltip>
                                                </Row>

                                            </div>
                                        ))}
                                        <Divider />
                                        <Form.Item>
                                            <Row align='middle' justify='center'>

                                                <Button
                                                    type="primary"
                                                    onClick={() => add()}
                                                    style={{ width: '150px' }}
                                                >
                                                    <PlusOutlined /> Add Itam
                                                </Button>

                                            </Row>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>

                    </>
                    <Row justify='end'>
                        <Col style={{ margin: '0 8px 0 0' }}>
                            <Form.Item >
                                <Button htmlType="button" onClick={() => {
                                    setVisible(false);
                                }}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Col>
                        <Form.Item>
                            <Col>
                                <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
                                    Save
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