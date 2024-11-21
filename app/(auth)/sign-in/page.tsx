"use client"; //car utilisation de component uniquement dans un client

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { loginSchema } from '@/schema';
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';
import { signIn } from "next-auth/react"
import { DEFAULT_REDIRECT } from '@/routes';
import { useSearchParams } from 'next/navigation';
import FormError from '@/components/global/form-error';

const page = () => {

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ?
    "Account not linked with any OAuth provider" : null

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    }

  })

  const ispending = form.formState.isSubmitting
  const [isGooglePending, setGooglePending] = React.useState(false)
  const [isGithubPending, setGithubPending] = React.useState(false)

  const onSubmit = async(data: z.infer<typeof loginSchema>) => {
    try {
      signIn("resend", {email: data.email, redirectTo: callbackUrl || DEFAULT_REDIRECT})
      
    } catch (error) {
      console.log(error)
    }
  }

  const onclick = async(provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_REDIRECT})
  }
  return (
    <div className='text-white w-full h-full flex flex-col justify-center items-center'>
      <Card className='max-w-sm w-full bg-white text-gris border-gris shadow-3xl border-none'>
        <CardHeader className='w-full h-1/4 flex flex-col justify-center items-center  rounded-b-lg rounded-t-lg'>
          <CardTitle className='p-1'>Se Connecter</CardTitle>
          <CardDescription className='text-gris/50'>Connectez-vous à un compte existant</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <FormError message={urlError}/>
          <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                name='email'
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' placeholder='Entrez votre email' className='text-white' disabled={ispending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              
              />
              <Button type='submit' className='bg-vert w-full' disabled={ispending}>Se Connecter</Button>
            </form>
          </Form>

          <div>
            <div className='w-full h-[1px] border'/>
            <span className='flex-1'>OU</span>
            <div className='w-full h-[1px] border'/>
          </div>

          <Button className='w-full flex space-x-2 bg-white' variant={"outline"} disabled={ispending} onClick={() => {setGooglePending(true); onclick('google')}}>
            {
              isGooglePending ? <Loader2 className='w-4 h-4 animate-spin ' /> : 
              <>
                <FcGoogle className='w-6 h-6' />
                <span>Se Connecter avec Google</span>
              </>
            }
            
            
          </Button>

          <Button className='w-full flex space-x-2 bg-white' variant={"outline"} disabled={ispending} onClick={() => {setGithubPending(true); onclick('github')}}>
            {
              isGithubPending ? <Loader2 className='w-4 h-4 animate-spin' /> :
              <>
                <FaGithub className='w-6 h-6' />
                <span>Se Connecter avec Github</span>
              </>
            }
            
          </Button>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default page