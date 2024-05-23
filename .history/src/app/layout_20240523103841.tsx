import "./globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import Toast from "@/components/Toast";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="">
      <body className={`${gotham.variable} font-gotham`}>
        <Toast />
        {children}
      </body>
    </html>
  );
}

const gotham = localFont({
  src: [
    {
      path: "../../public/fonts/Gotham.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/Gotham-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../public/fonts/GothamBold.ttf",
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
  icons: [
    {
      url: "/icons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
    {
      url: "/icons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/icons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "/icons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/icons/favicon.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/icons/favicon.png",
      sizes: "16x16",
      type: "image/png",
    },
  ],
};
