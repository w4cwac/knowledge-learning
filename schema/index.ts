import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
})

export const creatCourseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    })
})