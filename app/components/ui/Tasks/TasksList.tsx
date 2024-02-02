'use client';
import { useMemo, useState } from 'react';
import {
  KanbanBoard,
  KanbanBoardConatainer,
} from './kanban/KanbanBoardConatainer';
import KanbanColumn from './kanban/KanbanColumn';
import KanbanItem from './kanban/KanbanItem';
import { tasksStages, tasksList } from '@/utils/mockData';
import { ProjectCardMemo } from './kanban/card';
import { KanbanAddCardButton } from './kanban/KanbabAddCardButton';
import { DragEndEvent } from '@dnd-kit/core';
import CreateTask from './CreateTask';
import toast from 'react-hot-toast';

type Props = {};

const TasksList = ({ children }: React.PropsWithChildren) => {
  const stages = tasksStages.filter(({ title }) =>
    ['TODO', 'IN PROGRESS', 'IN REVIEW', 'COMPLETED'].includes(
      title.toUpperCase()
    )
  );

  const [tasks, setTasks] = useState(tasksList);

  const taskStages = useMemo(() => {
    if (!tasks || !stages) {
      return {
        unassignedStage: [],
        stages: [],
      };
    }

    const unassignedStage = tasks.filter((task) => task.stageId === null);

    const grouped = stages.map((stage) => ({
      ...stage,
      tasks: tasks.filter((task) => task.stageId === stage.id),
    }));

    return {
      unassignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);

  const [openCreateTaskModal, setOpenCreateTaskModal] = useState<{
    openForm: boolean;
    stageId: null | string;
    stageTitle: string | undefined;
  }>({
    openForm: false,
    stageId: null,
    stageTitle: '',
  });

  const handleAddCard = (args: { stageId: string; stageTitle: string }) => {
    setOpenCreateTaskModal({
      ...openCreateTaskModal,
      openForm: true,
      stageId: args.stageId,
      stageTitle: args.stageTitle,
    });
  };

  const handleOnDragEnd = (e: DragEndEvent) => {
    let stageId = e.over?.id as undefined | string | null;
    const taskId = e.active.id as string;
    const taskStageId = e.active.data.current?.stageId;

    if (taskStageId === stageId) return;

    if (stageId === 'unassigned') {
      stageId = null;
    }

    // Find the index of the task in the original tasks array
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    console.log(stageId);

    if (taskIndex !== -1) {
      tasks[taskIndex].stageId = stageId as string;
      setTasks([...tasks]);
    }
  };

  const deleteItemById = (id: string): void => {
    // Find the index of the task in the original tasks array
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      // Remove the task at the found index
      tasks.splice(taskIndex, 1);
      setTasks([...tasks]);
      toast.success('Task Successfully Deleted')
    }
  };

  return (
    <>
      <KanbanBoardConatainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id='unassigned'
            title={'unassigned'}
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() =>
              handleAddCard({ stageId: 'unassigned', stageTitle: 'unassigned' })
            }
          >
            {taskStages.unassignedStage.map((task) => (
              <KanbanItem
                key={task.id}
                id={task?.id}
                data={{ ...task, stageId: 'unassigned' }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                  deleteHandler={deleteItemById}
                />
              </KanbanItem>
            ))}
            {!taskStages.unassignedStage.length && (
              <KanbanAddCardButton
                onClick={() =>
                  handleAddCard({
                    stageId: 'unassigned',
                    stageTitle: 'unassigned',
                  })
                }
              />
            )}
          </KanbanColumn>
          {taskStages.columns?.map((column) => {
            return (
              <KanbanColumn
                key={column.id}
                id={column.id.toString()}
                title={column.title}
                count={column.tasks.length}
                onAddClick={() =>
                  handleAddCard({
                    stageId: column.id.toString(),
                    stageTitle: column.title,
                  })
                }
              >
                {column.tasks.map((task) => {
                  return (
                    <KanbanItem key={task.id} id={task.id} data={task}>
                      <ProjectCardMemo
                        {...task}
                        dueDate={task.dueDate || undefined}
                        deleteHandler={deleteItemById}
                      />
                    </KanbanItem>
                  );
                })}
                {!column.tasks.length && (
                  <KanbanAddCardButton
                    onClick={() =>
                      handleAddCard({
                        stageId: column.id.toString(),
                        stageTitle: column.title,
                      })
                    }
                  />
                )}
              </KanbanColumn>
            );
          })}
        </KanbanBoard>
      </KanbanBoardConatainer>
      {openCreateTaskModal && (
        <CreateTask
          openCreateTaskModal={openCreateTaskModal}
          setOpenCreateTaskModal={setOpenCreateTaskModal}
        />
      )}
    </>
  );
};

export default TasksList;
