import { IconProps } from '@/lib/types/icon';
import Image from 'next/image';

export default function IconImage({ src, className }: IconProps) {
    return (
        <Image src={src} width={200} height={200} alt="Icon" unoptimized loading="eager" className={className} />
    );
}