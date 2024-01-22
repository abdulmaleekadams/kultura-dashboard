/* eslint-disable react/no-unescaped-entities */
'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';

const LoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name='normal_login'
      className='login-form flex flex-col w-full md:w-1/2 xl:w-1/3 gap-y-2 bg-white justify-center items-center shadow-lg !p-8'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        className='w-full'
        rules={[
          { required: true, message: 'Please input your Email!' },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Email'
          className='!py-2.5'
        />
      </Form.Item>
      <Form.Item
        name='password'
        className='w-full'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
          className='!py-2.5'
        />
      </Form.Item>
      <div className='flex justify-between w-full'>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button w-full !py-2.5 !h-auto'
        >
          Log in
        </Button>
      </div>
      <div className='flex justify-between w-full mt-4'>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className='login-form-forgot' href='/auth/forget-password'>
          Forgot password?
        </Link>
      </div>

      <div className='mt-3'>
        <p>
          Don't have an account?
          <Link href={'/auth/register'} className='inline-block ml-1'>
            Register
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
