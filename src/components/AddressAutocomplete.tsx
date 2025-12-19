import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { debounce } from 'lodash';
import {
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

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

interface PlaceAutocompleteProps {
  onAddressSelect: (place: google.maps.places.PlaceResult | null) => void;
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
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["address_components", "formatted_address", "geometry"]
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const parsed = parseAddressComponents(placeAutocomplete.getPlace());

      onAddressSelect(parsed);
    });
  }, [onAddressSelect, placeAutocomplete]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(error && "border-destructive", className)}
      />
    </div>
  );
}
