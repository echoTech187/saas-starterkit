type IconProps = {
    src: string,
    className?: string | undefined
};
interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
}
export type { IconProps, IconPickerProps };