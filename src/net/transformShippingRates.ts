import { ShippingRate } from "@/net/shippingRatesTypes";
import type { ShippingRatesResponse, AvailableRate } from "./shippingRatesTypes";

const formatEstimatedDays = (r: AvailableRate): string => {
  const minRaw = r.transitDays ?? null;
  const maxRaw = r.transitDaysMax ?? null;
  const unit = (r.transitUnit || "Days").toLowerCase();

  const fmtMinutes = (mins: number) => {
    if (mins <= 0) return "0 mins";
    if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"}`;
    const h = Math.floor(mins / 60);
    const rem = mins % 60;
    return rem ? `${h}h ${rem}m` : `${h}h`;
  };

  const fmtDays = (days: number) => `${days} day${days === 1 ? "" : "s"}`;

  const formatValue = (v: number) => {
    if (unit.includes("min")) return fmtMinutes(v);
    if (unit.includes("day")) return fmtDays(v);
    // fallback: use the raw unit string
    return `${v} ${r.transitUnit || "days"}`;
  };

  if (!minRaw && !maxRaw) return "Varies";
  if (minRaw && !maxRaw) return formatValue(minRaw);
  if (!minRaw && maxRaw) return formatValue(maxRaw);
  if (minRaw && maxRaw) {
    if (minRaw === maxRaw) return formatValue(minRaw);
    return `${formatValue(minRaw)} - ${formatValue(maxRaw)}`;
  }

  return "Varies";
};

const buildFeatures = (r: AvailableRate): string[] => {
  const out: string[] = [];
  if (r.serviceTerms) out.push(r.serviceTerms);
  if (Array.isArray(r.surcharges) && r.surcharges.length) {
    out.push(...r.surcharges.map((s) => s.name));
  }
  if (Array.isArray(r.taxes) && r.taxes.length) {
    out.push(...r.taxes.map((t) => t.name));
  }
  if (r.isShipTimeCarrier) out.push("ShipTime carrier");
  return out;
};

export const transformShippingRates = (
  resp: ShippingRatesResponse
): ShippingRate[] => {
  return (resp.availableRates || []).map((r) => {
    const price = r.totalCharge?.amount ?? r.totalBeforeTaxes?.amount ?? r.baseCharge?.amount ?? 0;
    return {
      carrier: r.carrierName || r.carrierId || "",
      service: r.serviceName || r.serviceId || "",
      carrierId: r.carrierId,
      serviceId: r.serviceId,
      quoteId: r.quoteId,
      price,
      logo: "🚚",
      estimatedDays: formatEstimatedDays(r),
      features: buildFeatures(r),
    };
  });
};

export default transformShippingRates;
