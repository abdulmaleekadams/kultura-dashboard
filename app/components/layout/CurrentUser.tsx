import { Button, Popover } from 'antd';
import CustomAvatar from '../CustomAvatar';
import { Text } from '../Text';
import { SettingOutlined } from '@ant-design/icons';

const userData = {
  data: {
    name: 'John Doe',
    avatarUrl: '/static/images/avatars/1.jpg',
  },
};

const CurrentUser = () => {
  const { data: user } = userData;
  const content = (
    <div className='flex flex-col'>
      <Text strong className='py-3 px-5'>
        {user?.name}
      </Text>
      <div className='border-t border-[#d9d9d9] p-1 flex flex-col gap-1'>
        <Button
          className='text-left'
          block
          icon={<SettingOutlined />}
          type='text'
        >
          Account Settings
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement='bottomRight'
        trigger={'click'}
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}
        className='cursor-pointer'
      >
        <CustomAvatar name={user?.name} />
      </Popover>
    </>
  );
};

export default CurrentUser;
