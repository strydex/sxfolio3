import Chat from '@/models/Chat'
import { NextResponse } from 'next/server'
import connect from '@/utils/db'

export const GET = async () => {
    try {
        await connect()
        const data = await Chat.find({})

        if (data.length === 0) {
            return NextResponse.json({
                message: "Данные не найдены",
                status: 204
            })
        }

        return NextResponse.json({
            message: "Messages are collected",
            status: 200,
            data
        })
    } catch (error) {
        throw new Error(error)
    }
}
