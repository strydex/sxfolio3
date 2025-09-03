import Chat from '@/models/Chat'
import { NextResponse } from 'next/server'
import connect from '@/utils/db'

export const POST = async (req) => {
    try {
        const { name, message } = await req.json()

        await connect()

        const newChat = new Chat({ name, message })

        await newChat.save()

        return NextResponse.json({
            message: "Сообщение опубликовано",
            status: 201
        })
    } catch (err) {
        return NextResponse.json({
            message: "Ошибка при публикации",
            status: 500
        })
    }
}
