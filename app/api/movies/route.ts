import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");
  const id = searchParams.get("id");

  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OMDB_API_KEY não configurada" },
      { status: 500 }
    );
  }

  // Buscar filmes por nome
  if (query) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  }

  // Buscar detalhes por ID
  if (id) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
    );
    const data = await response.json();
    return NextResponse.json(data);
  }

  return NextResponse.json(
    { error: "Parâmetro inválido: informe ?q ou ?id" },
    { status: 400 }
  );
}
