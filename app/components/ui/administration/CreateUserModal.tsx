'use client';

import { createUser } from '@/app/server/actions';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CreateUserModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [disableCreateBtn, setDisableCreateBtn] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setDisableCreateBtn(true);
      await createUser({ ...values, profileId: '65bf0853fbd8a67612a252e9' });
      toast.success('New user created successfully');
      form.resetFields();
      setOpenModal(false);
    } catch (error) {
      toast.error('New user created successfully');
      console.log(error);
    } finally {
      setDisableCreateBtn(false);
    }
  };

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select style={{ width: 70 }} placeholder={'+XX'}>
        <Select.Option value='86'>+86</Select.Option>
        <Select.Option value='87'>+87</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className='!bg-blue-600 !text-white !h-[40px]'
      >
        Create User
      </Button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={form.submit}
        title='Create New User'
        confirmLoading={disableCreateBtn}
        okText='Create'
      >
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              { required: true, message: "Please input the user's name" },
              {
                validator: (_, value) => {
                  const nameParts = value && value.trim().split(' ');
                  if (!nameParts || nameParts.length < 2) {
                    return Promise.reject(
                      'Please enter both first name and last name'
                    );
                  }
                  const regex = /^[A-Za-z]+$/;
                  const isAlphabetic = nameParts.every((part: string) =>
                    regex.test(part)
                  );
                  if (!isAlphabetic) {
                    return Promise.reject(
                      'Please enter name using only alphabetic characters'
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder='Firstname Lastname'
              name='name'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
            label='Title'
            name='jobTitle'
            rules={[{ required: true, message: 'Please input the user title' }]}
          >
            <Input placeholder={`Enter user's title `} name='jobTitle' />
          </Form.Item>
          <Form.Item
            label='Role'
            name={'role'}
            rules={[
              { required: true, message: "Please input the user's role" },
            ]}
          >
            <Input placeholder={`Enter user's role `} name='role' />
          </Form.Item>
          <Form.Item
            label='Email'
            name={'email'}
            rules={[
              { required: true, message: "Please input the user's email" },
            ]}
          >
            <Input placeholder={`useremail@domain.com`} name='email' />
          </Form.Item>
          <Form.Item
            label='Phone'
            name={'phone'}
            rules={[
              {
                required: true,
                message: "Please input the user's phone number",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              placeholder={`8158964385`}
              name='phone'
              autoComplete='off'
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
