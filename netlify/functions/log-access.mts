import type { Context, Config } from "@netlify/functions";
import { neon } from "@netlify/neon";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const dados = await req.json();
    const sql = neon();

    await sql`
      INSERT INTO access_logs (tz, idioma, plataforma, user_agent, referrer, ip, cidade, regiao, pais)
      VALUES (
        ${dados.tz || null},
        ${dados.idioma || null},
        ${dados.plataforma || null},
        ${dados.user_agent || null},
        ${dados.referrer || null},
        ${dados.ip || null},
        ${dados.cidade || null},
        ${dados.regiao || null},
        ${dados.pais || null}
      )
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error inserting access log:", error);
    return new Response(JSON.stringify({ error: "Failed to log access" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/log-access"
};
