import "./globals.css";

export const metadata = {
  title: "AI Spend Auditor",
  description: "Stop overpaying for AI tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}