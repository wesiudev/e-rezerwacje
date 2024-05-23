import localFont from "next/font/local";
import { Metadata } from "next";
import Script from "next/script";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="">
      <body className={`${gotham.variable} font-gotham`}>
        {children}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZHR2XRP7YX"
        />
        <Script strategy="afterInteractive" id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZHR2XRP7YX');
          `}
        </Script>
      </body>
    </html>
  );
}

const gotham = localFont({
  src: [
    {
      path: "../../../../public/fonts/Gotham.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../../../public/fonts/Gotham-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../../../public/fonts/GothamBold.ttf",
      weight: "500",
      style: "bold",
    },
  ],
  variable: "--font-gotham",
});

export const metadata: Metadata = {
  title: "E-Rezerwacje - System zarządzania rezerwacjami",
  description:
    "E-Rezerwacje to zaawansowany system zarządzania rezerwacjami, zaprojektowany z myślą o firmach i instytucjach, które pragną zoptymalizować procesy związane z rezerwacjami. Nasze rozwiązanie oferuje intuicyjny interfejs, który ułatwia zarządzanie rezerwacjami w czasie rzeczywistym, poprawiając efektywność operacyjną i zadowolenie klientów.",
  authors: [{ name: "e-rezerwacje.com", url: "https://e-rezerwacje.com" }],
  publisher: "e-rezerwacje.com",
};
