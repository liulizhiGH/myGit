import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import axios from "../../../utils/axiosUtils";

export class UpdateCAPhone extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let postData = {
          idCard: values.idCard,
          mobilePhone: values.caPhone,
          name: values.name
        };
        // 验证实名信息
        axios({
          method: "post",
          url: "/ca/checkCaUser",
          data: postData
        })
          .then(res => {
            console.log(res.data);
            if (res.data.code !== 200) {
              // 验证通过后，显示输入新手机号表单
              this.props.history.push("/caCenter/newCAPhone");
            } else {
              message.info(res.data.message);
            }
          })
          .catch(error => {
            message.info(error.toString());
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入姓名" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="输入姓名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("idCard", {
            rules: [{ required: true, message: "请输入身份证" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="输入身份证"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("caPhone", {
            rules: [{ required: true, message: "请输入预留手机号" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="输入预留手机号"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="dashed" htmlType="submit" className="login-form-button">
            安全验证
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateCAPhone);
