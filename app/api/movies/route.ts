import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Parâmetro ?q é obrigatório" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OMDB_API_KEY não configurada no .env.local" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
  );

  const data = await response.json();

  return NextResponse.json(data);
}