import "./globals.css";

export const metadata = {
  title: "Durgesh Chaudhari | cloud architect, DevOps engineer",
  description: "AWS cloud architect, DevOps engineer, and software developer with expertise in designing and implementing scalable cloud solutions. Passionate about leveraging AWS services to optimize infrastructure and enhance application performance.",
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
