import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { DELETE, GET, PATCH, POST, PUT } = toNextJsHandler(auth)