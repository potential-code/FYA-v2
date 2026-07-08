"use client";

import Image from "next/image";
import Link from "next/link";
import { ChartBar, House, Users } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

export type AdminScreen = "overview" | "participants" | "analytics";

interface AdminSidebarProps {
  screen: AdminScreen;
  onScreenChange: (screen: AdminScreen) => void;
}

const NAV_ITEMS: { id: AdminScreen; key: string; icon: typeof House }[] = [
  { id: "overview", key: "navOverview", icon: House },
  { id: "participants", key: "navParticipants", icon: Users },
  { id: "analytics", key: "navAnalytics", icon: ChartBar },
];

export function AdminSidebar({ screen, onScreenChange }: AdminSidebarProps) {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col bg-brand-navy px-5 py-6 text-white md:flex">
        <Image src="/images/logo-white.png" alt="Youth Leaders Path" width={140} height={36} className="h-8 w-auto object-contain" />
        <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/50">{t("adminBadge")}</span>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = screen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active ? "bg-white/[0.14] text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon size={18} weight={active ? "fill" : "regular"} />
                {t(item.key)}
              </button>
            );
          })}
        </nav>

        <Link href="/" className="mt-auto text-sm text-white/60 hover:text-white">
          {t("siteLink")}
        </Link>

        <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold">
            {t("adminName").charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{t("adminName")}</div>
            <div className="truncate text-xs text-white/50">{t("adminRole")}</div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-stroke bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-1 md:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = screen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium"
            >
              <Icon size={20} weight={active ? "fill" : "regular"} className={active ? "text-brand" : "text-muted"} />
              <span className={active ? "text-brand" : "text-muted"}>{t(item.key)}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
