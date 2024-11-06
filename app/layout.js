import "./globals.css";

export const metadata = {
  title: "Dishonored",
  description: "Site personnal of Dishonored's games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
      >
        {children}
      </body>
    </html>
  );
}
