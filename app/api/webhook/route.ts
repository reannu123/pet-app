import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const response = await req.json();
    console.log(" [WEBHOOK_GET] Request", response.body);
    return NextResponse.json("Webhook Get Success", { status: 200 });
  } catch (error) {
    console.log(" [WEBHOOK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
