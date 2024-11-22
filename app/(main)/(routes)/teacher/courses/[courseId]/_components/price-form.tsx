"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { priceSchema, titleSchema } from '@/schema'
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
import { updatedCourseDescription, updatedCoursePrice, updatedCourseTitle } from '@/data'
import { Course } from '@prisma/client'
import { cn, formatPrice } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

type Props = {
    initialData: Course
    courseId: string
}
const PriceForm = ({ initialData, courseId }: Props) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)
    const form = useForm<z.infer<typeof priceSchema>>({
        resolver: zodResolver(priceSchema),
        defaultValues: {
            price: initialData.price || undefined,
        },
      })
    
    const { isValid, isSubmitting } = form.formState
    const onSubmit = async(data: z.infer<typeof priceSchema>) => {
        try {
            await updatedCoursePrice(courseId, data)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Error updating description")
        }
    }
  return (
    <div className='mt-6 border bg-muted text-muted-foreground p-4'>
        <div className='font-medium flex items-center justify-between'> 
            Course Price
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
                    !initialData.price && 'text-muted-foreground/50 italic'
                )}>
                    {initialData.price ? formatPrice(initialData.price): "Add a price" }
                </p>
            )
        }
        {
            isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='number' step={0.01} placeholder="Edit price" {...field} disabled={isSubmitting}/>
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

export default PriceForm