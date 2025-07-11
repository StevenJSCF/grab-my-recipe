import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// the transcript json will be obtained from the youtube-transcript api
// /api/recipe/parse-recipe?query=transcript-json

// //Get the youtube video transcript
// export async function GET(request: NextRequest){
//   const {searchParams} = new URL(request.url)
// }

// example: http://localhost:3000/api/recipe/parse-recipe?transcript=your+instructions+here
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { transcript, description } = body;

  if (!transcript || !description) {
    return NextResponse.json({ error: "Missing transcript" });
  }

  const combinedText = `Transcript:\n${transcript}\n\nDescription:\n${description}`;

  try {
    const result = await parseTranscript(combinedText);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to parse transcript: " + e},
      { status: 500 }
    );
  }
}

async function parseTranscript(transcript: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.responses.create({
      model: "o4-mini-2025-04-16",
      input: [
        {
          role: "system",
          content: `You are a helpful assistant designed to scrape the given cooking youtube video and output a JSON as shown in the example.
                    You will be given a transcript and the video description, In case you cannot find the required info inside the transcript search the description. 
                    For ingredients that dont have an amount use N/A this doesn't apply to the ingredients that don't have an exact ammount but you can say or what the video says for example: splash of milk or 2 drops of oil
                    Can you also calculat ethe duration of the recipe, it only have to be an approx. Sane with the serving size   
          Please send the JSON in this format:
          {
            "title": "Pancakes",
              "ingredients": [
                { "name": "Flour", "quantity": "1 cup" },
                { "name": "Milk", "quantity": "1/2 cup" },
                { "name": "Egg", "quantity": "1" }
              ],
              "instructions": [
                { "step": 1, "description": "Mix flour and milk in a bowl." },
                { "step": 2, "description": "Add egg and stir until smooth." },
                { "step": 3, "description": "Pour batter onto a hot griddle and cook until golden." }
              ],
              "duration": "x min" (here just put x min or x hour dont add additional info keep it simple)
	            "serving": "x people"
              "message": "cooking_video" (make sure you send this EXACT message dont chnage anything)
            }

            If the transcript given is not a cooking youtube video please send a JSON 
            {
              "message": "not_a_cooking_video" (make sure you send this EXACT message dont chnage anything)
            }
          `,
        },
        { role: "user", content: transcript },
      ],
      text: { format: { type: "json_object" } },
    });

    console.log("this is the response status: " + response.status);

    //HANDLING EDGE CASES
    if (response.status === "completed") {
      return response;
    }

    if (
      response.status === "incomplete" &&
      response.incomplete_details?.reason === "max_output_tokens"
    ) {
      return {
        status: "error",
        reason: "max_output_tokens",
        message:
          "The recipe is too long or the output was cut off. Please try with a shorter video or transcript.",
      };
    }

    return response;

    // //EDGE CASES
    // // Check if the conversation was too long for the context window, resulting in incomplete JSON
    // if (
    //   response.status === "incomplete" &&
    //   response.incomplete_details?.reason === "max_output_tokens"
    // ) {
    //   // your code should handle this error case
    // }

    // // Check if the OpenAI safety system refused the request and generated a refusal instead
    // // Check if the first output item has a 'content' property and its first element is a refusal
    // if (
    //   response.output[0] &&
    //   "content" in response.output[0] &&
    //   Array.isArray((response.output[0] as any).content) &&
    //   (response.output[0] as any).content[0]?.type === "refusal"
    // ) {
    //   // your code should handle this error case
    //   // In this case, the .content field will contain the explanation (if any) that the model generated for why it is refusing
    //   console.log((response.output[0] as any).content[0].refusal);
    // }

    // // Check if the model's output included restricted content, so the generation of JSON was halted and may be partial
    // if (
    //   response.status === "incomplete" &&
    //   response.incomplete_details?.reason === "content_filter"
    // ) {
    //   // your code should handle this error case
    // }

    // if (response.status === "completed") {
    //   // In this case the model has either successfully finished generating the JSON object according to your schema, or the model generated one of the tokens you provided as a "stop token"
    //   // if (apiKeys.stop_tokens.length === 0 || response.output_text.endsWith(apiKeys.stop_tokens[0])) {
    //   //   // If you didn't specify any stop tokens, then the generation is complete and the content key will contain the serialized JSON object
    //   //   // This will parse successfully and should now contain  {"winner": "Los Angeles Dodgers"}
    //   //   console.log(JSON.parse(response.output_text))
    //   // } else {
    //   //   // Check if the response.output_text ends with one of your stop tokens and handle appropriately
    //   // }
    // }
  } catch (e) {
    // Your code should handle errors here, for example a network error calling the API
    console.error(e);
  }
}
