type Env = Record<string, never>;

function pickLangFromAcceptLanguage(value: string | null): 'cn' | 'en' {
  if (!value) return 'cn';
  const v = value.toLowerCase();
  if (v.includes('zh')) return 'cn';
  return 'en';
}

function getCookie(headers: Headers, name: string): string | null {
  const cookie = headers.get('Cookie');
  if (!cookie) return null;
  const parts = cookie.split(';').map((x) => x.trim());
  for (const part of parts) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    if (key !== name) continue;
    return decodeURIComponent(part.slice(idx + 1));
  }
  return null;
}

function withLangCookie(headers: Headers, lang: 'cn' | 'en'): Headers {
  const next = new Headers(headers);
  next.append('Set-Cookie', `gudun_lang=${encodeURIComponent(lang)}; Path=/; Max-Age=31536000; SameSite=Lax`);
  return next;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (pathname === '/' || pathname === '') {
    const cookieLang = getCookie(context.request.headers, 'gudun_lang');
    const lang =
      cookieLang === 'cn' || cookieLang === 'en'
        ? (cookieLang as 'cn' | 'en')
        : pickLangFromAcceptLanguage(context.request.headers.get('Accept-Language'));
    const target = new URL(`/${lang}/`, url);
    const res = Response.redirect(target.toString(), 302);
    return new Response(res.body, { status: res.status, headers: withLangCookie(res.headers, lang) });
  }

  const pathLang =
    pathname.startsWith('/en/') || pathname === '/en'
      ? 'en'
      : pathname.startsWith('/cn/') || pathname === '/cn'
        ? 'cn'
        : null;
  const res = await context.next();
  if (!pathLang) return res;

  const cookieLang = getCookie(context.request.headers, 'gudun_lang');
  if (cookieLang === pathLang) return res;
  return new Response(res.body, { status: res.status, headers: withLangCookie(res.headers, pathLang) });
};
