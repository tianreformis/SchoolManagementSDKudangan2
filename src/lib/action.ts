"use server"

import { revalidatePath } from "next/cache"
import { SubjectSchema } from "./formValidationSchema"
import prisma from "./prisma"

type CurrentState = {  success: boolean; error: boolean; erorr?: undefined; } | { success: boolean; erorr: boolean; error?: undefined;  }

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      }

    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false }
  } catch (err) {
    console.log(err);
    return { success: false, erorr: true }
  }
}

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
