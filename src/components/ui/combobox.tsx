"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PageType = {
  id: string;
  title: string;
};

interface ComboboxProps {
  pages: PageType[];
  selectedPage: string;
  setSelectedPage: (value: string) => void;
}

export function Combobox({
  pages,
  selectedPage,
  setSelectedPage,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedPage
            ? pages.find((page) => page.id === selectedPage)?.title
            : "Select a page..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search pages..." />
          <CommandEmpty>No pages found.</CommandEmpty>
          <CommandGroup>
            {pages.map((page) => (
              <CommandItem
                key={page.id}
                value={page.id}
                onSelect={(currentValue) => {
                  setSelectedPage(
                    currentValue === selectedPage ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedPage === page.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
