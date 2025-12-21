import Image from 'next/image';
type IconProps = {
    src: string,
    className?: string | undefined
}
export default function IconImage({ src, className }: IconProps) {
    return (
        <Image src={src} width={200} height={200} alt="Icon" unoptimized loading="eager" className={className} />
    );
}