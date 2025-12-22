
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Logo = ({ className, src, width, height, showTitle = true }: { className?: string, src?: string, width?: number, height?: number, showTitle?: boolean }) => {

    return (
        <div className={cn('flex items-center gap-2.5 h-12', className)}>
            <Image src={src !== undefined ? src : '/src/logo/dark-mode.png'} loading='eager' unoptimized alt='logo' width={width !== undefined ? width : 48} height={height !== undefined ? height : 48} />
            {showTitle && <span className='text-white font-bold'>NusantaraSaas</span>}
        </div>
    )
}

export default Logo