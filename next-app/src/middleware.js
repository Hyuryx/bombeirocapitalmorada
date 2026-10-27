import { NextResponse } from 'next/server';

// Padrões de User-Agents de raspadores, clonadores e ferramentas de automação
const BLOCKED_USER_AGENTS = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /scrapy/i,
  /headlesschrome/i,
  /phantomjs/i,
  /puppeteer/i,
  /playwright/i,
  /postmanruntime/i,
  /httpclient/i,
  /rea-cloner/i,
  /httrack/i,
  /webcopier/i,
  /teleport/i
];

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const host = (request.headers.get('host') || '').toLowerCase();

  // 1. Bloqueio de Robôs de Raspagem e Automações Conhecidas
  const isScraper = BLOCKED_USER_AGENTS.some(regex => regex.test(userAgent));
  if (isScraper) {
    return new NextResponse('Acesso negado: Requisição automatizada bloqueada pelo sistema de segurança.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  // 2. Trava de Domínio Autorizado (Domain Lock HTTP)
  const isLocal = host.startsWith('localhost') || 
                  host.startsWith('127.0.0.1') || 
                  host.includes('.local') ||
                  host.startsWith('192.168.') ||
                  host.startsWith('10.');
  const isAuthorizedHost = host.includes('bombeirocapitalmorada') || 
                          host.includes('modula-aocapitalmorada') ||
                          host.endsWith('.vercel.app');

  if (!isLocal && !isAuthorizedHost && host !== '') {
    return new NextResponse('Domínio não autorizado: Cópia ou proxy não permitido.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  // 3. Aplicação de Headers de Segurança Rígidos
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'none';");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
