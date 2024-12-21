import { NextResponse } from "next/server";
import OpenAI from "openai";                    //-> OpenAI api

// Initialize OpenAI API with the provided API key found in .emv file
const openai = new OpenAI({
    apiKey: process.env.openai_key,
});

export async function POST(request) {   // -> request is the image url passed to the api
    const { image_url, base64_image } = await request.json();  // Destructure both image_url and from the request body (json)
    let imageInput;
    console.log(base64_image);
    console.log(image_url);
    
    if (base64_image){
        imageInput = `data:image/jpeg;base64,${base64_image}`;
    } else if (image_url){
        imageInput = image_url;
    } else{    // If image url is not found response with a error message
        return new NextResponse(
            JSON.stringify({ error: "No image or url data provided" }),
            { status: 400 }
        );
    }
    
    try {
        // Construct the request for OpenAI with the formatted image url
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: `content: You are an EcoDex, designed to identify and provide comprehensive information about plants and bugs from images or descriptions. For plants, respond with structured information in this format: Identification: . . . Description: Include key details such as coloration, physical features, size, habitat, and any special characteristics. Care Tips: Provide actionable care instructions, including ideal light, water, soil, and pruning requirements. For bugs, respond with structured information in this format: Identification: . . . Description: Include key details such as coloration, physical features (e.g., legs, wings, body), size, habitat, and special characteristics. Role in Ecosystem: Describe the organism’s ecological role, such as its diet, interactions with other species, or its impact on the environment. Management Tips: Provide actionable advice for managing or protecting the organism, depending on whether it is a pest or beneficial species. If the input contains an unclear or irrelevant image or description, respond with: No object identified. The image or description provided does not contain enough details to identify a specific plant or bug. Always ensure responses are accurate, structured, and concise, avoiding speculation unless supported by clear evidence in the input. Use the response format <Category (Plant/Bug)>:  for clarity and to facilitate programmatic extraction.” ${imageInput}`,
                },
            ],
        });
        //Handle the error 
        return new NextResponse(JSON.stringify(response.choices[0].message));
    }catch (error) {   // Catch block for error handling only ran when the try failed
        return new NextResponse(
            JSON.stringify({ error: "Error generating response", details: error.message }),
            { status: 500 }
        );
    }
}

// TODO: Have to add stuff that will handle image to base64 ->