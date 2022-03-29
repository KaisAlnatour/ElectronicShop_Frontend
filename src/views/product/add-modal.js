import * as ProductServices from '../../services/product/index';
import React, { useEffect, useState } from 'react';
import { Row, Modal, Button, Form, Input, Col, Tabs, Select } from 'antd';
const { TabPane } = Tabs;

const AddProductModal = ({ isVisible, setVisible, addProduct, formValues, updateProduct, isUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const data1 = await ProductServices.showAllSupplier();
            setSuppliers(data1.data.data);
        })();
    }, []);
  
    const onFinish = (values) => {
        const data = values;
        setLoading(true);        
        if (isUpdate) {
            (async () => {
                await updateProduct(data);
                setLoading(false);
            })();
        } else {
            (async () => {
                await addProduct(data);
                setLoading(false);
            })();
        }
        setVisible(false);
    };

    useEffect(() => {
        if (isUpdate) {
            form.setFieldsValue({
                supplierId: formValues.supplierId,
                productName: formValues.productName,
                unitPrice: formValues.unitPrice,
            });
        } else {
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
                                        label="Supplier"
                                        name="supplierId"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add Supplier!',
                                            },
                                        ]}
                                    >
                                    <Select >
                                        {suppliers?.map((supplier) => {
                                            return (

                                                <Select.Option key={supplier.id} value={supplier.id}>
                                                    {supplier?.companyName}
                                                </Select.Option>

                                            );
                                        })}
                                    </Select>
                                    </Form.Item>
                                </Col>
                                
                                <Col sm={24} lg={12}>

                                    <Form.Item
                                        label="productName"
                                        name="productName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Add productName !',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item> 
                                </Col>
                            </Row>
                            <Row gutter={24} justify='space-between'>                                
                                <Col sm={24} lg={12}>
                                    <Form.Item
                                        label="unitPrice"
                                        name="unitPrice"
                                        rules={[
                                            {
                                                pattern: new RegExp(/^[0-9]+(.[0-9]+)?$/),                                                                                            
                                                message: 'Please positive number unitPrice!',
                                            },
                                        ]}
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

export default AddProductModal;