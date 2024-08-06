import { NextResponse } from "next/server";
import OpenAI from "openai";

// Authentication
const openai = new OpenAI({
    apiKey: process.env.openai_key,
});

export async function POST(request){
    const { image_url } = await request.json();
    try{
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: `What’s in this image? ${image_url}`,
              },
            ],
          });
        return new NextResponse(JSON.stringify(response.choices[0].message));
    } catch(error){
        return new NextResponse(JSON.stringify({ error: "Error generating response", details: error.message }));
    }
}