import { TutorProfile } from "../../../generated/prisma/client";
import { TutorProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";



const createTutorProfile = async (data: Omit<TutorProfile, "id" | "createdAt" | "updateAt" | "user_id">, user_id: string) => {
    // console.log(payload);
    const result = await prisma.tutorProfile.create({
        data: {
            ...data,
            user_id: user_id
        }
    })
    return result
}

const getTutorProfile = async (user_id: string) => {
    const result = await prisma.tutorProfile.findMany({
        where: {
            user_id: user_id
        },
        include: {
            bookings: true,
            reviews: true,
            timeSlots: true,
            user: true,            
            category: true
        }
    })
    return result
}

const getAllTutor = async ({ search, sortOrder }: {
    search: string | undefined,
    sortOrder: 'asc' | 'desc';
}) => {
    const whereConditions: TutorProfileWhereInput = {}

    if (search) {
        whereConditions.OR = [
            {
                category: {
                    category: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            },
            {
                category: {
                    description: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            }
        ]
    }

    const allTutor = await prisma.tutorProfile.findMany({
        include: {
            category: true,
            user: true
        },
        orderBy: {
            rating_avg: sortOrder
        },
        where: whereConditions
    })
    return allTutor
}

const getTutorById = async (tutorId: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: {
            id: tutorId
        },
        include: {
            bookings: true,
            reviews: true,
            timeSlots: true,
            user: true,
            category: true
        }
    })
    return result
}


export const tutorService = {
    createTutorProfile,
    getTutorProfile,
    getAllTutor,
    getTutorById
}
