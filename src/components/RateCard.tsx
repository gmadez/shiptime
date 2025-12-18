import { motion } from "framer-motion";
import { Check, Clock, Truck } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";
import type { ShippingRate } from "@/net/shippingRatesTypes";

interface RateCardProps {
  rate: ShippingRate;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
  isBestValue?: boolean;
  isFastest?: boolean;
}

const CADollar = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
});

export function RateCard({
  rate,
  isSelected,
  onSelect,
  index,
  isBestValue,
  isFastest,
}: RateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      onClick={onSelect}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${rate.carrier} ${rate.service}. ${rate.estimatedDays}. ${CADollar.format(
        rate.price
      )}`}
      className={cn(
        "relative p-5 rounded-xl border-2 cursor-pointer transition-smooth group",
        "hover:shadow-medium hover:border-accent/50",
        isSelected
          ? "border-accent bg-accent/5 shadow-glow"
          : "border-border bg-card"
      )}
    >
      {/* Badges */}
      <div className="absolute -top-3 left-4 flex gap-2" aria-hidden={true}>
        {isBestValue && (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-success text-success-foreground shadow-soft" aria-hidden>
            Best Value
          </span>
        )}
        {isFastest && (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-warning text-warning-foreground shadow-soft" aria-hidden>
            Fastest
          </span>
        )}
      </div>

      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth",
          isSelected
            ? "border-accent bg-accent"
            : "border-muted-foreground/30 group-hover:border-accent/50"
        )}
        aria-hidden={true}
      >
        {isSelected && <Check className="h-4 w-4 text-accent-foreground" aria-hidden />}
      </div>

      {/* Content */}
      <div className="flex items-start gap-4">
        <div className="text-3xl">{rate.logo}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-foreground">{rate.carrier}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{rate.service}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{rate.estimatedDays}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Door-to-door</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {rate.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 text-xs bg-secondary rounded-md text-secondary-foreground"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right pt-6">
          <div className="text-2xl font-bold text-foreground">
            {CADollar.format(rate.price)}
          </div>
          <div className="text-sm text-muted-foreground">total</div>
        </div>
      </div>
    </motion.div>
  );
}
