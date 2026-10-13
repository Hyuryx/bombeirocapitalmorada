import { NextResponse } from 'next/server';

import { DISCORD_CLIENT_ID } from '@/lib/discordConfig';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const militarId = searchParams.get('id') || '';
  const hwid = searchParams.get('hwid') || '';
  const deviceType = searchParams.get('type') || 'desktop';
  const panel = searchParams.get('panel') || '';

  // Obter o host atual dinamicamente
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const redirectUri = `${protocol}://${host}/api/auth/discord/callback`;

  // Empacotar o estado para recuperar após a autorização do Discord
  const statePayload = Buffer.from(
    JSON.stringify({
      id: militarId,
      hwid,
      deviceType,
      panel,
      ts: Date.now()
    })
  ).toString('base64');

  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'identify guilds guilds.members.read',
    state: statePayload,
    prompt: 'consent'
  });

  const discordAuthUrl = `https://discord.com/oauth2/authorize?${params.toString()}`;

  return NextResponse.redirect(discordAuthUrl);
}
