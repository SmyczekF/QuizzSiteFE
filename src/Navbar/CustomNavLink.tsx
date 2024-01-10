import { NavLink } from "@mantine/core";
import styles from '../App.module.scss';

interface CustomNavLinkProps {
    href: string;
    label: string;
    leftSection: React.ReactNode;
    children?: React.ReactNode;
    accountLink?: boolean;
}

const CustomNavLink = (props: CustomNavLinkProps) => {

    const { href, label, leftSection, children, accountLink } = props;

    return (
        <NavLink 
          href={href} 
          label={label}
          leftSection={leftSection} 
          classNames={{
            root: styles.navLink,
            label: accountLink ? styles.navLinkLabelAccount : styles.navLinkLabel,
            section: styles.navLinkSection,
          }}
        >{children}</NavLink>
    )
}

export default CustomNavLink;