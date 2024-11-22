"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { imageSchema } from '@/schema'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ImageIcon, Loader2, Pencil, PlusCircle } from 'lucide-react'

import { toast } from 'sonner'
import { updatedCourseImage, updatedCourseTitle } from '@/data'
import { Course } from '@prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/global/file-upload'

type Props = {
    initialData: Course
    courseId: string
}
const ImageForm = ({ initialData, courseId }: Props) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = React.useState(false)
    const toggleEditing = () => setIsEditing((prev) => !prev)
    
    
    const onSubmit = async(data: z.infer<typeof imageSchema>) => {
        try {
            await updatedCourseImage(courseId, data)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Error updating title")
        }
    }
  return (
    <div className='mt-6 border bg-muted text-muted-foreground p-4'>
        <div className='font-medium flex items-center justify-between'> 
            Course image
            <Button variant={"ghost"} onClick={toggleEditing}>
                {isEditing && "Cancel"}
                {
                    !isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit
                        </>
                    )
                }
                {
                    !isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className='h-4 w-4 mr-2' />
                            Add
                        </>
                    )
                }
            </Button>
        </div>
        {
            !isEditing && (!initialData.imageUrl ? (
                <div className='flex items-center justify-center h-60 bg-muted rounded-md'>
                        <ImageIcon className='h-12 w-12 text-muted-foreground' />
                </div>
            ) : (
                <div className='relative aspect-video mt-2 h-48'>
                    <Image src={initialData.imageUrl} alt='Course image' fill className='rounded-md object-cover'/>
                </div>
            ))
        }
        {
            isEditing && (
                <div>
                    <FileUpload endpoint='courseImage' onChange={(url) => { if(url) {onSubmit({ imageUrl: url })}}} />
                </div>
            )
        }
    </div>
  )
}

export default ImageForm