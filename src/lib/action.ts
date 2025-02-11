"use server"

import { SubjectSchema } from "./formValidationSchema"
import prisma from "./prisma"

export const createSubject = async (data:SubjectSchema)=>{
 try {
  await prisma.subject.create({
    data : {
      name : data.name,
    }
  })
 } catch (err) {
  console.log(err)
  
 }  
}