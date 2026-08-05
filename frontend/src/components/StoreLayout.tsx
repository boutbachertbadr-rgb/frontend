"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import UpsellOverlay from "@/components/UpsellOverlay";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLP = pathname.startsWith("/guard");

  return (
    <>
      {!isLP && <AnnouncementBar />}
      {!isLP && <Header />}
      <main>{children}</main>
      {!isLP && <Footer />}
      {!isLP && <CartDrawer />}
      {!isLP && <CheckoutModal />}
      {!isLP && <UpsellOverlay />}
    </>
  );
}
