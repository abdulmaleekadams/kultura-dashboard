'use client'
import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


import {
  Button, Form,
  Input, Select
} from 'antd';
import Link from 'next/link';

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const RegisterForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  return (
    <Form
      form={form}
      name='register'
      onFinish={onFinish}
      scrollToFirstError
      className='login-form flex flex-col w-full md:w-1/2 xl:w-1/3 gap-y-2 bg-white justify-center items-center shadow-lg !p-8'
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
        
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        className='w-full'
      >
        <Input.Password
          className='!py-2.5'
          placeholder='Enter your password'
          prefix={<LockOutlined className='site-form-item-icon' />}
        />
      </Form.Item>

      <Form.Item
        className='w-full'
        name='confirm'
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder='Confirm Password'
          className='!py-2.5'
          prefix={<LockOutlined className='site-form-item-icon' />}
        />
      </Form.Item>

      <Form.Item className='!w-full'>
        <Button
          type='primary'
          className='w-full !py-2.5 !h-auto'
          htmlType='submit'
        >
          Register
        </Button>
      </Form.Item>
      <div className='mt-3'>
        <p>
          Already have an account?
          <Link href={'/auth/login'} className='inline-block ml-1'>
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default RegisterForm;
