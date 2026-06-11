import "./globals.css";

export const metadata = {
  title: "Durgesh Chaudhari | 3D Portfolio",
  description: "3D Developer Portfolio constructed with Next.js and Three.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
