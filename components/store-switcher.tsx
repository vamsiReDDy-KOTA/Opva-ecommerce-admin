"use client"

import React, { useState } from "react"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { Store } from "@prisma/client"
import { useStoreModal } from "@/Hooks/use-store-modal"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PopoverContent } from "@radix-ui/react-popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = [] // Default to empty array if items is undefined
}: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    // Ensure items is defined and map over it
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));

    // Check if params.storeId is defined before trying to find currentStore
    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    if (!currentStore) {
        console.warn("No current store found for storeId:", params.storeId);
    }

    const [open, setOpen] = useState(false)

    const onStoreSelect = (store: { value: string; label: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder=" Search Store...." />
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {
                                formattedItems.map((store) => (
                                    <CommandItem
                                        key={store.value}
                                        onSelect={() => onStoreSelect(store)}
                                    >
                                        <StoreIcon className="mr-2 h-4 w-4" />
                                        {store.label}
                                        <Check
                                            className={cn("ml-auto h-4 w-4",
                                                currentStore?.value === store.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                        {/* Render formattedItems here if needed */}
                        {/* Example: */}
                        {/* {formattedItems.map((item) => (
                            <Button key={item.value} onClick={() => onStoreSelect(item)}>
                                {item.label}
                            </Button>
                        ))} */}
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    storeModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}