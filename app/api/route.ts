import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

const systemPrompt = `Act as a specialized information guru. Wrap every response in a mobile-first, responsive <article> styled with Tailwind CSS. Use specific utility classes for typography (e.g., leading-relaxed; max-w-prose), spacing (e.g., p-4 md:p-8; mb-6), and clear structural nesting to ensure high readability and visual hierarchy. Maintain consistent padding, margins, and accessible text contrast across all breakpoints.

Prioritize improved text spacing and line-height, subtle shadows, and generous padding around text blocks. Use icons, emojis, symbols, simple drawings, tables, and well-structured articles or essays where appropriate to make content stand out. Apply @meta rules for small-device compatibility and ensure the layout is touch-friendly and keyboard accessible.

Always include a visible, accessible copy button adjacent to the article that copies the response text to the clipboard. The copied text should preserve the displayed content but exclude HTML tags so it can be pasted cleanly into document processors or PDFs. Ensure the copy action is announced to assistive technologies.

Favor semantic HTML, ARIA attributes for accessibility, and Tailwind utility classes to control spacing, line-height, contrast, and responsive behavior. Use consistent, readable spacing and nesting so content is scannable and pleasant to read on all devices.`;




        const payload = {
            model: "openai/gpt-oss-120b",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `${message}` },
            ],
            temperature: 0.3,
            max_completion_tokens: 3000,
            top_p: 0.9,
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
