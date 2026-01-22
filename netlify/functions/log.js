import { Client } from "pg";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    const client = new Client({
      connectionString: process.env.NETLIFY_DATABASE_URL
    });

    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS access_logs (
        id SERIAL PRIMARY KEY,
        horario TIMESTAMPTZ,
        tz TEXT,
        idioma TEXT,
        plataforma TEXT,
        user_agent TEXT,
        referrer TEXT,
        ip TEXT,
        cidade TEXT,
        regiao TEXT,
        pais TEXT
      );
    `);

    await client.query(`
      INSERT INTO access_logs
      (horario, tz, idioma, plataforma, user_agent, referrer, ip, cidade, regiao, pais)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `, [
      data.horario,
      data.tz,
      data.idioma,
      data.plataforma,
      data.user_agent,
      data.referrer,
      data.ip,
      data.cidade,
      data.regiao,
      data.pais
    ]);

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
