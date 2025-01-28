import { NavLink } from "@mantine/core";
import styles from "../App.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

interface CustomNavLinkProps {
  label: string;
  leftSection: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  accountLink?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomNavLink = (props: CustomNavLinkProps) => {
  const { href, label, leftSection, children, accountLink, onClick, disabled } =
    props;

  const navigate = useNavigate();

  return (
    <NavLink
      onClick={onClick || (() => (href ? navigate(href) : null))}
      label={label}
      leftSection={leftSection}
      classNames={{
        root: styles.navLink,
        label: accountLink ? styles.navLinkLabelAccount : styles.navLinkLabel,
        section: styles.navLinkSection,
      }}
      disabled={disabled}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
