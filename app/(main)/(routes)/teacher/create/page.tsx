"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'

import { Button } from "@/components/ui/button"
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
import { creatCourseSchema } from "@/schema"
import Link from "next/link"

const page = () => {

    const form = useForm<z.infer<typeof creatCourseSchema>>({
        resolver: zodResolver(creatCourseSchema),
        defaultValues: {
          title: "",
        },
    })
    const { isSubmitting, isValid } = form.formState

    const onSubmit = async(data: z.infer<typeof creatCourseSchema>) => {
        console.log(data)
    }

  return (
    <div className="max-w-5xl mx-auto h-full w-full flex md:items-center md:justify-center p-6">
        <div>
            <h1 className="text-2xl">
                Name your course
            </h1>
            <p className="text-sm text-muted-foreground">
                What will students learn in this course ?
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Add title" 
                                        {...field} 
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What will students learn in this course ?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full items-center gap-x-2">
                        <Button type="submit" className="bg-vert" disabled={isSubmitting || isValid }>Create</Button>
                        <Link href={"/"}>
                            <Button type="button" className="bg-rouge hover:bg-rouge/70">Cancel</Button>
                        
                        </Link>
                    </div>
                    
                </form>
            </Form>
        </div>
    </div>
  )
}

export default page