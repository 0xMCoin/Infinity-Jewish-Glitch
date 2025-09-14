import type { TokenData } from "@/interfaces";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BIRDEYE_URL = "https://public-api.birdeye.so/defi/v3/token/market-data";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mint = searchParams.get("mint");
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API_KEY não definida" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-chain": "solana",
        "X-API-KEY": apiKey,
      },
    };

    const url = `${BIRDEYE_URL}?address=${mint}&ui_amount_mode=scaled`;

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Birdeye API error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({
          error: "Falha ao consultar Birdeye API",
          status: response.status,
          details: errorText,
        }),
        { status: 502, headers: { "content-type": "application/json" } }
      );
    }

    const json = await response.json();

    if (!json.success || !json.data) {
      return new Response(
        JSON.stringify({
          error: "Dados inválidos da Birdeye API",
          message: json.message,
        }),
        { status: 502, headers: { "content-type": "application/json" } }
      );
    }

    const data = json.data as TokenData;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=60", // cache por 1 minuto
      },
    });
  } catch (e: any) {
    console.error("Erro na API:", e);
    return new Response(
      JSON.stringify({
        error: "Erro inesperado",
        details: String(e?.message ?? e),
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
