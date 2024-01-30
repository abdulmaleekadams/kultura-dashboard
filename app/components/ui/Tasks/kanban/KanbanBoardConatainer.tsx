'use client'
import { DndContext } from '@dnd-kit/core';

export const KanbanBoardConatainer = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div className='w-board h-board flex -m-8'>
      <div className='w-full flex overflow-x-scroll h-[100%] p-8'>{children}</div>
    </div>
  );
};

export const KanbanBoard = ({ children }: React.PropsWithChildren) => {
  return <DndContext>{children}</DndContext>;
};
