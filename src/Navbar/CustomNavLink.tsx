import { NavLink } from "@mantine/core";
import styles from "../App.module.scss";

interface CustomNavLinkProps {
  label: string;
  leftSection: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  accountLink?: boolean;
  onClick?: () => void;
}

const CustomNavLink = (props: CustomNavLinkProps) => {
  const { href, label, leftSection, children, accountLink, onClick } = props;

  return (
    <NavLink
      onClick={onClick || (() => (href ? (window.location.href = href) : null))}
      label={label}
      leftSection={leftSection}
      classNames={{
        root: styles.navLink,
        label: accountLink ? styles.navLinkLabelAccount : styles.navLinkLabel,
        section: styles.navLinkSection,
      }}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
