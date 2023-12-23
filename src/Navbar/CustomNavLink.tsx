import { NavLink } from "@mantine/core";
import styles from '../App.module.scss';

interface CustomNavLinkProps {
    href: string;
    label: string;
    leftSection: React.ReactNode;
    children?: React.ReactNode;
}

const CustomNavLink = (props: CustomNavLinkProps) => {

    const { href, label, leftSection, children } = props;

    return (
        <NavLink 
          href={href} 
          label={label}
          leftSection={leftSection} 
          classNames={{
            root: styles.navLink,
            label: styles.navLinkLabel,
            section: styles.navLinkSection,
          }}
        >{children}</NavLink>
    )
}

export default CustomNavLink;