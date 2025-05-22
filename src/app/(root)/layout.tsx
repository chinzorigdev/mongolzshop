import TopNav from "@/app/(root)/components/NavTop";
import MainNav from "@/app/(root)/components/NavMain";
import MainMenu from "@/app/(root)/components/MainMenu";
import BottomFooter from "./components/FooterBottom";
import { CartProvider } from "@/lib/cartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CartProvider>
        <TopNav />
        <MainNav />
        <MainMenu />
        <main>{children}</main>
        <BottomFooter />
      </CartProvider>
    </>
  );
}
