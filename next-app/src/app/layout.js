import { Inter } from "next/font/google";
import "./style.css";

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
    <html lang="pt-BR" className={`${inter.variable} dark antialiased`}>
      <head>
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" type="image/png" href="/assets/iconesite/icone.png" />
      </head>
      <body>
        {children}
        <Script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" strategy="afterInteractive" />
        <Script src="/js/script.js?v=2" strategy="afterInteractive" />
        <Script src="/js/notificacoes.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js" strategy="afterInteractive" />
        <Script src="/js/animations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
