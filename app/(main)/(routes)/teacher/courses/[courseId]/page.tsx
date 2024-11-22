import { categories, getCourse } from '@/data'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TitleForm from './_components/title-form'
import DesccriptionForm from './_components/description-form'
import PriceForm from './_components/price-form'
import CategoryForm from './_components/category-form'
import ImageForm from './_components/image-form'
import AttachmentForm from './_components/attachment-form'
import ChaptersForm from './_components/chapter-form'


type Props = {
    params: {
        courseId: string
    }
}
const page = async({ params }: Props) => {
    const user = await currentUser()
    if(!user) redirect('/')
    const course = await getCourse(params.courseId)
    if (!course) redirect('/')
    
    const getCategories = await categories()
    const requireFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some((chapter) => chapter.isPublished),
    ]

    const totalFields = requireFields.length
    const completeFields = requireFields.filter(Boolean).length
    const completionText = `${completeFields}/${totalFields}`
    const isCompleted = completeFields === totalFields
  return (
    <>
        {/* add banner */}
        <div className='p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-3xl font-bold'>
                        Course setup
                    </h1>
                    <span className='texte-muted-foreground'>
                        {completionText} fields completed

                    </span>
                </div>
                {/** add action */}
            </div>
            <div className='mt-14'>
            <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="details">Course Details</TabsTrigger>
                    <TabsTrigger value="content">Course Chapters</TabsTrigger>
                    <TabsTrigger value="resources">Course Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Details</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='space-y-2'>
                                <TitleForm initialData={course} courseId={course.id} />
                            </div>
                            <div className='space-y-2'>
                                <DesccriptionForm initialData={course} courseId={course.id} />
                            </div>
                            <div className='space-y-2'>
                                <PriceForm initialData={course} courseId={course.id} />
                            </div>
                            <div className='space-y-2'>
                                <CategoryForm initialData={course} courseId={course.id} options={getCategories.map((category) => ({ label: category.name, value: category.id}))} />
                            </div>
                            <div className='space-y-2'>
                                <ImageForm initialData={course} courseId={course.id}  />
                            </div>

                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="content">
                    <CardHeader>
                        <CardTitle>Course chapters</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2 '>
                            <ChaptersForm initialData={course} courseId={course.id}  />
                        </div>
                    </CardContent>
                </TabsContent>
                <TabsContent value="resources">
                    <CardHeader>
                        <CardTitle>Course resources</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <div className='space-y-2 '>
                            <AttachmentForm initialData={course} courseId={course.id}  />
                        </div>
                    </CardContent>
                </TabsContent>
            </Tabs>

            </div>
        </div>
        
    </>
  )
}

export default page