import { Group, Popover } from "@mantine/core";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { CredentialsContext } from "../../../shared/providers/credentialsProvider";
import styles from "../Login.module.scss";
import CustomNavLink from "../../../navbar/CustomNavLink";
import { returnImage } from "../../../shared/images/ImageReader";

const LoggedUser = () => {
  const credentialsContext = useContext(CredentialsContext);

  const userAvatar = returnImage(credentialsContext.user?.image);

  return (
    <Popover
      position="bottom"
      withArrow
      shadow="md"
      classNames={{ dropdown: styles.loggedUserDropdown }}
      arrowSize={0}
    >
      <Popover.Target>
        <Group className={styles.loggedUserButton}>
          <p>{credentialsContext.user?.username}</p>
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="Author"
              className={styles.userIcon}
              style={{ padding: 0, borderRadius: "50%", width: 30, height: 30 }}
            />
          ) : (
            <i className={`pi pi-user ${styles.userIcon}`}></i>
          )}
        </Group>
      </Popover.Target>
      <Popover.Dropdown>
        <CustomNavLink
          href="/profile"
          label="Profile"
          leftSection={
            userAvatar ? (
              <img
                src={userAvatar}
                alt="Author"
                className={styles.userIcon}
                style={{ padding: 0, borderRadius: "50%" }}
              />
            ) : (
              <i className={`pi pi-user ${styles.userIcon}`}></i>
            )
          }
          accountLink={true}
        />
        <CustomNavLink
          href="/profile/quizz-history"
          label="Quizz History"
          leftSection={<i className="pi pi-chart-bar"></i>}
          accountLink={true}
        />
        <CustomNavLink
          href="/profile/my-quizzes"
          label="My Quizzes"
          leftSection={<i className="pi pi-list"></i>}
          accountLink={true}
        />
        <CustomNavLink
          href="/profile/create-quizz"
          label="Create Quiz"
          leftSection={<i className="pi pi-plus"></i>}
          accountLink={true}
        />
        <CustomNavLink
          href="/profile/favourite-quizzes"
          label="Favourites"
          leftSection={<i className="pi pi-star"></i>}
          accountLink={true}
        />
        <LogoutButton />
      </Popover.Dropdown>
    </Popover>
  );
};

export default LoggedUser;
