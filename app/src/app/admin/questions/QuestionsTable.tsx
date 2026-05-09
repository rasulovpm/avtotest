"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RoadSignSvg } from "@/components/RoadSignSvg";

type Q = {
  id: string;
  number: number;
  textUz: string;
  textRu: string;
  categoryName: string;
  categorySlug: string;
  difficulty: string;
  isPublished: boolean;
  optionCount: number;
  correctCount: number;
  answerCount: number;
  tickets: { id: string; number: number }[];
  createdAt: string;
};

const SIGN_BY_SLUG: Record<string, any> = {
  yhq: "priority-main",
  signs: "warning-curve",
  tech: "prohibit-speed",
  medical: "info-parking"
};

const DIFF_COLOR: Record<string, string> = {
  EASY: "var(--success)",
  MEDIUM: "oklch(0.85 0.18 75)",
  HARD: "var(--error)"
};
const DIFF_LABEL: Record<string, string> = { EASY: "Oson", MEDIUM: "O'rta", HARD: "Qiyin" };

export default function QuestionsTable({
  questions,
  categories,
  currentCat,
  currentQ,
  totalCount,
  filteredCount,
  currentPage,
  pageSize,
  totalPages
}: {
  questions: Q[];
  categories: { id: string; nameUz: string }[];
  currentCat: string;
  currentQ: string;
  totalCount: number;
  filteredCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [q, setQ] = useState(currentQ);
  const [cat, setCat] = useState(currentCat);

  const buildUrl = (overrides: Record<string, string | number>) => {
    const sp = new URLSearchParams();
    if (overrides.q !== undefined ? overrides.q : q) sp.set("q", String(overrides.q !== undefined ? overrides.q : q));
    if (overrides.cat !== undefined ? overrides.cat : cat) sp.set("cat", String(overrides.cat !== undefined ? overrides.cat : cat));
    if (overrides.page && Number(overrides.page) > 1) sp.set("page", String(overrides.page));
    if (overrides.size && Number(overrides.size) !== 100) sp.set("size", String(overrides.size));
    return `/admin/questions${sp.toString() ? "?" + sp.toString() : ""}`;
  };

  const apply = () => {
    router.push(buildUrl({ page: 1 }));
  };

  const goPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    router.push(buildUrl({ page: p }));
  };

  const fromIdx = filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const toIdx = Math.min(currentPage * pageSize, filteredCount);

  const del = async (id: string) => {
    if (!confirm("O'chirilsinmi?")) return;
    const r = await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
    if (r.ok) router.refresh();
    else alert("Xatolik");
  };

  return (
    <>
      {/* Filters */}
      <div className="bento" style={{ padding: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => {
              setCat("");
              router.push("/admin/questions");
            }}
            className="chip"
            style={{
              fontSize: 12,
              padding: "7px 12px",
              cursor: "pointer",
              background: cat === "" ? "var(--accent)" : "var(--bg-2)",
              color: cat === "" ? "#0a1f24" : "var(--fg-1)",
              borderColor: cat === "" ? "var(--accent)" : "var(--line)"
            }}
          >
            Barchasi · {totalCount}
          </button>
        </div>
        <div style={{ width: 1, height: 24, background: "var(--line)" }} />
        <select
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
            const sp = new URLSearchParams();
            if (q) sp.set("q", q);
            if (e.target.value) sp.set("cat", e.target.value);
            router.push(`/admin/questions${sp.toString() ? "?" + sp.toString() : ""}`);
          }}
          style={{
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
            color: "var(--fg-0)",
            borderRadius: 8,
            padding: "7px 10px",
            fontSize: 12,
            fontFamily: "var(--font-body)"
          }}
        >
          <option value="">Mavzu: barchasi</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameUz}
            </option>
          ))}
        </select>
        <div style={{ position: "relative", marginLeft: "auto" }}>
          <input
            placeholder="Savol matni bo'yicha qidirish…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "8px 14px 8px 32px",
              fontSize: 12,
              color: "var(--fg-0)",
              width: 280,
              fontFamily: "var(--font-body)",
              outline: "none"
            }}
          />
          <span style={{ position: "absolute", left: 11, top: 8, color: "var(--fg-3)", fontSize: 13 }}>⌕</span>
        </div>
      </div>

      {/* Table */}
      <div className="bento" style={{ padding: 0, overflow: "hidden" }}>
        <div className="qtable-overflow" style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 1080 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "60px 60px 1fr 140px 90px 80px 110px 100px 80px",
                padding: "12px 18px",
                borderBottom: "1px solid var(--line)",
                alignItems: "center",
                gap: 14,
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                color: "var(--fg-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: "var(--bg-2)"
              }}
            >
              <span>ID</span>
              <span>Belgi</span>
              <span>Savol</span>
              <span>Mavzu</span>
              <span>Qiyinlik</span>
              <span>Variant</span>
              <span>Biletlar</span>
              <span>Status</span>
              <span></span>
            </div>
            {questions.map((qq, i) => {
              const sign = SIGN_BY_SLUG[qq.categorySlug] || "priority-main";
              return (
                <div
                  key={qq.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 60px 1fr 140px 90px 80px 110px 100px 80px",
                    padding: "14px 18px",
                    borderBottom: i < questions.length - 1 ? "1px solid var(--line)" : "none",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 13
                  }}
                >
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-1)", fontWeight: 600 }}>#{qq.number}</span>
                  <RoadSignSvg kind={sign} size={36} />
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--fg-0)" }}>
                    {qq.textUz}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--fg-2)" }}>{qq.categoryName}</span>
                  <span className="mono" style={{ fontSize: 11, color: DIFF_COLOR[qq.difficulty] || "var(--fg-2)" }}>
                    ● {DIFF_LABEL[qq.difficulty] || qq.difficulty}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: qq.correctCount === 1 ? "var(--success)" : "var(--error)" }}>
                    {qq.optionCount}
                  </span>
                  <span className="mono" style={{ fontSize: 11, color: qq.tickets.length ? "var(--accent)" : "var(--fg-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {qq.tickets.length ? qq.tickets.map((t) => `#${t.number}`).join(", ") : "—"}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "4px 9px",
                      borderRadius: 6,
                      background: qq.isPublished
                        ? "color-mix(in oklch, var(--success) 16%, transparent)"
                        : "var(--bg-2)",
                      color: qq.isPublished ? "var(--success)" : "var(--fg-3)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      justifySelf: "start"
                    }}
                  >
                    {qq.isPublished ? "● Faol" : "○ Yashirin"}
                  </span>
                  <div style={{ display: "flex", gap: 4, justifySelf: "end" }}>
                    <Link
                      href={`/admin/questions/${qq.id}`}
                      style={{ color: "var(--fg-2)", padding: 6, borderRadius: 4, textDecoration: "none" }}
                      title="Tahrirlash"
                    >
                      ✎
                    </Link>
                    <button
                      onClick={() => del(qq.id)}
                      style={{ background: "transparent", border: "none", color: "var(--error)", padding: 6, borderRadius: 4, cursor: "pointer" }}
                      title="O'chirish"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
            {questions.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: "var(--fg-3)" }}>Savollar topilmadi</div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredCount > pageSize && (
        <div
          className="bento"
          style={{
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <div style={{ fontSize: 12, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
            {fromIdx}–{toIdx} / {filteredCount}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={() => goPage(1)}
              disabled={currentPage === 1}
              className="chip"
              style={{ fontSize: 12, padding: "6px 10px", cursor: currentPage === 1 ? "default" : "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}
              title="Birinchi"
            >
              «
            </button>
            <button
              onClick={() => goPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="chip"
              style={{ fontSize: 12, padding: "6px 10px", cursor: currentPage === 1 ? "default" : "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}
            >
              ‹ Oldingi
            </button>
            <span className="mono" style={{ fontSize: 12, color: "var(--fg-1)", padding: "0 8px" }}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => goPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="chip"
              style={{ fontSize: 12, padding: "6px 10px", cursor: currentPage === totalPages ? "default" : "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}
            >
              Keyingi ›
            </button>
            <button
              onClick={() => goPage(totalPages)}
              disabled={currentPage === totalPages}
              className="chip"
              style={{ fontSize: 12, padding: "6px 10px", cursor: currentPage === totalPages ? "default" : "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}
              title="Oxirgi"
            >
              »
            </button>
          </div>
          <select
            value={pageSize}
            onChange={(e) => router.push(buildUrl({ size: e.target.value, page: 1 }))}
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              color: "var(--fg-0)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              fontFamily: "var(--font-body)"
            }}
          >
            <option value={50}>50 / sahifa</option>
            <option value={100}>100 / sahifa</option>
            <option value={200}>200 / sahifa</option>
            <option value={500}>500 / sahifa</option>
          </select>
        </div>
      )}
    </>
  );
}
