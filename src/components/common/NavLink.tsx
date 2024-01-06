import Link from "next/link";

interface Props {
    isSelected?: boolean;
    isMobile?: boolean;
    href?: string;
    children: React.ReactNode;
    [rest: string]: any;
}

export default function NavLink({
                                    isSelected,
                                    isMobile,
                                    href,
                                    children,
                                    ...rest
                                }: Props) {
    const className = rest.className;

    if (!href) {
        return (
            <span className={className} role='button' onClick={rest.onClick}>
        {children}
      </span>
        );
    }

    return (
        <Link className={className} href={href}>
            {children}
        </Link>
    );
}
