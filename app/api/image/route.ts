//add the configuration for Open A.I
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { parse } from "path";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        // Stucture the body
        const body = await req.json();
        const { prompt, amount = 1, resolution = "1024x1024" } = body;

         // Check if the user is logged in
         if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
         }

         if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500});
         }

         // Check if the user has entered a prompt in the image generation input box
         if (!prompt) {
            return new NextResponse("Promt is required", { status: 400});
         }

         if (!amount) {
            return new NextResponse("Amount is required", { status: 400});
         }

         if (!resolution) {
            return new NextResponse("resolution is required", { status: 400});
         }

         const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
          });

         return NextResponse.json(response.data.data);

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }  
};