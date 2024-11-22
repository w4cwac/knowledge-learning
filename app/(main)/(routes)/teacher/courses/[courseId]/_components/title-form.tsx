"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { titleSchema } from '@/schema'
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
import { updatedCourseTitle } from '@/data'

type Props = {
    initialData: {
        title: string
    }
    courseId: string
}
const TitleForm = ({ initialData, courseId }: Props) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)
    const form = useForm<z.infer<typeof titleSchema>>({
        resolver: zodResolver(titleSchema),
        defaultValues: initialData,
      })
    
    const { isValid, isSubmitting } = form.formState
    const onSubmit = async(data: z.infer<typeof titleSchema>) => {
        try {
            await updatedCourseTitle(courseId, data)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Error updating title")
        }
    }
  return (
    <div className='mt-6 border bg-muted text-muted-foreground p-4'>
        <div className='font-medium flex items-center justify-between'> 
            Course Title
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
                <p className='mt-2 text-sm'>
                    {initialData.title}
                </p>
            )
        }
        {
            isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Edit title" {...field} disabled={isSubmitting}/>
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

export default TitleForm