'use client';
import { useEffect, useState } from 'react';
import {
  KanbanBoard,
  KanbanBoardConatainer,
} from './kanban/KanbanBoardConatainer';
import KanbanColumn from './kanban/KanbanColumn';
import KanbanItem from './kanban/KanbanItem';
import { ProjectCardMemo } from './kanban/card';
import { KanbanAddCardButton } from './kanban/KanbabAddCardButton';
import { DragEndEvent } from '@dnd-kit/core';
import CreateTask from './CreateTask';
import toast from 'react-hot-toast';
import { createTask, deleteTask } from '@/app/server/actions';
import { Task, TaskStage } from '@/utils/types';

type Props = {
  tasks: Task[];
  taskStages: TaskStage[];
};

const TasksList = ({
  children,
  tasks,
  taskStages,
}: React.PropsWithChildren<Props>) => {
  const [taskStagesData, setTaskStagesData] = useState<{
    unassignedStage: { id: string; tasks: Task[] };
    columns: { id: string; title: string; tasks: Task[] }[];
  }>({
    unassignedStage: { id: '', tasks: [] },
    columns: [{ id: '', title: '', tasks: [] }],
  });

  useEffect(() => {
    if (!tasks || !taskStages) {
      setTaskStagesData({
        unassignedStage: { id: '', tasks: [] },
        columns: [{ id: '', title: '', tasks: [] }],
      });
    } else {
      const unassignedStageId = taskStages.find(
        (stage) => stage.title === 'unassigned'
      )?.id;

      const unassignedStage = tasks.filter(
        (task) => task.taskStageId === unassignedStageId
      );

      const grouped: { id: string; title: string; tasks: Task[] }[] = taskStages
        ?.filter((stage) => stage.id !== unassignedStageId)
        .map((stage) => ({
          id: stage.id!,
          title: stage.title,
          tasks: (tasks || [])?.filter((task) => task.taskStageId === stage.id),
        }));

      setTaskStagesData({
        unassignedStage: { id: unassignedStageId!, tasks: unassignedStage },
        columns: grouped,
      });
    }
  }, [tasks, taskStages]);

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

  const deleteTaskItem = async (id: string): void => {
    // Find the index of the task in the original tasks array
    const taskId = await deleteTask(id)
  };

  const handleFormSubmit = async (values: any, stageId: string) => {
    await createTask(values, stageId, '65bf0853fbd8a67612a252e9');
    setOpenCreateTaskModal({
      openForm: false,
      stageId: null,
      stageTitle: '',
    });
  };

  return (
    <>
      <KanbanBoardConatainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id='unassigned'
            title={'unassigned'}
            count={taskStagesData.unassignedStage.tasks.length || 0}
            onAddClick={() =>
              handleAddCard({
                stageId: taskStagesData.unassignedStage.id,
                stageTitle: 'unassigned',
              })
            }
          >
            {taskStagesData.unassignedStage.tasks.map((task) => (
              <KanbanItem
                key={task.id}
                id={task?.id}
                data={{ ...task, stageId: 'unassigned' }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={(task.dueDate as string) || undefined}
                  deleteHandler={deleteTaskItem}
                />
              </KanbanItem>
            ))}
            {!taskStagesData.unassignedStage.tasks.length && (
              <KanbanAddCardButton
                onClick={() =>
                  handleAddCard({
                    stageId: taskStagesData.unassignedStage.id,
                    stageTitle: 'unassigned',
                  })
                }
              />
            )}
          </KanbanColumn>
          {taskStagesData.columns?.map((column) => {
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
                        deleteHandler={deleteTaskItem}
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
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};
export default TasksList;
