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

  const handleAddCard = (args: { stageId: string }) => {};

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

    if (taskIndex !== -1) {
      tasks[taskIndex].stageId = Number(stageId);
      setTasks([...tasks]);
    }
  };
  return (
    <>
      <KanbanBoardConatainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id='unnassigned'
            title={'unassigned'}
            count={taskStages.unassignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
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
                />
              </KanbanItem>
            ))}
            {!taskStages.unassignedStage.length && (
              <KanbanAddCardButton
                onClick={() =>
                  handleAddCard({
                    stageId: 'unassigned',
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
                  handleAddCard({ stageId: column.id.toString() })
                }
              >
                {column.tasks.map((task) => {
                  return (
                    <KanbanItem key={task.id} id={task.id} data={task}>
                      <ProjectCardMemo
                        {...task}
                        dueDate={task.dueDate || undefined}
                      />
                    </KanbanItem>
                  );
                })}
                {!column.tasks.length && (
                  <KanbanAddCardButton
                    onClick={() =>
                      handleAddCard({
                        stageId: column.id.toString(),
                      })
                    }
                  />
                )}
              </KanbanColumn>
            );
          })}
        </KanbanBoard>
      </KanbanBoardConatainer>
      {children}
    </>
  );
};

export default TasksList;
