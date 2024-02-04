'use server';

import prisma from '@/prisma/client';

export const createCompany = async (values: any) => {
  console.log(values);
};

export const deleteCompany = async (id: string) => {
  console.log(id);
};

export const createDeal = async (values: any) => {
  console.log(values);
};

export const createTask = async (
  values: {
    title: string;
    description: string;
    duedate: Date;
  },
  stageId: string
) => {
  console.log(values);
  const newTask = await prisma.task.create({
    data: {
      title: values.title,
      description: values.description,
      dueDate: values.duedate,
      taskStage: {
        connect: { id: stageId }, // Assuming taskStageId is the ID of the TaskStage
      },
      taskStageId: stageId
    },
  });
  console.log(newTask);
};

export const getTask = async () => {
  console.log('Tasks');
};

export const updateTask = async (values: any) => {
  console.log(values);
};

export const deleteTask = async (id: string) => {
  console.log(id);
};
