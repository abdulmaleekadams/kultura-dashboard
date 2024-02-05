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
import { createTask, deleteTask, updateTaskOnDrag } from '@/app/server/actions';
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

  const [tasksList, setTasksList] = useState<Task[]>([]);

  useEffect(() => {
    if (!tasks || !taskStages) {
      setTaskStagesData({
        unassignedStage: { id: '', tasks: [] },
        columns: [{ id: '', title: '', tasks: [] }],
      });
    } else {
      setTasksList(tasks);
      const unassignedStageId = taskStages.find(
        (stage) => stage.title === 'unassigned'
      )?.id;

      const unassignedStage = tasksList.filter(
        (task) => task.taskStageId === unassignedStageId
      );

      const grouped: { id: string; title: string; tasks: Task[] }[] = taskStages
        ?.filter((stage) => stage.id !== unassignedStageId)
        .map((stage) => ({
          id: stage.id!,
          title: stage.title,
          tasks: (tasksList || [])?.filter(
            (task) => task.taskStageId === stage.id
          ),
        }));

      setTaskStagesData({
        unassignedStage: { id: unassignedStageId!, tasks: unassignedStage },
        columns: grouped,
      });
    }
  }, [tasks, tasksList, taskStages]);

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

  const handleOnDragEnd = async (e: DragEndEvent) => {
    let stageId = e.over?.id as string;
    const taskId = e.active.id as string;
    const taskStageId = e.active.data.current?.stageId;

    console.log(taskId);
    
    if (taskStageId === stageId) return;

    // Find the index of the task in the original tasks array
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      tasksList[taskIndex].taskStageId = stageId as string;
      setTasksList([...tasks]);
    }

    // sync with database
    await updateTaskOnDrag(taskId, stageId);
  };

  const deleteTaskItem = async (id: string) => {
    // Find the index of the task in the original tasks array
    const taskId = await deleteTask(id);
    toast.success('Task Deleted');
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
            id={taskStagesData.unassignedStage.id}
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
                data={{ ...task, stageId: taskStagesData.unassignedStage.id }}
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
