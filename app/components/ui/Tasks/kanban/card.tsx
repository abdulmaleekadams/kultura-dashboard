'use client';
import { Text } from '@/app/components/Text';
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Space,
  Tag,
  Tooltip,
  theme,
} from 'antd';
import {
  EyeOutlined,
  MoreOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { memo, useMemo } from 'react';
import { TextIcon } from '@/app/components/TextIcon';
import dayjs from 'dayjs';
import { getDateColor } from '@/utils';
import CustomAvatar from '@/app/components/CustomAvatar';

type ProjectCardProps = {
  id: string;
  title: string;
  dueDate?: string | undefined;
  updatedAt?: string;
  users?: {
    id: string | number;
    name: string;
    avatarUrl?: string;
  }[];
  deleteHandler: (id: string) => void;
};

const ProjectCard = ({
  id,
  title,
  dueDate,
  users,
  deleteHandler,
}: ProjectCardProps) => {
  const { token } = theme.useToken();

  const edit = () => {};

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps['items'] = [
      {
        label: 'View Card',
        key: '1',
        icon: <EyeOutlined />,
        onClick: () => {
          edit();
        },
      },
      {
        danger: true,
        label: 'Delete Card',
        key: '2',
        onClick: () => {
          deleteHandler(id);
        },
        icon: <DeleteOutlined />,
      },
    ];

    return dropdownItems;
  }, [deleteHandler, id]);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format('MMM DD'),
    };
  }, [dueDate]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: 'transparent',
          },
        },
      }}
    >
      <Card
        size='small'
        headStyle={{ color: '#000' }}
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => edit()}
        extra={
          <Dropdown
            trigger={['click']}
            menu={{
              items: dropdownItems,
              onPointerDown: (e) => {
                e.stopPropagation();
              },
              onClick: (e) => {
                e.domEvent.stopPropagation();
              },
            }}
            placement='bottom'
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type='text'
              shape='circle'
              icon={<MoreOutlined className='rotate-90' />}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      >
        <div className='flex flex-wrap items-center gap-2'>
          <TextIcon className='mr-1' />
          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined />}
              color={dueDateOptions.color}
              className={`${
                dueDateOptions.color === 'default'
                  ? 'bg-transparent'
                  : 'bg-[unset]'
              }`}
              bordered={dueDateOptions.color !== 'default'}
            >
              {dueDateOptions.text}
            </Tag>
          )}
          {!!users?.length && (
            <Space
              size={4}
              wrap
              direction='horizontal'
              align='center'
              className='flex justify-end ml-auto'
            >
              {users.map((user) => (
                <Tooltip key={user.id} title={user.name}>
                  <CustomAvatar name={user.name} src={user.avatarUrl} />
                </Tooltip>
              ))}
            </Space>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default ProjectCard;

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.title === next.title &&
    prev.dueDate === next.dueDate &&
    prev.users?.length === next.users?.length &&
    prev.updatedAt === next.updatedAt
  );
});
