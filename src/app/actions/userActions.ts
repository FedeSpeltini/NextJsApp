'use server';

import { memberEditSchema, MemberEditSchema } from "@/lib/schemas/memberEditShema";
import { ActionResult } from "@/types";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { Member, Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();

        const validated = memberEditSchema.safeParse(data);

        if(!validated.success) return {status: 'error', error: validated.error.errors}

        const {name, description, city, country} = validated.data;

        const member = await prisma.member.update({
            where: {userId},
            data: {
                name, //como los nombres coinciden con los de las variables, no hace falta repetirlos
                description,
                city,
                country

            }
        })
        return {status: 'success', data: member}
    } catch (error) {
        console.log(error);

        return{status: 'error', error: 'something went wrong'}
    }
}

export async function addImage(url: string, publicId: string) {
    try {
        const userId = await getAuthUserId();

        return prisma.member.update({
            where: {userId},
            data:{
                photos: {
                    create: [
                        {
                            url,
                            publicId
                        }
                    ]
                }
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function setMainImage(photo: Photo){
    try {
        const userId = await getAuthUserId();

         await prisma.user.update({
            where: {id: userId},
            data: {image: photo.url}
        })
        return prisma.member.update({
            where: {userId},
            data: {image: photo.url}
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteImage(photo: Photo) {
    try {

        const userId = await getAuthUserId();

        if(photo.publicId) {
            await cloudinary.v2.uploader.destroy(photo.publicId);
        }

        return prisma.member.update({
            where: {userId},
            data:{
                photos: {
                    delete: {id: photo.id}
                }
            }
        })
        
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

export async function getUserInfoForNav() {
    try {
        const userId = await getAuthUserId();
        return prisma.user.findUnique({
            where: {id: userId},
            select: {name: true, image: true}
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}