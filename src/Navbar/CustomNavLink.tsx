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
  closeMenu?: () => void;
}

const CustomNavLink = (props: CustomNavLinkProps) => {
  const {
    href,
    label,
    leftSection,
    children,
    accountLink,
    onClick,
    disabled,
    closeMenu,
  } = props;

  const navigate = useNavigate();

  const handleOnclick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      closeMenu && closeMenu();
      navigate(href);
    }
  };

  return (
    <NavLink
      onClick={handleOnclick}
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
