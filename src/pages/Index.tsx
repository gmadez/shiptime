import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, Zap } from "lucide-react";
import { ShippingForm } from "@/components/ShippingForm";
import { RateResults } from "@/components/RateResults";
import { LabelGenerator } from "@/components/LabelGenerator";
import { type ShippingDetails, type ShippingRate } from "@/net/shippingRatesTypes";
import { getRates, generateMockRates } from "@/net/getShippingRates";

type AppStep = "form" | "results" | "label";

const Index = () => {
  const [step, setStep] = useState<AppStep>("form");
  const [isLoading, setIsLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);

  const handleFormSubmit = async (details: ShippingDetails) => {
    setIsLoading(true);
    setShippingDetails(details);
    
    const apiRates = await generateMockRates(details);
    setRates(apiRates);
    setIsLoading(false);
    setStep("results");
  };

  const handleSelectRate = (rate: ShippingRate) => {
    setSelectedRate(rate);
    setStep("label");
  };

  const handleReset = () => {
    setStep("form");
    setShippingDetails(null);
    setRates([]);
    setSelectedRate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="gradient-hero text-primary-foreground py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="h-10 w-10" />
              <h1 className="text-3xl md:text-4xl font-bold">ShipTime</h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Compare shipping rates from top carriers and generate labels instantly
            </p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              { icon: Truck, text: "Multiple Carriers" },
              { icon: Zap, text: "Instant Quotes" },
              { icon: Package, text: "Easy Labels" },
            ].map((feature, i) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm"
              >
                <feature.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { key: "form", label: "Details" },
            { key: "results", label: "Compare" },
            { key: "label", label: "Label" },
          ].map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth
                  ${
                    step === s.key
                      ? "bg-accent text-accent-foreground"
                      : ["form", "results", "label"].indexOf(step) > i
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }
                `}
              >
                {["form", "results", "label"].indexOf(step) > i ? "✓" : i + 1}
              </div>
              <span
                className={`ml-2 text-sm hidden sm:inline ${
                  step === s.key ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              {i < 2 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-2 transition-smooth ${
                    ["form", "results", "label"].indexOf(step) > i
                      ? "bg-success"
                      : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content Card */}
        <motion.div
          layout
          className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Enter Shipping Details
                  </h2>
                  <p className="text-muted-foreground">
                    Fill in your package information and addresses to compare rates
                  </p>
                </div>
                <ShippingForm onSubmit={handleFormSubmit} isLoading={isLoading} initialValues={shippingDetails} />
              </motion.div>
            )}

            {step === "results" && shippingDetails && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Compare Shipping Rates
                  </h2>
                  <p className="text-muted-foreground">
                    Select the best option for your shipment
                  </p>
                </div>
                <RateResults
                  rates={rates}
                  details={shippingDetails}
                  onBack={() => setStep("form")}
                  onSelectRate={handleSelectRate}
                />
              </motion.div>
            )}

            {step === "label" && selectedRate && shippingDetails && (
              <motion.div
                key="label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Generate Shipping Label
                  </h2>
                  <p className="text-muted-foreground">
                    Review your selection and create your label
                  </p>
                </div>
                <LabelGenerator
                  rate={selectedRate}
                  details={shippingDetails}
                  onBack={() => setStep("results")}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>ShipTime — Compare rates, ship with confidence</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
