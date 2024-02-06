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

export const createUser = async (values: {
  name: string;
  jobTitle: string;
  role: 'ADMIN' | 'USER';
  email: string;
  phone: string;
  profileId: string;
  prefix: string;
}) => {
  await prisma.user.create({
    data: { ...values },
  });
  revalidatePath('/administration');
};

export const createUsers = async (
  data: {
    name: string;
    jobTitle: string;
    role: 'ADMIN' | 'USER';
    email: string;
    phone: string;
    profileId: string;
    prefix: string;
  }[]
) => {
  await prisma.user.createMany({ data });
  revalidatePath('/administration');
};

export const getUsers = async (skip = 0, take = 10) => {
  const users = await prisma.user.findMany({ skip, take });

  return users;
};

export const getUsersCount = async () => {
  const totalUser = await prisma.user.count();

  return totalUser;
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

export const updateTaskOnDrag = async (id: string, stageId: string) => {
  await prisma.task.update({ where: { id }, data: { taskStageId: stageId } });
  revalidatePath('/tasks');
};

export const deleteTask = async (id: string) => {
  await prisma.task.delete({ where: { id } });
  revalidatePath('/tasks');
};
