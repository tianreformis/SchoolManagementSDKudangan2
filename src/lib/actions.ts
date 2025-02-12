"use server"

import { clerkClient } from "@clerk/nextjs/server";
import { ClassSchema, SubjectSchema, TeacherSchema } from "./formValidationSchemas"
import prisma from "./prisma"

type CurrentState = { success: boolean; error: boolean; erorr?: undefined; } | { success: boolean; erorr: boolean; error?: undefined; }

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        }
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
        teachers:{
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        }
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

export const createClass= async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data
    });
    // revalidatePath("/list/class");
    return { success: true, error: false }
  } catch (err) {
    console.log(err);
    return { success: false, erorr: true }
  }
}

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data    
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass= async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createTeacher= async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const client = await clerkClient(); // Await the promise to get the client object
    console.log(client);
    const user = await client.users.createUser({ // Access the users property on the resolved client object
      username: data.username,
      password : data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" }
    });
    await prisma.teacher.create({
      data:{
        id : user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null, 
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        subjects: {
          connect: data.subjects?.map((subjectId:string) => ({ 
            id: parseInt(subjectId)
          }))
        }
      }
    });
    // revalidatePath("/list/teacher");
    return { success: true, error: false }
  } catch (err) {
    console.log(err);
    return { success: false, erorr: true }
  }
}

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data    
    });

    // revalidatePath("/list/teacher");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTeacher= async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.teacher.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/teacher");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
