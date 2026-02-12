// src/app/api/github/route.ts

export const dynamic = "force-static"; // we need this for static export

export async function GET() {
  const res = await fetch(
    "https://github.com/users/adawonghl/contributions?from=2026-01-01&to=2026-12-31",
    {
      cache: "force-cache", // ensures static behavior
    }
  );

  const text = await res.text();

  return new Response(text, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
