"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import UpsellOverlay from "@/components/UpsellOverlay";

const LP_PREFIXES = ["/lp", "/guard"];

function isLandingPage(pathname: string) {
  return LP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function SiteChromeTop() {
  const pathname = usePathname();
  if (isLandingPage(pathname)) return null;
  return (
    <>
      <AnnouncementBar />
      <Header />
    </>
  );
}

export function SiteChromeBottom() {
  const pathname = usePathname();
  if (isLandingPage(pathname)) return null;
  return (
    <>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <UpsellOverlay />
    </>
  );
}
