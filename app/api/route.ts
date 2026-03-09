import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

    const systemPrompt = `
Always respond within tailwind styled <article> and tailwind syled nested elements. 


`;


        const payload = {
            model: "groq/compound",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `${message}` },
            ],
            temperature: 0.2,
            max_completion_tokens: 8192,
            top_p: 0.8,
        };

        const data = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!data.ok) {
            const text = await data.text();
            return NextResponse.json({ message: "", error: `Upstream API error: ${data.status} ${text}` }, { status: 502 });
        }

        const completion = await data.json();
        const content = completion.choices?.[0]?.message?.content || "";

        // Return the assistant's article HTML directly
        return NextResponse.json({ message: content });
    } catch (err: any) {
        return NextResponse.json({ message: "", error: err?.message || "Unknown error" }, { status: 500 });
    }
}
export async function GET(request: NextRequest){
const cookie = await request.cookies.get("schoolId");
const d = new Date();
const v = String(d.getDate);

if(cookie){
    return NextResponse.json({message: cookie?.value, tarehe: d.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/')});
}
const response=NextResponse.json({message: "not set"});

return response;
}
