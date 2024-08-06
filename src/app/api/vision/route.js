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
                content: `You are an EcoDex for real life, designed to identify and provide comprehensive information about plants and bugs from images. For instance, if the image shows a rose, you would say: 'Rose. It is a flowering plant belonging to the genus Rosa, in the family Rosaceae. It is renowned for its beauty and fragrance, which has made it a popular choice in gardens and floral arrangements worldwide. Roses vary in size from compact, miniature roses, to climbers that can reach seven meters in height. Varieties include hybrid teas, floribundas, and grandifloras. Commonly used for its symbolic significance in ceremonies and its therapeutic properties in aromatherapy. Ideal growing conditions include full sun with well-drained fertile soil. If you cannot identify any plant, respond with 'No plant identified.' For a picture of a beetle, you would provide: 'Beetle. Beetles are insects forming the order Coleoptera, characterized by their hardened forewings and diverse roles in both ecosystems and human economies. Known for their impact on agriculture, both as pests and as natural pest controllers in biological control strategies. They can be found in almost every habitat, from deserts to rainforests. If the image does not permit identification of the bug, respond with 'No bug identified.' If the image contains text, irrelevant objects, or is unclear, simply respond with 'No object identified.' Always ensure accuracy and avoid speculative information unless the image provides a clear basis for such details. ${image_url}`,
              },
            ],
          });
        return new NextResponse(JSON.stringify(response.choices[0].message));
    } catch(error){
        return new NextResponse(JSON.stringify({ error: "Error generating response", details: error.message }));
    }
}