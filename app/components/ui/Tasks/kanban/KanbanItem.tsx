'use client';

import {
  DragOverlay,
  UseDraggableArguments,
  useDraggable,
} from '@dnd-kit/core';

type Props = {
  id: string;
  data?: UseDraggableArguments['data'];
};

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });
  return (
    <div className='relative px-1'>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`${
          active?.id ? 'opacity-50' : 'opacity-100'
        } rounded-lg relative cursor-grab`}
      >
        {children}
      </div>
      {active?.id === id && (
        <DragOverlay zIndex={1000}>
          <div className='rounded-lg shadow-lg cursor-grabbing'>{children}</div>
        </DragOverlay>
      )}
    </div>
  );
};

export default KanbanItem;
