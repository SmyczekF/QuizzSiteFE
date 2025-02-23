import { notifications } from "@mantine/notifications";
import styles from "./notifications.module.scss";

export const showErrorNotification = (message: string, title?: string) => {
  notifications.show({
    title: title ? title : "Error",
    message: message,
    color: "red",
    icon: <i className="pi pi-times"></i>,
    autoClose: 3500,
    classNames: {
      description: styles.notification,
      title: styles.notification,
    },
  });
};
