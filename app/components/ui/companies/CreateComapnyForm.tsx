'use client';
import { salesOwner } from '@/utils/mockData';
import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SelectOptionWithAvatar from '../SelectOptionWithAvatar';
import { createCompany } from '@/app/server/actions';

const CreateComapnyForm = ({
  openCreateCompanyForm,
  setOpenCreateCompanyForm,
}: any) => {
  const onFinish = async (values: any) => {
    try {
      setDisableCreateBtn(true);
      await createCompany(values);
      toast.success('New Company Created Successfully');
      form.resetFields();
    } catch (error) {
      console.log(error);
    } finally {
      setDisableCreateBtn(false);
    }
  };

  const [form] = Form.useForm();

  const [disableCreateBtn, setDisableCreateBtn] = useState(false);

  return (
    <Modal
      width={512}
      title='Create Company'
      open={openCreateCompanyForm}
      onCancel={() => {
        form.resetFields();
        setOpenCreateCompanyForm(false);
      }}
      onOk={form.submit}
      okText='Create'
      okButtonProps={{ disabled: disableCreateBtn }}
    >
      <Form
        form={form}
        name='control-hooks'
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          name='companyName'
          label='Company Name'
          className='font-semibold'
          rules={[{ required: true, message: 'Company name is required' }]}
        >
          <Input placeholder='Please enter a company name' />
        </Form.Item>

        <Form.Item
          label='Sales Owner'
          name='salesOwnerId'
          rules={[{ required: true, message: 'Please select a sales owner' }]}
        >
          <Select
            placeholder='Please select a sales owner'
            options={salesOwner.map(({ id, name, avatarUrl }) => ({
              value: id,
              label: (
                <SelectOptionWithAvatar
                  name={name}
                  avatarUrl={avatarUrl}
                  key={id}
                />
              ),
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateComapnyForm;
