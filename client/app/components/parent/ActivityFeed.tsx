"use client";

import { useTranslation } from "react-i18next";
import { CheckCircle, Star, PlayCircle } from "@phosphor-icons/react";
import { Card } from "@aegov/design-system-react";

interface FeedItem {
  text: string;
  time: string;
  kind: "done" | "video" | "badge";
}

const KIND_STYLES: Record<FeedItem["kind"], { icon: typeof CheckCircle; bg: string }> = {
  done: { icon: CheckCircle, bg: "bg-success" },
  badge: { icon: Star, bg: "bg-warning-dark" },
  video: { icon: PlayCircle, bg: "bg-brand" },
};

export function ActivityFeed() {
  const { t } = useTranslation("translation", { keyPrefix: "parent" });
  const feed = t("feed", { returnObjects: true }) as FeedItem[];

  return (
    <Card variant="news" bordered className="rounded-[18px] border-stroke-soft bg-white p-5 md:p-6">
      <div className="mb-4 text-base font-bold text-brand-navy">{t("feedTitle")}</div>
      <div className="flex flex-col gap-3.5">
        {feed.map((item, i) => {
          const { icon: Icon, bg } = KIND_STYLES[item.kind];
          return (
            <div key={i} className="flex items-start gap-3">
              <span className={`mt-0.5 flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full text-white ${bg}`}>
                <Icon size={15} weight="fill" />
              </span>
              <div className="min-w-0">
                <div className="text-[13.5px] font-medium leading-snug text-brand-navy">{item.text}</div>
                <div className="mt-0.5 text-xs text-muted-soft">{item.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function MentorNote() {
  const { t } = useTranslation("translation", { keyPrefix: "parent" });

  return (
    <Card variant="news" bordered className="rounded-[18px] border-stroke-strong bg-surface-accent p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          {t("mentorInitial")}
        </div>
        <div>
          <div className="text-sm font-bold text-brand-navy">{t("mentorTitle")}</div>
          <div className="text-xs text-muted">{t("mentorName")}</div>
        </div>
      </div>
      <div className="text-sm leading-relaxed text-ink">{t("mentorNote")}</div>
    </Card>
  );
}
