import * as LucideIcons from 'lucide-react';

const DynamicProjectIcon = ({ name, className }: { name: string; className?: string }) => {
    // Ambil component icon dari library Lucide berdasarkan string nama
    const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;

    // Fallback kalau nama icon salah/tidak ada: Pakai icon 'Box'
    if (!IconComponent) {
        return <LucideIcons.Box className={className} />;
    }

    return <IconComponent className={className} />;
};

export default DynamicProjectIcon;