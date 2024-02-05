'use server';

import prisma from '@/prisma/client';
import { Task, TaskStage } from '@/utils/types';
import { revalidatePath } from 'next/cache';

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
  values: Task,
  stageId: string,
  profileId: string
) => {
  console.log(values);
  const newTask = await prisma.task.create({
    data: {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate!,
      profileId: values.profileId,
      // taskStageId: stageId,
      taskStage: {
        connect: { id: stageId },
      },
      profile: {
        connect: { id: profileId },
      },
    },
  });
  revalidatePath('/tasks');
  console.log(newTask);
};

export const createTaskStages = async (values: TaskStage[]) => {
  const newStages = await prisma.taskStage.createMany({ data: values });
  console.log(newStages);
};

export const getTaskStages = async () => {
  const taskStages = await prisma.taskStage.findMany();
  return taskStages;
};

export const getTasks = async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

export const updateTask = async (values: any) => {
  console.log(values);
};

export const deleteTask = async (id: string) => {
  await prisma.task.delete({ where: { id } });

  revalidatePath('/tasks');
};
