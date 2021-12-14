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

        try {
            const data = await signUp(form.getFieldValue('user_name'), form.getFieldValue('password'));
            if (data) {
                setTimeout(async function () {
                    await login(form.getFieldValue('user_name'), form.getFieldValue('password')); if (data) {
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
                                                            name="user_name"
                                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                                        >
                                                            <Input placeholder="Username" />
                                                        </Form.Item>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <Form.Item
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                                        >
                                                            <Input.Password placeholder="Password" />
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
