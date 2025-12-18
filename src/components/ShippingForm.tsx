import { useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, Calendar, Scale, Ruler, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import type { ShippingDetails } from "@/net/shippingRatesTypes";

interface ShippingFormProps {
  onSubmit: (details: ShippingDetails) => void;
  isLoading: boolean;
  initialValues?: ShippingDetails | null;
}

interface FormErrors {
  [key: string]: string;
}

export function ShippingForm({ onSubmit, isLoading, initialValues }: ShippingFormProps) {
  const [date, setDate] = useState<Date | undefined>(initialValues?.shippingDate);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    length: initialValues?.length?.toString() ?? "",
    width: initialValues?.width?.toString() ?? "",
    height: initialValues?.height?.toString() ?? "",
    weight: initialValues?.weight?.toString() ?? "",
    originAddress: initialValues?.originAddress ?? "",
    originCity: initialValues?.originCity ?? "",
    originPostalCode: initialValues?.originPostalCode ?? "",
    originCountry: initialValues?.originCountry ?? "",
    destinationAddress: initialValues?.destinationAddress ?? "",
    destinationCity: initialValues?.destinationCity ?? "",
    destinationPostalCode: initialValues?.destinationPostalCode ?? "",
    destinationCountry: initialValues?.destinationCountry ?? "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleOriginAddressSelect = (components: {
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      originAddress: components.streetAddress,
      originCity: components.city,
      originPostalCode: components.postalCode,
      originCountry: components.country,
    }));

    // Clear related errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.originAddress;
      delete newErrors.originCity;
      delete newErrors.originPostalCode;
      delete newErrors.originCountry;
      return newErrors;
    });
  };

  const handleDestinationAddressSelect = (components: {
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      destinationAddress: components.streetAddress,
      destinationCity: components.city,
      destinationPostalCode: components.postalCode,
      destinationCountry: components.country,
    }));
    // Clear related errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.destinationAddress;
      delete newErrors.destinationCity;
      delete newErrors.destinationPostalCode;
      delete newErrors.destinationCountry;
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.length || parseFloat(formData.length) <= 0) {
      newErrors.length = "Length is required";
    }
    if (!formData.width || parseFloat(formData.width) <= 0) {
      newErrors.width = "Width is required";
    }
    if (!formData.height || parseFloat(formData.height) <= 0) {
      newErrors.height = "Height is required";
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = "Weight is required";
    }
    if (!formData.originAddress.trim()) {
      newErrors.originAddress = "Origin address is required";
    }
    if (!formData.originCity.trim()) {
      newErrors.originCity = "Origin city is required";
    }
    if (!formData.originPostalCode.trim()) {
      newErrors.originPostalCode = "Postal code is required";
    }
    if (!formData.originCountry.trim()) {
      newErrors.originCountry = "Country is required";
    }
    if (!formData.destinationAddress.trim()) {
      newErrors.destinationAddress = "Destination address is required";
    }
    if (!formData.destinationCity.trim()) {
      newErrors.destinationCity = "Destination city is required";
    }
    if (!formData.destinationPostalCode.trim()) {
      newErrors.destinationPostalCode = "Postal code is required";
    }
    if (!formData.destinationCountry.trim()) {
      newErrors.destinationCountry = "Country is required";
    }
    if (!date) {
      newErrors.date = "Shipping date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    if (!validateForm()) return;

    console.log('Form data submitted:', formData, 'Shipping date:', date);

    onSubmit({
      length: parseFloat(formData.length),
      width: parseFloat(formData.width),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      originAddress: formData.originAddress,
      originCity: formData.originCity,
      originPostalCode: formData.originPostalCode,
      originCountry: formData.originCountry,
      destinationAddress: formData.destinationAddress,
      destinationCity: formData.destinationCity,
      destinationPostalCode: formData.destinationPostalCode,
      destinationCountry: formData.destinationCountry,
      shippingDate: date!,
      packageType: "PACKAGE", // Defaulting to "PACKAGE" for simplicity
    });
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial="hidden"
      animate="visible"
    >
      {/* Package Dimensions */}
      <motion.div custom={0} variants={inputVariants} role="group" aria-labelledby="package-dimensions-legend">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Ruler className="h-5 w-5 text-primary" />
          </div>
          <h3 id="package-dimensions-legend" className="font-semibold text-foreground">Package Dimensions</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Length (in)</Label>
            <Input
              id="length"
              type="number"
              step="0.1"
              placeholder="12"
              value={formData.length}
              onChange={(e) => handleInputChange("length", e.target.value)}
              className={cn(errors.length && "border-destructive")}
              required
              aria-invalid={!!errors.length}
              aria-describedby={errors.length ? "length-error" : undefined}
            />
            {errors.length && (
              <p id="length-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.length}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (in)</Label>
            <Input
              id="width"
              type="number"
              step="0.1"
              placeholder="8"
              value={formData.width}
              onChange={(e) => handleInputChange("width", e.target.value)}
              className={cn(errors.width && "border-destructive")}
              required
              aria-invalid={!!errors.width}
              aria-describedby={errors.width ? "width-error" : undefined}
            />
            {errors.width && (
              <p id="width-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.width}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (in)</Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              placeholder="6"
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              className={cn(errors.height && "border-destructive")}
              required
              aria-invalid={!!errors.height}
              aria-describedby={errors.height ? "height-error" : undefined}
            />
            {errors.height && (
              <p id="height-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.height}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Weight */}
      <motion.div custom={1} variants={inputVariants} role="group" aria-labelledby="package-weight-legend">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <h3 id="package-weight-legend" className="font-semibold text-foreground">Package Weight</h3>
        </div>
        <div className="max-w-xs">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            placeholder="5"
            value={formData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            className={cn("mt-2", errors.weight && "border-destructive")}
            required
            aria-invalid={!!errors.weight}
            aria-describedby={errors.weight ? "weight-error" : undefined}
          />
          {errors.weight && (
            <p id="weight-error" role="alert" aria-live="assertive" className="text-sm text-destructive mt-1">{errors.weight}</p>
          )}
        </div>
      </motion.div>

      {/* Origin Address */}
      <motion.div custom={2} variants={inputVariants} role="group" aria-labelledby="ship-from-legend">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <MapPin className="h-5 w-5 text-accent" />
          </div>
          <h3 id="ship-from-legend" className="font-semibold text-foreground">Ship From</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originAddress">Street Address</Label>
            <AddressAutocomplete
              id="originAddress"
              value={formData.originAddress}
              placeholder="Start typing an address..."
              onChange={(value) => handleInputChange("originAddress", value)}
              onAddressSelect={handleOriginAddressSelect}
              error={!!errors.originAddress}
              aria-invalid={!!errors.originAddress}
              aria-describedby={errors.originAddress ? "originAddress-error" : undefined}
            />
            {errors.originAddress && (
              <p id="originAddress-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.originAddress}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originCity">City</Label>
              <Input
                id="originCity"
                placeholder="Toronto"
                value={formData.originCity}
                onChange={(e) => handleInputChange("originCity", e.target.value)}
                className={cn(errors.originCity && "border-destructive")}
                required
                aria-invalid={!!errors.originCity}
                aria-describedby={errors.originCity ? "originCity-error" : undefined}
              />
              {errors.originCity && (
                <p id="originCity-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.originCity}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="originPostalCode">Postal Code</Label>
              <Input
                id="originPostalCode"
                placeholder="K1A 0B1"
                value={formData.originPostalCode}
                onChange={(e) => handleInputChange("originPostalCode", e.target.value)}
                className={cn(errors.originPostalCode && "border-destructive")}
                required
                aria-invalid={!!errors.originPostalCode}
                aria-describedby={errors.originPostalCode ? "originPostalCode-error" : undefined}
              />
              {errors.originPostalCode && (
                <p id="originPostalCode-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.originPostalCode}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="originCountry">Country</Label>
            <Input
              id="originCountry"
              placeholder="Canada"
              value={formData.originCountry}
              onChange={(e) => handleInputChange("originCountry", e.target.value)}
              className={cn(errors.originCountry && "border-destructive")}
              required
              aria-invalid={!!errors.originCountry}
              aria-describedby={errors.originCountry ? "originCountry-error" : undefined}
            />
            {errors.originCountry && (
              <p id="originCountry-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.originCountry}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Destination Address */}
      <motion.div custom={3} variants={inputVariants} role="group" aria-labelledby="ship-to-legend">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-success/10">
            <Package className="h-5 w-5 text-success" />
          </div>
          <h3 id="ship-to-legend" className="font-semibold text-foreground">Ship To</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destinationAddress">Street Address</Label>
            <AddressAutocomplete
              id="destinationAddress"
              placeholder="Start typing an address..."
              value={formData.destinationAddress}
              onChange={(value) => handleInputChange("destinationAddress", value)}
              onAddressSelect={handleDestinationAddressSelect}
              error={!!errors.destinationAddress}
              aria-invalid={!!errors.destinationAddress}
              aria-describedby={errors.destinationAddress ? "destinationAddress-error" : undefined}
            />
            {errors.destinationAddress && (
              <p id="destinationAddress-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.destinationAddress}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destinationCity">City</Label>
              <Input
                id="destinationCity"
                placeholder="Vancouver"
                value={formData.destinationCity}
                onChange={(e) => handleInputChange("destinationCity", e.target.value)}
                className={cn(errors.destinationCity && "border-destructive")}
                required
                aria-invalid={!!errors.destinationCity}
                aria-describedby={errors.destinationCity ? "destinationCity-error" : undefined}
              />
              {errors.destinationCity && (
                <p id="destinationCity-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.destinationCity}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationPostalCode">Postal Code</Label>
              <Input
                id="destinationPostalCode"
                placeholder="K1A 0B1"
                value={formData.destinationPostalCode}
                onChange={(e) => handleInputChange("destinationPostalCode", e.target.value)}
                className={cn(errors.destinationPostalCode && "border-destructive")}
                required
                aria-invalid={!!errors.destinationPostalCode}
                aria-describedby={errors.destinationPostalCode ? "destinationPostalCode-error" : undefined}
              />
              {errors.destinationPostalCode && (
                <p id="destinationPostalCode-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.destinationPostalCode}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationCountry">Country</Label>
              <Input
                id="destinationCountry"
                placeholder="Canada"
                value={formData.destinationCountry}
                onChange={(e) => handleInputChange("destinationCountry", e.target.value)}
                className={cn(errors.destinationCountry && "border-destructive")}
                required
                aria-invalid={!!errors.destinationCountry}
                aria-describedby={errors.destinationCountry ? "destinationCountry-error" : undefined}
              />
              {errors.destinationCountry && (
                <p id="destinationCountry-error" role="alert" aria-live="assertive" className="text-sm text-destructive">{errors.destinationCountry}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shipping Date */}
      <motion.div custom={4} variants={inputVariants} role="group" aria-labelledby="shipping-date-legend">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-warning/10">
            <Calendar className="h-5 w-5 text-warning" />
          </div>
          <h3 id="shipping-date-legend" className="font-semibold text-foreground">Shipping Date</h3>
        </div>
        <Popover>
            <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full max-w-xs justify-start text-left font-normal",
                !date && "text-muted-foreground",
                errors.date && "border-destructive"
              )}
              aria-label="Select shipping date"
              aria-describedby={errors.date ? "date-error" : undefined}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                if (errors.date) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.date;
                    return newErrors;
                  });
                }
              }}
              disabled={(date) => date < new Date()}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p id="date-error" role="alert" aria-live="assertive" className="text-sm text-destructive mt-1">{errors.date}</p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div custom={5} variants={inputVariants}>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-pulse-soft">Fetching rates...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Compare Rates
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
