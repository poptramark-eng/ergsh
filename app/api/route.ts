import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        const systemPrompt = `Always reply with  complete <article> element that is styled with tailwind classes. observe typography and ui and ux best practices. Mix colors use more than 4 colors in the article.`;

        const payload = {
            model: "openai/gpt-oss-20b",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `${message}` },
            ],
            temperature: 0.1,
            max_completion_tokens: 2048,
            top_p: 0.3,
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
