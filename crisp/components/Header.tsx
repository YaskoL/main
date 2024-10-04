"use client";
 
import Link from "next/link";
import { usePathname } from "next/navigation";
 
export default function Header() {
  const pathname = usePathname();
 
  return (
    <nav>
      <Link
        href="/mon-compte"
      >
        Mon compte
      </Link>
      <Link
        href="/mon-compte/profil"
      >
        Mon profil
      </Link>
    </nav>
  );
}