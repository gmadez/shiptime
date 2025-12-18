/// <reference types="@types/google.maps" />
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Add your Google Places API key here
const GOOGLE_PLACES_API_KEY = "AIzaSyBUFQfIkLM87Kw65YKfgBx70nA9NpCJzwY";

interface AddressComponents {
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
}

interface AddressAutocompleteProps {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onAddressSelect: (components: AddressComponents) => void;
  className?: string;
  error?: boolean;
}

declare global {
  interface Window {
    initGooglePlaces: () => void;
  }
}

let isScriptLoading = false;
let isScriptLoaded = false;
const loadCallbacks: (() => void)[] = [];

function loadGooglePlacesScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!GOOGLE_PLACES_API_KEY) {
      reject(new Error("Google Places API key not configured"));
      return;
    }

    if (isScriptLoaded && window.google?.maps?.places) {
      resolve();
      return;
    }

    loadCallbacks.push(() => resolve());

    if (isScriptLoading) return;
    isScriptLoading = true;

    window.initGooglePlaces = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      isScriptLoading = false;
      reject(new Error("Failed to load Google Places API"));
    };
    document.head.appendChild(script);
  });
}

function parseAddressComponents(
  place: google.maps.places.PlaceResult
): AddressComponents {
  const components: AddressComponents = {
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
    state: "",
  };

  let streetNumber = "";
  let route = "";

  place.address_components?.forEach((component) => {
    const types = component.types;

    if (types.includes("street_number")) {
      streetNumber = component.long_name;
    }
    if (types.includes("route")) {
      route = component.long_name;
    }
    if (types.includes("locality") || types.includes("postal_town")) {
      components.city = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      components.state = component.short_name;
    }
    if (types.includes("postal_code")) {
      components.postalCode = component.long_name;
    }
    if (types.includes("country")) {
      components.country = component.short_name;
    }
  });

  components.streetAddress = [streetNumber, route].filter(Boolean).join(" ");

  // Fallback to formatted address if street address couldn't be parsed
  if (!components.streetAddress && place.formatted_address) {
    components.streetAddress = place.formatted_address.split(",")[0];
  }

  return components;
}

export function AddressAutocomplete({
  id,
  placeholder = "Start typing an address...",
  value,
  onChange,
  onAddressSelect,
  className,
  error,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!GOOGLE_PLACES_API_KEY) {
      setApiError("API key not configured");
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    loadGooglePlacesScript()
      .then(() => {
        if (!isMounted || !inputRef.current) return;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["address"],
            fields: ["address_components", "formatted_address", "geometry"],
          }
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (place?.address_components) {
            const parsed = parseAddressComponents(place);
            onChange(parsed.streetAddress);
            onAddressSelect(parsed);
          }
        });

        setIsLoading(false);
        setApiError(null);
      })
      .catch((err) => {
        if (isMounted) {
          setApiError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, [onChange, onAddressSelect]);

  if (apiError === "API key not configured") {
    return (
      <div className="space-y-1">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(error && "border-destructive", className)}
        />
        <p className="text-xs text-muted-foreground">
          Add Google Places API key for autocomplete
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(error && "border-destructive", className)}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      {apiError && apiError !== "API key not configured" && (
        <p className="text-xs text-destructive mt-1">{apiError}</p>
      )}
    </div>
  );
}
