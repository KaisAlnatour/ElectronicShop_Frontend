import React, { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "reactstrap";
import { login } from '../services/common/authentication/index';

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    async function onSubmit(values) {
        setLoading(true);

        try {
            const data = await login(values.email, values.password);
            if (data) {
                window.location.href = `http://localhost:3000/admin/estates`;
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <BackgroundColorContext.Consumer>
            {({ color }) => (
                <React.Fragment>
                    <div className="wrapper">

                        <div className="main-panel" data={color}>

                            <div style={{ margin: '5% 25%' }}>
                                <Card className="card-chart" style={{ minHeight: '400px' }}>
                                    <CardHeader>
                                        <CardTitle tag="h3">
                                            Login
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="chart-area" style={{ padding: '24px' }}>
                                            <Form
                                                form={form}
                                                onFinish={onSubmit}
                                            >
                                                <Form.Item

                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "This Field Is Required",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        size="large"
                                                        placeholder="User Name"
                                                        prefix={
                                                            <UserOutlined
                                                                style={{
                                                                    color: "rgba(0,0,0,.25)",
                                                                }}
                                                            />
                                                        }
                                                    />

                                                </Form.Item>

                                                <Form.Item
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "ThisFieldIsRequired",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        size="large"
                                                        type="password"
                                                        placeholder="Password"
                                                        prefix={
                                                            <LockOutlined
                                                                style={{
                                                                    color: "rgba(0,0,0,.25)",
                                                                }}
                                                            />
                                                        }
                                                    />

                                                </Form.Item>

                                                <Row justify="end">
                                                    <Col>
                                                        <Button
                                                            htmlType={
                                                                "submit"
                                                            }
                                                            type="primary"
                                                            disabled={
                                                                loading
                                                            }
                                                            loading={
                                                                loading
                                                            }
                                                        >
                                                            {
                                                                "Login"
                                                            }
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button
                                                            type='link'
                                                            onClick={() => window.location.href = `http://localhost:3000/user/signup`}
                                                        >
                                                            or Sign Up
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                            </div></div>

                    </div>
                </React.Fragment>
            )}
        </BackgroundColorContext.Consumer>
    );
}
export default LoginPage;
