"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImageOff, ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";
import { Card, CardContent } from "./card";
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Carousel className="w-full max-w-3xl mb-4">
        <CarouselContent>
          {value.map((url) => (
            <CarouselItem key={url}>
              <Card>
                <CardContent className="relative flex aspect-square items-center justify-center">
                  <Image
                    fill
                    className="object-cover aspect-square rounded-md"
                    alt="Image"
                    src={url}
                  />
                  <div className="z-10 absolute top-2 right-2">
                    <Button
                      type="button"
                      onClick={() => onRemove(url)}
                      variant="destructive"
                      size={"icon"}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="bodhifnm"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              onClick={onClick}
              disabled={disabled}
              variant={"secondary"}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
