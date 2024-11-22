"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { descriptionSchema, titleSchema } from '@/schema'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, Pencil } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { updatedCourseDescription, updatedCourseTitle } from '@/data'
import { Course } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

type Props = {
    initialData: Course
    courseId: string
}
const DesccriptionForm = ({ initialData, courseId }: Props) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)
    const form = useForm<z.infer<typeof descriptionSchema>>({
        resolver: zodResolver(descriptionSchema),
        defaultValues: {
            description: initialData.description ||"",
        },
      })
    
    const { isValid, isSubmitting } = form.formState
    const onSubmit = async(data: z.infer<typeof descriptionSchema>) => {
        try {
            await updatedCourseDescription(courseId, data)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Error updating description")
        }
    }
  return (
    <div className='mt-6 border bg-muted text-muted-foreground p-4'>
        <div className='font-medium flex items-center justify-between'> 
            Course Description
            <Button variant={"ghost"} onClick={toggleEditing}>
                {isEditing && "Cancel"}
                {
                    !isEditing && (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit
                        </>
                    )
                }
            </Button>
        </div>
        {
            !isEditing && (
                <p className={cn(
                    'mt-2 text-sm',
                    !initialData.description && 'text-muted-foreground/50 italic'
                )}>
                    {initialData.description || "Add a description"}
                </p>
            )
        }
        {
            isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Edit description" {...field} disabled={isSubmitting}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className='flex items-center gap-x-2'>
                            <Button type="submit">{isSubmitting ? <Loader2 className='h-4 w-4' /> : "Save" }</Button>
                        </div>
                    </form>
                </Form>
            )
        }
    </div>
  )
}

export default DesccriptionForm