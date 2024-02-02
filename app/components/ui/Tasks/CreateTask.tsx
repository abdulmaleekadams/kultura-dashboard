'use client';
import { users } from '@/utils/mockData';
import { Form, Input, Modal, DatePicker, Select, Space } from 'antd';
import { useState } from 'react';
import CustomAvatar from '../../CustomAvatar';
import { Text } from '../../Text';

type Props = {
  openCreateTaskModal: {
    openForm: boolean;
    stageId: null | string;
    stageTitle: string | undefined;
  };

  setOpenCreateTaskModal: React.Dispatch<
    React.SetStateAction<{
      openForm: boolean;
      stageId: null | string;
      stageTitle: string | undefined;
    }>
  >;
};

const CreateTask = ({ openCreateTaskModal, setOpenCreateTaskModal }: Props) => {
  const [disableCreateBtn, setDisableCreateBtn] = useState(false);

  const handleCancel = () => {
    // close the modal by setting openForm to false
    setOpenCreateTaskModal({
      openForm: false,
      stageId: null,
      stageTitle: '',
    });
  };

  const [form] = Form.useForm();

  return (
    <Modal
      onCancel={handleCancel}
      title={`Add new task ${openCreateTaskModal.stageTitle}`}
      width={512}
      open={openCreateTaskModal.openForm}
      okText='Add'
      okButtonProps={{ disabled: disableCreateBtn }}
      onOk={form.submit}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Task Title is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[
            {
              min: 10,
              message: 'Task description should have at least 10 characters.',
            },
          ]}
        >
          <Input.TextArea className='!resize-none !min-h-40' />
        </Form.Item>
        <Form.Item label='Assigned User' name='users' rules={[]}>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Please select'
            defaultValue={['a10', 'c12']}
            // onChange={handleChange}
          >
            {users.map((user) => (
              <Select.Option key={user.id}>
                <Space className='flex flex-row'>
                  <CustomAvatar
                    name={user.name}
                    shape='circle'
                    size='small'
                    src={user.avatarUrl}
                  />
                  <Text>{user.name}</Text>
                </Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Due date'
          name='duedate'
          rules={[
            {
              required: true,
              message: 'Task deadline is required.',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTask;
