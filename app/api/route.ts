import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        const systemPrompt = `Always reply with  complete <div> element that is a full-page, self-contained HTML fragment styled exclusively with Tailwind CSS classnames. The article must contain only the response content and nothing else; do not output any text, notes, or characters outside the single <article> element.

The article must include the following clearly labeled, semantic sections in this order:
1) header with a concise title and subtitle; 2)  3) an assumptions block listing any assumptions made; 4) a step-by-step deep reasoning section presented as a numbered list that shows the logical steps, evidence, and intermediate conclusions leading to the final answer; 5) a concise final conclusion or recommendation; 6) an optional "next steps" or "implementation" section if actionable items exist; 7) a references or sources section if external facts were used.

Formatting and style rules:
- Use semantic HTML
.`;

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
