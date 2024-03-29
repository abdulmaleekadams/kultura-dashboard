import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Form, Input, Spin } from 'antd';
import { Text } from '../Text';
import CustomAvatar from '../CustomAvatar';
import { getNameInitials } from '@/utils/getInitials';

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

const userData = {
  data: {
    name: 'John Doe',
    avatarUrl: '/static/images/avatars/1.jpg',
  },
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  const { avatarUrl, name } = userData?.data || {};

  const closeModal = () => {
    setOpened(false);
  };

  //   if (queryResult?.isLoading) {
  //     return (
  //       <Drawer
  //         open={opened}
  //         width={756}
  //         styles={{
  //           body: {
  //             background: '#f5f5f5',
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           },
  //         }}
  //       >
  //         <Spin />
  //       </Drawer>
  //     );
  //   }

  return (
    opened && (
      <Drawer
        onClose={closeModal}
        open={opened}
        width={756}
        styles={{
          body: { background: '#f5f5f5', padding: 0 },
          header: { display: 'none' },
        }}
      >
        <div
          className='flex items-center justify-between p-4 bg-white'
        >
          <Text strong>Account Settings</Text>
          <Button
            type='text'
            icon={<CloseOutlined />}
            onClick={() => closeModal()}
          />
        </div>
        <div
          className='p-4'
        >
          <Card>
            <Form layout='vertical'>
              <CustomAvatar
                shape='square'
                src={avatarUrl}
                name={getNameInitials(name || '')}
                customStyle='w-[96px] h-[96px] mb-[24px]'
                
              />
              <Form.Item label='Name' name='name'>
                <Input placeholder='Name' />
              </Form.Item>
              <Form.Item label='Email' name='email'>
                <Input placeholder='email' />
              </Form.Item>
              <Form.Item label='Job title' name='jobTitle'>
                <Input placeholder='jobTitle' />
              </Form.Item>
              <Form.Item label='Phone' name='phone'>
                <Input placeholder='Timezone' />
              </Form.Item>
            </Form>
            <Button
              style={{
                display: 'block',
                marginLeft: 'auto',
              }}
            >
              Submit
            </Button>
          </Card>
        </div>
      </Drawer>
    )
  );
};
