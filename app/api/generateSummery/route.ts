import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const { todos} = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: `When responding, Welcome the user always as Shamun and say welcome to the shamun's Todo App!
                Limit the  ressponse to 200 characters`
            },
            {
                role: 'user',
                content: `Hi there, provideasummery of the following todos. Count how may todos are in each category such as To do, In progress and Done. then tell the user to have a productive day! Hesre's the data: ${JSON.stringify(todos)}`
            },
        ]
    });

    const { data} = response;

    return NextResponse.json(data.choices[0].message);
}