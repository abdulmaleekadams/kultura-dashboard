'use client';
import { useMemo } from 'react';
import {
  KanbanBoard,
  KanbanBoardConatainer,
} from './kanban/KanbanBoardConatainer';
import KanbanColumn from './kanban/KanbanColumn';
import KanbanItem from './kanban/KanbanItem';
import { tasksStages, tasksList } from '@/utils/mockData';
import { ProjectCardMemo } from './kanban/card';
import { KanbanAddCardButton } from './kanban/KanbabAddCardButton';

type Props = {};

const TasksList = (props: Props) => {
  const stages = tasksStages.filter(({ title }) =>
    ['TODO', 'IN PROGRESS', 'IN REVIEW', 'COMPLETED'].includes(
      title.toUpperCase()
    )
  );

  const tasks = tasksList;

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

  console.log(taskStages.unassignedStage);

  return (
    <>
      <KanbanBoardConatainer>
        <KanbanBoard>
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
                onAddClick={() => handleAddCard({ stageId: column.id.toString() })}
              >
                {
                  column.tasks.map((task) => {
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
    </>
  );
};

export default TasksList;
