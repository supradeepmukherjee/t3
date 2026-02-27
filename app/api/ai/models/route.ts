import { Model } from "@/model.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const res = await fetch('https://openrouter.ai/api/v1/models', { method: 'GET', })
        if (!res.ok) {
            console.log(res)
            return NextResponse.json({
                data: null,
                msg: 'Something went wrong'
            }, { status: 500 })
        }
        const data = await res.json()
        const free = data.data.filter((m: Model) => parseFloat(m.pricing?.prompt || '0') === 0 && parseFloat(m.pricing?.completion || '0') === 0)
        return NextResponse.json({ data: data.data.filter((m: Model) => parseFloat(m.pricing?.prompt || '0') === 0 && parseFloat(m.pricing?.completion || '0') === 0).map(({ architecture, context_length, description, id, name, pricing, top_provider }: Model) => ({ architecture, context_length, description, id, name, pricing, top_provider })) }, { status: 200 })
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            data: null,
            err: 'Something went wrong'
        }, { status: 500 })
    }
}