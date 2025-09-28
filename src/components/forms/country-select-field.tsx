import { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import {
  Command,
  CommandSeparator,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CountrySelectField({
  name,
  label,
  control,
  error,
  required,
}: CountrySelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => <CountrySelect {...field} />}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
      <p className="textxs text-gray-500">
        Help us show market data and news relevant to you.
      </p>
    </div>
  );
}

function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const countries = useMemo(() => countryList().getData(), []);

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="country-select-trigger"
          role="combobox"
          aria-expanded={open}
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span>{getFlagEmoji(value)}</span>
              <span>{countries.find((c) => c.value === value)?.label}</span>
            </span>
          ) : (
            "Select your country"
          )}
          <ChevronDownIcon className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 bg-gray-800 border-gray-600"
        align="start"
      >
        <Command className="bg-gray-800 border-gray-600">
          <CommandInput
            placeholder="Search countries.."
            className="country-select-input"
          />
          <CommandEmpty className="country-select-empty">
            No country found.
          </CommandEmpty>
          <CommandList className="max-h-60 bg-gray-800 scrollbar-hide-default">
            <CommandGroup className="bg-gray-800">
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={`${country.value} ${country.label}`}
                  onSelect={() => {
                    onChange(country.value);
                    setOpen(false);
                  }}
                  className="country-select-item"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 size-4 text-yellow-500",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex items-center gap-2">
                    <span>{getFlagEmoji(country.value)}</span>
                    <span>{country.label}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
