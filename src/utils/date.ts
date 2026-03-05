/**
 * ISO日付文字列を YYYY.MM.DD に整形
 * タイムゾーン事故を防ぐため文字列処理で対応
 */
export const formatYmd = (iso?: string): string => {
  if (!iso) return "";

  const ymd = iso.slice(0, 10); // YYYY-MM-DD

  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) {
    return "";
  }

  return ymd.replaceAll("-", ".");
};