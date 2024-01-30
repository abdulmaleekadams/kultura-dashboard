import { Button, Skeleton, Space } from 'antd';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';

const KanbanColumnSkeleton = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex flex-col px-4'>
      <div className='p-3'>
        <Space className='justify-between w-[100%]'>
          <Skeleton.Button size='small' style={{ width: '125px' }} />
          <Button
            disabled
            type='text'
            shape='circle'
            icon={
              <MoreOutlined
                style={{
                  transform: 'rotate(90deg)',
                }}
              />
            }
          />
          <Button disabled shape='circle' icon={<PlusOutlined />} />
        </Space>
      </div>
      <div
        style={{
          flex: 1,
          border: '2px dashed transparent',
          borderRadius: '4px',
        }}
      >
        <div className='flex flex-col gap-2 mt-3'>{children}</div>
      </div>
    </div>
  );
};

export default KanbanColumnSkeleton;
