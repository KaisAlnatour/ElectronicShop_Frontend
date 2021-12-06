import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import './index.css';
import { login } from '../services/common/authentication/index';
import { signUp } from '../services/common/authentication/index';

function Signup() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    async function onSubmit() {
        setLoading(true);
        form.setFieldsValue({ image: 'none' });
        try {
            const data = await signUp({ ...form.getFieldsValue(), image: 'none' });
            if (data) {
                setTimeout(async function () {
                    await login(form.getFieldValue('email'), form.getFieldValue('password')); if (data) {
                        window.location.href = `http://localhost:3000/admin/estates`;
                    }
                }, 2000);



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
                        <div class="container register">
                            <div class="row">
                                <div class="col-md-3 register-left">
                                    <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                                    <h3>Welcome To ESC</h3>
                                </div>
                                <div class="col-md-9 register-right">
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <h3 class="register-heading">Register</h3>
                                            <Form form={form} onFinish={() => onSubmit()}>
                                                <div class="row register-form">
                                                    <div class="col-md-6">
                                                        <Form.Item
                                                            name="userName"
                                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                                        >
                                                            <Input placeholder="Username" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="firstName"
                                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                                        >
                                                            <Input placeholder="First Name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                                        >
                                                            <Input.Password placeholder="Password" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="collage"
                                                            rules={[{ required: true, message: 'Please input your Collage!' }]}
                                                        >
                                                            <Input placeholder="Collage" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="year"
                                                            rules={[{ required: true, message: 'Please input your year!' }]}
                                                        >
                                                            <Input placeholder="Year" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="location"
                                                            rules={[{ required: true, message: 'Please input your Location!' }]}
                                                        >
                                                            <Input placeholder="Location" />
                                                        </Form.Item>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <Form.Item
                                                            name="email"
                                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                                        >
                                                            <Input type='email' placeholder="Email" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="lastName"
                                                            rules={[{ required: true, message: 'Please input your Last Name!' }]}
                                                        >
                                                            <Input placeholder="Last Name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="c_password"
                                                            rules={[{ required: true, message: 'Please Repeat Password!' }]}
                                                        >
                                                            <Input.Password placeholder="Repeat Password" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="specialization"
                                                            rules={[{ required: true, message: 'Please input your Specialization!' }]}
                                                        >
                                                            <Input placeholder="Specialization" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="studentInfo"
                                                            rules={[{ required: true, message: 'Please input your Info!' }]}
                                                        >
                                                            <Input.TextArea placeholder="Info" />
                                                        </Form.Item>
                                                    </div>

                                                    <Form.Item>
                                                        <div class="col align-self-end">
                                                            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                                                                Register
                                                            </Button>
                                                        </div>
                                                    </Form.Item>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </React.Fragment>
            )}
        </BackgroundColorContext.Consumer>
    );
}
export default Signup;
