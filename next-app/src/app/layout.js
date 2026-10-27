import { Inter } from "next/font/google";
import "./style.css";
import "./globals.css";
import "@/components/FuturisticLogin.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Bombeiros - PORTAL CBM",
  description: "Sistema de modulação e consulta de códigos operacionais.",
  icons: {
    icon: [
      { url: "/assets/iconesite/icone.png?v=3", type: "image/png" },
      { url: "/icon.png?v=3", type: "image/png" },
    ],
    shortcut: "/assets/iconesite/icone.png?v=3",
    apple: "/assets/iconesite/icone.png?v=3",
  },
};

import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark antialiased`} suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" type="image/png" sizes="any" href="/assets/iconesite/icone.png?v=3" />
        <link rel="shortcut icon" type="image/png" href="/assets/iconesite/icone.png?v=3" />
        <link rel="apple-touch-icon" href="/assets/iconesite/icone.png?v=3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/style.css?v=22" />
        <link rel="stylesheet" href="/css/notificacoes.css?v=21" />
        <link rel="stylesheet" href="/css/border-glow.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('cbm_auth_unlocked') === 'true') {
                  document.documentElement.classList.add('cbm-unlocked');
                } else {
                  document.documentElement.classList.remove('cbm-unlocked');
                }
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
        <Script src="/js/deviceFingerprint.js" strategy="beforeInteractive" />
        <Script src="/js/particles.min.js?v=2" strategy="beforeInteractive" />
        <Script src="/js/script.js?v=12" strategy="afterInteractive" />
        <Script src="/js/notificacoes.js?v=21" strategy="afterInteractive" />
        <Script src="/js/inicio-videos.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js" strategy="afterInteractive" />
        <Script src="/js/animations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
