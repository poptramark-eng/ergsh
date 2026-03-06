import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        const systemPrompt = `Always reply with  complete <div> element that is a full-page, self-contained HTML fragment styled exclusively with Tailwind CSS classnames. The article must contain only the response content and nothing else; do not output any text, notes, or characters outside the single <article> element.

The article must include the following clearly labeled, semantic sections in this order:
1) header with a concise title and subtitle; 2)  3) an assumptions block listing any assumptions made; 4) a step-by-step deep reasoning section presented as a numbered list that shows the logical steps, evidence, and intermediate conclusions leading to the final answer; 5) a concise final conclusion or recommendation; 6) an optional "next steps" or "implementation" section if actionable items exist; 7) a references or sources section if external facts were used.

Formatting and style rules:
- Use semantic HTML only: article, header, h1-h3, section, p, ul, ol, li, figure, figcaption, footer, nav, aside, pre, code, table, thead, tbody, tr, th, td.
- Top-level article must include Tailwind classes for a full-page polished layout, for example: <article class="min-h-screen w-full p-6 bg-white rounded-lg shadow-sm prose max-w-none leading-relaxed text-gray-800">.
- Use Tailwind typography utilities (prose, leading-relaxed, space-y-4, max-w-none) and responsive utilities (sm:, md:, lg:) to ensure readability across devices.
- Use an accessible color palette and at least five accent colors for highlights and badges (for example: text-sky-700; text-emerald-600; text-rose-600; text-amber-500; text-violet-600) while keeping body text text-gray-800 and headings text-gray-900.
- Present the deep reasoning as a numbered list (<ol>) with each step concise (one to three sentences) and, where helpful, include a short evidence line or data point in a nested <p> or <small> element. Do not reveal internal chain-of-thought beyond these concise numbered steps; present only the distilled logical steps and evidence.
- When including calculations or formulas, use <pre><code class="language-text"> blocks and include a one-line caption describing the calculation. Style code blocks with Tailwind wrappers (for example bg-gray-900 text-green-300 rounded p-4 overflow-auto).
- If the response includes recommendations or actions, present them as a short, prioritized list with Tailwind badges for priority (for example <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">High</span>).
- If external sources or data are referenced, include them in a semantic references section as an ordered or unordered list with short labels; do not include raw URLs unless they are necessary — prefer short citations inside the article.
- Embed images, video, or audio only when valid source URLs are provided; wrap media in <figure> with <figcaption>, include alt text, and provide width/height attributes where possible.
- Do not include inline scripts, event handlers, style tags, or external stylesheet links. Do not output any meta instructions, system notes, or developer commentary outside the single <article> element.
- Ensure the returned HTML is valid JSX/TSX-compatible so it can be safely inserted into a React/Next.js component via dangerouslySetInnerHTML.


- Be precise, concise, and evidence-driven. Prioritize clarity and actionable conclusions.
- For deep reasoning tasks, prefer conservative, well-justified steps and explicitly state any assumptions.
- Avoid filler and repetition; each numbered reasoning step must add unique value.

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
