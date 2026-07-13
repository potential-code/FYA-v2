"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Pagination } from "@aegov/design-system-react";
import { mockStudents, type ParticipantStatus } from "@shared/content/mockDashboardData";
import { tracks } from "@shared/content/tracks";
import { useLanguage } from "../../context/LanguageContext";
import { ProgressBar } from "../dashboard/ProgressBar";
import { StatusPill } from "../dashboard/StatusPill";
import { fmtNum } from "../../lib/utils";

const FILTERS: { id: "all" | ParticipantStatus; key: string }[] = [
  { id: "all", key: "filterAll" },
  { id: "assessing", key: "filterAssessing" },
  { id: "shortlisted", key: "filterShortlisted" },
  { id: "top40", key: "filterTop40" },
];

const STATUS_TONE: Record<ParticipantStatus, "neutral" | "positive" | "warning"> = {
  assessing: "warning",
  shortlisted: "neutral",
  top40: "positive",
};

export function AdminParticipants() {
  const { t } = useTranslation("translation", { keyPrefix: "admin" });
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (filter === "all" ? mockStudents : mockStudents.filter((s) => s.status === filter)),
    [filter],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.id}
              onClick={() => {
                setFilter(f.id);
                setPage(1);
              }}
              variant={filter === f.id ? "solid" : "soft"}
              style={filter === f.id ? "primary" : "secondary"}
              size="xs"
              className="rounded-full"
            >
              {t(f.key)}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" style="secondary" size="sm">
            {t("exportBtn")}
          </Button>
          <Button variant="solid" style="primary" size="sm">
            {t("shortlistBtn")}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-stroke bg-white">
        <table className="w-full min-w-[720px] text-start text-sm">
          <thead>
            <tr className="border-b border-stroke text-xs font-bold uppercase tracking-wide text-muted">
              <th className="px-5 py-3 text-start">{t("colName")}</th>
              <th className="px-5 py-3 text-start">{t("colTrack")}</th>
              <th className="px-5 py-3 text-start">{t("colProgress")}</th>
              <th className="px-5 py-3 text-start">{t("colScore")}</th>
              <th className="px-5 py-3 text-start">{t("colStatus")}</th>
              <th className="px-5 py-3 text-start" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => {
              const track = tracks.find((tr) => tr.id === student.track)!;
              return (
                <tr key={student.name.en} className="border-b border-stroke last:border-0 hover:bg-surface-soft">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-accent text-xs font-bold text-brand-dark">
                        {student.initial[lang]}
                      </div>
                      <div>
                        <div className="font-semibold text-ink">{student.name[lang]}</div>
                        <div className="text-xs text-muted">{student.emirate[lang]}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">{track.label[lang]}</td>
                  <td className="px-5 py-3.5">
                    <div className="w-28">
                      <ProgressBar percent={student.progressPct} />
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-brand-navy">{fmtNum(student.score, lang)}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={t(`status${student.status.charAt(0).toUpperCase() + student.status.slice(1)}`)} tone={STATUS_TONE[student.status]} />
                  </td>
                  <td className="px-5 py-3.5 text-end">
                    <Button variant="link" style="primary" size="xs" className="h-auto px-0 text-xs font-semibold">
                      {t("view")}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col items-center gap-3 border-t border-stroke px-5 py-4 sm:flex-row sm:justify-between">
          <span className="text-xs text-muted">{t("tableFooter")}</span>
          <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}
