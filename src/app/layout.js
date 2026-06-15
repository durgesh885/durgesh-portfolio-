import "./globals.css";

export const metadata = {
  title: "Durgesh Chaudhari | 3D Portfolio",
  description: "3D Developer Portfolio constructed with Next.js and Three.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
