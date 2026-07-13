"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@aegov/design-system-react";

const NAV_ITEMS = [
  { id: "dashboard", key: "navDash" },
  { id: "journey", key: "navJourney" },
] as const;

interface Props {
  active: "dashboard" | "journey";
  onNavigate: (id: "dashboard" | "journey") => void;
}

export function ParticipantMobileTabBar({ active, onNavigate }: Props) {
  const { t } = useTranslation("translation", { keyPrefix: "participant" });

  return (
    <div className="flex border-t border-stroke-soft bg-white px-2 pb-2 pt-2.5 md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <Button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            variant="link"
            className="h-auto flex-1 flex-col gap-0 rounded-none border-transparent px-0 py-2 text-center"
          >
            <span className={`mx-auto mb-1.5 block h-2 w-2 rounded-full ${isActive ? "bg-brand" : "bg-stroke-strong"}`} />
            <span className={`text-[12.5px] ${isActive ? "font-bold text-brand-dark" : "font-medium text-muted"}`}>{t(item.key)}</span>
          </Button>
        );
      })}
    </div>
  );
}
