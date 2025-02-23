import { notifications } from "@mantine/notifications";
import styles from "./notifications.module.scss";

export const showWarnNotification = (message: string, title?: string) => {
  notifications.show({
    title: title ? title : "Warning",
    message: message,
    color: "yellow",
    icon: <i className="pi pi-exclamation-triangle"></i>,
    autoClose: 2500,
    classNames: {
      description: styles.notification,
      title: styles.notification,
    },
  });
};
