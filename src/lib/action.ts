"use server"

import { revalidatePath } from "next/cache"
import { SubjectSchema } from "./formValidationSchema"
import prisma from "./prisma"

type CurrentState = {success: boolean, error: boolean}

export const createSubject = async (
  currentState : CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      }

    });
    revalidatePath("/list/subjects");
    return {success: true, error: false}
  } catch (err) {
    console.log(err);
    return {success : false, erorr : true}
  }
}