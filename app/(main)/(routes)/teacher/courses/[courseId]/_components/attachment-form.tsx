"use client"

import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { attachmentSchema } from '@/schema'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from 'lucide-react'

import { toast } from 'sonner'
import { deleteCourseAttachment, updateCourseAttachment, updatedCourseImage, updatedCourseTitle } from '@/data'
import { Attachment, Course } from '@prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/global/file-upload'

type Props = {
    initialData: Course & { attachments: Attachment[] }
    courseId: string
}
const AttachmentForm = ({ initialData, courseId }: Props) => {
    const router = useRouter()
    const [ isEditing, setIsEditing ] = React.useState(false)
    const [ deleteId, setDeleteId ] = React.useState<string | null>(null)
    const toggleEditing = () => setIsEditing((prev) => !prev)
    
    
    const onSubmit = async(data: z.infer<typeof attachmentSchema>) => {
        try {
            await updateCourseAttachment(courseId, data)
            toggleEditing()
            router.refresh()
        } catch (error) {
            toast.error("Error updating title")
        }
    }

    const onDelete = async(id: string) => {
        try {
            setDeleteId(id)
            await deleteCourseAttachment(courseId, id)
            router.refresh()
            toast.success("Attachment deleted")
        } catch (error) {
            toast.error("Error deleting attachment")
        }finally {
            setDeleteId(null)
        }
    }
  return (
    <div className='mt-6 border bg-muted text-muted-foreground p-4'>
        <div className='font-medium flex items-center justify-between'> 
            Course attachments
            <Button variant={"ghost"} onClick={toggleEditing}>
                {isEditing && "Cancel"}
                {
                    !isEditing && (
                        <>
                            <PlusCircle className='h-4 w-4 mr-2' />
                            Add
                        </>
                    )
                }
            </Button>
        </div>
        {
            !isEditing && (
                <>
                    {
                        initialData.attachments.length === 0 && (
                            <div className='text-muted-foreground mt-2 italic'> 
                                No attachments added yet
                            </div>
                        )
                    }
                    {
                        initialData.attachments.length > 0 && (
                            <div className='space-y-2'>
                                {
                                    initialData.attachments.map((attachment) => (
                                        <div key={attachment.id} className='w-full flex itemc-center rounded-md p-3 border-foreground bg-primary/50 text-foreground'>
                                            <File className='h-4 w-4 mr-2 flex-shrink-0' />
                                            <p className='text-xs line-clamp-1'>
                                                {attachment.url}
                                            </p>
                                            {
                                                deleteId === attachment.id && (
                                                    <div>

                                                        <Loader2 className='h-4 w-4 animate-spin'/>
                                                    </div>
                                                )
                                            }
                                            {
                                                deleteId !== attachment.id && (
                                                    <button className='ml-auto hover:opacity-75 transition' onClick={() => onDelete(attachment.id)}>
                                                        <X className='w-4 h-4'/>
                                                    </button>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                
                </>
            )
        }
        {
            isEditing && (
                <div>
                    <FileUpload endpoint="courseAttachment" onChange={(url) => { if(url) {onSubmit({ url: url })}}} />
                </div>
            )
        }
    </div>
  )
}

export default AttachmentForm