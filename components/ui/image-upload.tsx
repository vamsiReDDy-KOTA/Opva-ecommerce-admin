"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadOptions {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadOptions> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUploadSuccess = (result: any) => {
        console.log("Upload success, full result:", result);

        // Check for the secure URL in the result object
        if (result?.info?.secure_url) {
            const url = result.info.secure_url;
            console.log("Uploaded image URL:", url);
            onChange(url); // Use the URL from Cloudinary
        } else {
            console.error("Upload succeeded but no secure_url found:", result);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-2 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Uploaded image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUploadSuccess} uploadPreset="b0oitce2">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
