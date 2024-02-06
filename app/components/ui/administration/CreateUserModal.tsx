'use client';

import { createUser } from '@/app/server/actions';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

const CreateUserModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [disableCreateBtn, setDisableCreateBtn] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setDisableCreateBtn(true);
      await createUser(values);
    } catch (error) {
      console.log(error);
    } finally {
      setDisableCreateBtn(false);
    }
  };
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
                      rules={[{ required: true, message: 'Please input the user name' }]}
                      
          >
            <Input placeholder="Enter user's name" name='name' autoComplete='off' />
          </Form.Item>
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please input the user title' }]}
          >
            <Input placeholder={`Enter user's title `} name='title' />
          </Form.Item>
          <Form.Item
            label='Role'
            name={'role'}
            rules={[{ required: true, message: 'Please input the user role' }]}
          >
            <Input placeholder={`Enter user's role `} name='role' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
