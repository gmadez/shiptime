import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RateCard } from "./RateCard";
import type { ShippingRate, ShippingDetails } from "@/net/shippingRatesTypes";

interface RateResultsProps {
  rates: ShippingRate[];
  details: ShippingDetails;
  onBack: () => void;
  onSelectRate: (rate: ShippingRate) => void;
}

type SortOption = "price" | "speed" | "carrier";

export function RateResults({ rates, details, onBack, onSelectRate }: RateResultsProps) {
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("price");
  const [filterCarrier, setFilterCarrier] = useState<string | null>(null);

  const carriers = [...new Set(rates.map((r) => r.carrier))];

  const parseEstimatedToMinutes = (s: string | undefined): number => {
    if (!s) return Number.MAX_SAFE_INTEGER;
    const str = s.toLowerCase().trim();
    if (str === "varies") return Number.MAX_SAFE_INTEGER;

    // minutes e.g. "15 mins"
    const minMatch = str.match(/(\d+)\s*min/);
    if (minMatch) return parseInt(minMatch[1], 10);

    // days e.g. "2 days"
    const dayMatch = str.match(/(\d+)\s*day/);
    if (dayMatch) return parseInt(dayMatch[1], 10) * 24 * 60;

    // fallback: try to parse a number and assume days
    const n = parseInt(str, 10);
    if (!isNaN(n)) return n * 24 * 60;

    return Number.MAX_SAFE_INTEGER;
  };

  const sortedAndFilteredRates = rates
    .filter((rate) => !filterCarrier || rate.carrier === filterCarrier)
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "speed":
          return parseEstimatedToMinutes(a.estimatedDays) - parseEstimatedToMinutes(b.estimatedDays);
        case "carrier":
          return a.carrier.localeCompare(b.carrier);
        default:
          return 0;
      }
    });

  const bestValueRate = [...rates].sort((a, b) => a.price - b.price)[0];
  const fastestRate = [...rates].sort((a, b) => {
    return (
      parseEstimatedToMinutes(a.estimatedDays) - parseEstimatedToMinutes(b.estimatedDays)
    );
  })[0];

  const handleSelect = (rate: ShippingRate) => {
    setSelectedRateId(rate.id);
  };

  const handleContinue = () => {
    const selectedRate = rates.find((r) => r.id === selectedRateId);
    if (selectedRate) {
      onSelectRate(selectedRate);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
      role="region"
      aria-labelledby="rates-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to form
        </Button>
        <div id="rates-heading" className="text-sm text-muted-foreground" aria-live="polite">
          {sortedAndFilteredRates.length} options found
        </div>
      </div>

      {/* Summary Card */}
      <div className="p-4 rounded-xl bg-secondary/50 border border-border" role="region" aria-labelledby="summary-heading">
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">From:</span>
            <span className="ml-2 font-medium text-foreground">
              {details.originCity}, {details.originCountry}, {details.originPostalCode}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">To:</span>
            <span className="ml-2 font-medium text-foreground">
              {details.destinationCity}, {details.destinationCountry}, {details.destinationPostalCode}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Package:</span>
            <span className="ml-2 font-medium text-foreground">
              {details.length}"×{details.width}"×{details.height}", {details.weight} lbs
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center" role="region" aria-labelledby="filters-heading">
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <span id="filters-heading" className="text-sm text-muted-foreground">Sort:</span>
          {(["price", "speed", "carrier"] as SortOption[]).map((option) => (
            <Button
              key={option}
              variant={sortBy === option ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy(option)}
              className="capitalize"
              aria-pressed={sortBy === option}
              aria-controls="rates-list"
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="h-6 w-px bg-border hidden sm:block" />
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Button
            variant={filterCarrier === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCarrier(null)}
            aria-pressed={filterCarrier === null}
            aria-controls="rates-list"
            aria-label="Show all carriers"
          >
            All
          </Button>
          {carriers.map((carrier) => (
            <Button
              key={carrier}
              variant={filterCarrier === carrier ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCarrier(carrier)}
              aria-pressed={filterCarrier === carrier}
              aria-controls="rates-list"
              aria-label={`Filter by ${carrier}`}
            >
              {carrier}
            </Button>
          ))}
        </div>
      </div>

      {/* Rate Cards */}
      <div id="rates-list" className="space-y-4" role="list" aria-label="Available shipping options">
        {sortedAndFilteredRates.map((rate, index) => (
          <div key={rate.id} role="listitem" aria-label={`${rate.carrier} ${rate.service} ${rate.estimatedDays}`}>
            <RateCard
              rate={rate}
              isSelected={selectedRateId === rate.id}
              onSelect={() => handleSelect(rate)}
              index={index}
              isBestValue={rate.id === bestValueRate.id}
              isFastest={rate.id === fastestRate.id && rate.id !== bestValueRate.id}
            />
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: selectedRateId ? 1 : 0.5, y: 0 }}
        className="sticky bottom-4 pt-4"
      >
        <Button
          variant="accent"
          size="xl"
          className="w-full"
          disabled={!selectedRateId}
          onClick={handleContinue}
        >
          {selectedRateId
            ? `Continue with ${
                rates.find((r) => r.id === selectedRateId)?.carrier
              } - $${rates.find((r) => r.id === selectedRateId)?.price.toFixed(2)}`
            : "Select a shipping option"}
        </Button>
      </motion.div>
    </motion.div>
  );
}
