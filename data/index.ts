"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { error } from "console"

const _isAuthUser = async() => {
    try {
        const auth = await currentUser()
        if(!auth || !auth.email) {
            throw new Error("User is not authentificated")
        }

        const user = db.user.findUnique({
            where: {
                email: auth.email
            }
        })



        return user

    } catch (error) {
        console.log("Error in _isAuthUser, data folder", error)
        throw error
    }
}


export const createCourse = async (
    data: {title: string}
) => {
    try{
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }

        const course = db.course.create({
            data: {
                title: data.title,
                teacherId: user.id
            }
        })

        return course
    } catch(error) {
        console.log("Error in createCourse, data folder", error)
        throw error
    }
}

export const getCourse = async (
    courseId: string
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }

        const course = db.course.findUnique({
            where: {
                id: courseId,
                teacherId: user.id
            },
            include: {
                attachments: true,
                chapters: {
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        })

        return course
        
    } catch (error) {
        console.log("Error in getCourse, data folder", error)
        throw error
    }
}

export const updatedCourseTitle = async (
    courseId: string,
    data: {title: string}
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                title: data.title
            }
        })

        return course
    } catch (error) {
        console.log("Error in updatedCourseTitle, data folder", error)
        throw error
    }
}

export const updatedCourseDescription = async (
    courseId: string,
    data: {description: string}
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                description: data.description
            }
        })

        return course
    } catch (error) {
        console.log("Error in updatedCourseDescription, data folder", error)
        throw error
    }
}

export const updatedCoursePrice = async (
    courseId: string,
    data: {price: number}
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                price: data.price
            }
        })

        return course
    } catch (error) {
        console.log("Error in updatedCoursePrice, data folder", error)
        throw error
    }
}

export const categories = async ( ) => {
    try {
        const categories = db.category.findMany({
            orderBy: {
                name: "asc"
            }
        })

        return categories
    } catch (error) {
        console.log("Error in categories, data folder", error)
        throw error
    }
}

export const updatedCourseCategory = async (
    courseId: string,
    data: {categoryId: string}
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                categoryId: data.categoryId
            }
        })

        return course
    } catch (error) {
        console.log("Error in updatedCourseCategory, data folder", error)
        throw error
    }
}

export const updatedCourseImage = async (
    courseId: string,
    data: {imageUrl: string}
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                imageUrl: data.imageUrl
            }
        })

        return course
    } catch (error) {
        console.log("Error in updatedCourseImage, data folder", error)
        throw error
    }
}

export const updateCourseAttachment = async (
    courseId: string,
    data: {url: string}
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }
        const attachment = await db.attachment.create({
            data: {
                url: data.url,
                courseId: courseId,
                name: data.url.split('/').pop()
            }
        })
    } catch (error) {
        console.log("Error in updateCourseAttachment", error)
        throw error
    }
}

export const deleteCourseAttachment = async (
    courseId: string,
    id: string
) => {
    try {
        const user = await _isAuthUser()
        if (!user) {
            throw new Error("User not found")
            
        }
        const attachment = await db.attachment.delete({
            where: {
                id: id,
                courseId: courseId
            }
        })
        return attachment
    } catch (error) {
        console.log("Error in updateCourseAttachment", error)
        throw error
    }
}


