//add the configuration for Open A.I
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Assign a Default message to let the A.I Model know how to behave
const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        // Stucture the body
        const body = await req.json();
        const { messages } = body;

         // Check if the user is logged in
         if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
         }

         if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500});
         }

         // Check if the user has entered a message in the conversation input box
         if (!messages) {
            return new NextResponse("Promt is required", { status: 400});
         }

         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            
            // Make sure that the messages property always takes in the instruction message provided at the the top of tis code
            messages: [instructionMessage, ...messages]
         });

         return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }  
};