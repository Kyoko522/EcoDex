import { NextResponse } from "next/server";
import OpenAI from "openai";

// Authentication
const openai = new OpenAI({
    apiKey: process.env.openai_key,
});

export async function POST(request) {
    const { image_url, base64_image } = await request.json();  // Destructure both image_url and base64_image from the request body
    let imageInput;
    if (image_url) {
        // If image URL is provided, use it directly
        imageInput = image_url;
    } else if (base64_image) {
        // If base64 image is provided, format it as a data URL
        imageInput = `data:image/jpeg;base64,${base64_image}`;
    } else {
        // If neither is provided, return an error
        return new NextResponse(
            JSON.stringify({ error: "No image or url data provided" }),
            { status: 400 }
        );
    }

    try {
        // Construct the request for OpenAI with the formatted image input
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: `content: "You are an EcoDex, designed to identify and provide comprehensive information about plants and bugs from images. For plants, respond with structured information in this format: <Plant Name>. <Brief Description>. <Key Features>. <Habitat>. <Care Tips>. For example, if the image shows a rose, respond with: Rose. A flowering plant belonging to the genus Rosa, in the family Rosaceae. Known for its beauty and fragrance, it is a popular choice in gardens and floral arrangements. Roses range from miniature types to climbers up to 7 m in height. Common varieties include hybrid teas and floribundas. They thrive in full sun, well-drained fertile soil, and require watering twice weekly. If no plant is identifiable, respond with: No plant identified. For bugs, respond with structured information in this format: <Bug Name>. <Brief Description>. <Key Features>. <Role in Ecosystem>. <Management Tips>. For example, if the image shows a beetle, respond with: Beetle. Insects of the order Coleoptera, characterized by hardened forewings. Beetles play diverse roles, from agricultural pests to natural pest controllers. Found in habitats ranging from deserts to rainforests. Feeding habits depend on species, including plants, smaller insects, or organic matter. Average lifespan is 1–3 years. To manage infestations, use predators like birds or organic pesticides like neem oil. If no bug is identifiable, respond with: No bug identified. For unclear or irrelevant images, such as those containing text, unrelated objects, or insufficient detail, respond with: No object identified. Always ensure responses are accurate, structured, and concise, avoiding speculation unless supported by clear evidence in the image. Use the response format <Category (Plant/Bug)>: <Details> for clarity and to facilitate programmatic extraction. For example, an appropriate response for a plant would be: Plant: Rose. A flowering plant... and for a bug: Bug: Beetle. Insects of the order...." ${imageInput}`,
                },
            ],
        });

        return new NextResponse(JSON.stringify(response.choices[0].message));
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Error generating response", details: error.message }),
            { status: 500 }
        );
    }
}