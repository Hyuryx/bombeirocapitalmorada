import { Inter } from "next/font/google";
import "./style.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Bombeiros - PORTAL CBM",
  description: "Sistema de modulação e consulta de códigos operacionais.",
};

import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark antialiased`} suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" type="image/png" href="/assets/iconesite/icone.png" />
        <link rel="stylesheet" href="/css/style.css?v=20" />
        <link rel="stylesheet" href="/css/notificacoes.css?v=20" />
        <link rel="stylesheet" href="/css/border-glow.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('cbm_theme') === 'light') {
                  document.documentElement.classList.add('light-theme');
                }
                if (localStorage.getItem('cbm-no-effects') === 'true') {
                  document.documentElement.classList.add('no-effects');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script src="/js/script.js?v=2" strategy="afterInteractive" />
        <Script src="/js/notificacoes.js" strategy="afterInteractive" />
        <Script src="/js/inicio-videos.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js" strategy="afterInteractive" />
        <Script src="/js/animations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
