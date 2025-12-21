import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Download, Printer, Copy, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { ShippingRate, ShippingDetails } from "@/net/shippingRatesTypes";
import { getShipment } from "@/net/getShippingLabel";
import { fomartCADollar } from "./utils";
import Shipment from "@/net/shipmentTypes";
import downloadFile from "@/net/downloadFile";

interface LabelGeneratorProps {
  rate: ShippingRate;
  details: ShippingDetails;
  onBack: () => void;
  onReset: () => void;
}

export function LabelGenerator({ rate, details, onBack, onReset }: LabelGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [labelGenerated, setLabelGenerated] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const { toast } = useToast();

  const handleGenerateLabel = async () => {
    setIsGenerating(true);
    const shipment = await getShipment(rate, details);
    if (!shipment) {
      setIsGenerating(false);
      toast({
        title: "Error generating label",
        description: "There was an issue generating your shipping label. Please try again.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(false);
    setLabelGenerated(true);
    setShipment(shipment);
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(shipment.trackingNumbers[0]);
    toast({
      title: "Copied to clipboard",
      description: "Tracking number has been copied",
    });
  };

  const handleDownloadPDF = async () => {
    const filegenerated = await downloadFile(shipment?.labelUrl || '');
    if (filegenerated === undefined) {
      toast({
        title: "Error downloading label",
        description: "There was an issue downloading your shipping label. Please try again.",
      });
      return;
    }
    toast({
      title: "File downloaded successfully!",
      description: "Your shipping label PDF has been downloaded.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
      role="region"
      aria-labelledby="label-generator-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2" aria-label="Back to rates">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to rates
        </Button>
      </div>

      {/* Selected Service Summary */}
      <div className="p-6 rounded-xl bg-card border-2 border-accent shadow-glow" role="region" aria-labelledby="selected-service-heading">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{rate.logo}</div>
          <div>
            <h3 id="selected-service-heading" className="text-xl font-bold text-foreground">
              {rate.carrier} {rate.service}
            </h3>
            <p className="text-muted-foreground" aria-live="polite">{rate.estimatedDays}</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-bold text-accent">{fomartCADollar(rate.price)}</div>
            <div className="text-sm text-muted-foreground">total cost</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <div className="text-sm text-muted-foreground mb-1">From</div>
            <div className="font-medium text-foreground">{details.originAddress}</div>
            <div className="text-sm text-muted-foreground">
              {/* {details.originCity}, {details.originZip} */}
              {details.originCity}, {details.originPostalCode}
            </div>
            <div className="text-sm text-muted-foreground">{details.originCountry}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">To</div>
            <div className="font-medium text-foreground">{details.destinationAddress}</div>
            <div className="text-sm text-muted-foreground">
              {/* {details.destinationCity}, {details.destinationZip} */}
              {details.destinationCity}, {details.destinationPostalCode}
            </div>
            <div className="text-sm text-muted-foreground">{details.destinationCountry}</div>
          </div>
        </div>
      </div>

      {/* Label Preview */}
      {!labelGenerated ? (
        <motion.div
          className="p-8 rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center min-h-[300px]"
          animate={isGenerating ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          role="status"
          aria-live="polite"
          aria-busy={isGenerating}
          aria-labelledby="label-preview-heading"
        >
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 id="label-preview-heading" className="text-lg font-semibold text-foreground mb-2">
            {isGenerating ? "Generating your label..." : "Ready to generate label"}
          </h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {isGenerating
              ? "Please wait while we prepare your shipping label"
              : "Click the button below to generate your shipping label with tracking information"}
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={handleGenerateLabel}
            disabled={isGenerating}
            aria-controls="label-preview"
          >
            {isGenerating ? "Generating..." : "Generate Shipping Label"}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {/* Success Message */}
          <div className="p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3" role="status" aria-live="polite">
            <div className="p-2 rounded-full bg-success">
              <Check className="h-5 w-5 text-success-foreground" aria-hidden />
            </div>
            <div>
              <div className="font-semibold text-foreground">Label Generated Successfully!</div>
              <div className="text-sm text-muted-foreground">
                Your shipping label is ready for download
              </div>
            </div>
          </div>

          {/* Label Preview Card */}
          <div id="label-preview" className="p-6 rounded-xl bg-card border border-border shadow-card" role="region" aria-labelledby="label-preview-heading">
            <div className="border-2 border-foreground rounded-lg p-6 bg-background">
              {/* Mock Label Design */}
              <div className="flex justify-between items-start mb-6">
                <div className="text-2xl font-bold text-foreground">{rate.carrier}</div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">SERVICE</div>
                  <div className="font-bold text-foreground">{rate.service}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">FROM:</div>
                  <div className="font-medium text-foreground text-sm">
                    {details.originAddress}<br />
                    {details.originCity}, {details.originCountry}, {details.originPostalCode}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">TO:</div>
                  <div className="font-bold text-foreground">
                    {details.destinationAddress}<br />
                    {details.destinationCity}, {details.destinationCountry}, {details.destinationPostalCode}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">TRACKING NUMBER</div>
                <div id="tracking-number" className="font-mono font-bold text-lg text-foreground tracking-wider" aria-live="polite">
                  {shipment?.trackingNumbers?.[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="gap-2" onClick={handleCopyTracking} aria-label="Copy tracking number" aria-describedby="tracking-number">
              <Copy className="h-4 w-4" aria-hidden />
              Copy Tracking
            </Button>
            <Button variant="default" className="gap-2" onClick={handleDownloadPDF} aria-label="Print shipping label">
              <Download className="h-4 w-4" aria-hidden />
              <span aria-label="Download PDF">Download PDF</span>
            </Button>
          </div>

          {/* New Shipment Button */}
          <div className="flex justify-center pt-4 border-t border-border items-center">
            <Button variant="accent" size="lg" className="w-1/3" onClick={onReset}>
              Create New Shipment
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
