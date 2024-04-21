// format currency utility
export function formatNumber(
  number,
  locale = "en-CA",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });
  return formatter.format(number);
}
