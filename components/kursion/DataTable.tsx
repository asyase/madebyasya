"use client";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  numeric?: boolean;
  /** Hide on narrow containers; the information must also be available elsewhere. */
  priority?: "high" | "low";
};
export type Sort = { key: string; dir: "asc" | "desc" } | null;

/** Table with sortable headers. Sort state is exposed with aria-sort on the header cell. */
export default function DataTable<T>({ caption, columns, rows, rowKey, sort, onSort, empty }: { caption: string; columns: Column<T>[]; rows: T[]; rowKey: (r: T) => string; sort: Sort; onSort: (s: Sort) => void; empty: React.ReactNode }) {
  return (
    <div className="k-table-wrap" tabIndex={0} role="region" aria-label={caption}>
      <table className="k-table">
        <caption className="k-sr">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key;
              const ariaSort = active ? (sort!.dir === "asc" ? "ascending" : "descending") : c.sortValue ? "none" : undefined;
              const Icon = !active ? ArrowUpDown : sort!.dir === "asc" ? ArrowUp : ArrowDown;
              return (
                <th key={c.key} scope="col" aria-sort={ariaSort} className={c.numeric ? "k-num" : undefined}>
                  {c.sortValue ? (
                    <button type="button" className="k-sort" onClick={() => onSort(active && sort!.dir === "asc" ? { key: c.key, dir: "desc" } : active ? null : { key: c.key, dir: "asc" })}>
                      {c.header}
                      <Icon className="k-icon" aria-hidden />
                    </button>
                  ) : c.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="k-empty">{empty}</td></tr>
          ) : (
            rows.map((r) => (
              <tr key={rowKey(r)}>
                {columns.map((c, i) => i === 0 ? <th key={c.key} scope="row" style={{ fontWeight: "inherit" }}>{c.cell(r)}</th> : <td key={c.key} className={c.numeric ? "k-num" : undefined}>{c.cell(r)}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function sortRows<T>(rows: T[], columns: Column<T>[], sort: Sort) {
  if (!sort) return rows;
  const col = columns.find((c) => c.key === sort.key);
  if (!col?.sortValue) return rows;
  const dir = sort.dir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const x = col.sortValue!(a), y = col.sortValue!(b);
    return (x < y ? -1 : x > y ? 1 : 0) * dir;
  });
}
