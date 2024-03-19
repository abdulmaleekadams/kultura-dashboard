'use client';
import { salesOwner } from '@/utils/mockData';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SelectOptionWithAvatar from '../SelectOptionWithAvatar';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createCompany, getAllUsers } from '@/app/server/actions';

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
         name='control-hooks'
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item
          label='Company Name'
          name='name'
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
            options={salesOwner.map(({ id, name }) => ({
              value: id,
              label: (
                <SelectOptionWithAvatar
                  name={name}
                  avatarUrl={name}
                  key={id}
                />
              ),
            }))}
          />
        </Form.Item>

        <Form.List name='contacts'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align='baseline'
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a contact name',
                      },
                    ]}
                  >
                    <Input placeholder='Contact name' />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'email']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email',
                      },
                    ]}
                  >
                    <Input placeholder='Contact email' />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add new contacts
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default CreateComapnyForm;
