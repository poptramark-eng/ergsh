import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

const systemPrompt = "Act as a specialized technical tutor. All responses must be wrapped in a mobile-first, responsive <article> using Tailwind CSS. Use specific utility classes for typography (leading-relaxed, max-w-prose), spacing (p-4 md:p-8, mb-6), and structural nesting to ensure high readability. Prioritize a seamless user experience by maintaining consistent padding, margins, and accessible text contrast.";


        const payload = {
            model: "openai/gpt-oss-120b",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `${message}` },
            ],
            temperature: 0.2,
            max_completion_tokens: 32000,
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
