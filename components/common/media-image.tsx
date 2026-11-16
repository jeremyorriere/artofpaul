import Image from "next/image";
import { cn } from "@/lib/utils";

/* eslint-disable @next/next/no-img-element */

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

function isRemoteImage(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function MediaImage({ src, alt, className, priority = false }: Readonly<MediaImageProps>) {
  if (isRemoteImage(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
      />
    );
  }

  return <Image src={src} alt={alt} fill priority={priority} className={className} />;
}

