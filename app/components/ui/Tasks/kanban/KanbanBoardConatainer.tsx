'use client';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

type Props = {
  onDragEnd: (e: DragEndEvent) => void;
};

export const KanbanBoardConatainer = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div className='w-board h-board flex -m-8'>
      <div className='w-full flex overflow-x-scroll h-[100%] p-8'>
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard = ({
  children,
  onDragEnd,
}: React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 5 },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      {children}
    </DndContext>
  );
};
