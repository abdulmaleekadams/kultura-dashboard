'use client';

import { Text } from '@/app/components/Text';
import { UseDraggableArguments, useDroppable } from '@dnd-kit/core';
import { Badge, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type Props = {
  id: string;
  title: string;
  description?: React.ReactNode;
  count: number;
  data?: UseDraggableArguments['data'];
  onAddClick?: (args: { id: string }) => void;
};

const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({ id: id, data: data });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  return (
    <div ref={setNodeRef} className='flex flex-col px-4 min-w-64 '>
      <div className='p-3 flex flex-col'>
        <Space className='w-full flex justify-between'>
          <Space>
            <Text
              ellipsis={{ tooltip: 'TITLE TO DO' }}
              size='xs'
              className='uppercase whitespace-nowrap'
              strong
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color='geekblue' />}
          </Space>
          <Button
            shape='circle'
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        className={`flex-1 ${
          active ? 'overflow-y-auto' : 'overflow-y-scroll'
        } border-2 border-dashed ${
          isOver ? 'border-[#000040]' : 'border-transparent'
        } rounded`}
      >
        <div className='mt-3 flex flex-col gap-2 '>{children}</div>
      </div>
    </div>
  );
};

export default KanbanColumn;
