"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type MenuLink = { href: string; label: string };

export function MobileMenu({ links }: { links: MenuLink[] }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
  }, [pathname]);

  return (
    <details ref={menuRef} className="foundation-mobile-menu">
      <summary aria-label="Abrir menu">
        <span className="foundation-menu-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </summary>
      <nav className="foundation-mobile-nav" aria-label="Navegação principal">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => {
            if (menuRef.current) menuRef.current.open = false;
          }}>
            {link.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
