import { auth } from "@clerk/nextjs/server";

const { sessionClaims, userId }  = await auth();
export const role = (sessionClaims?.metadata as { role?: string })?.role;
export const currentUserId = userId;