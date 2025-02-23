import { notifications } from "@mantine/notifications";
import styles from "./notifications.module.scss";

export const showSuccessNotification = (message: string, title?: string) => {
  notifications.show({
    title: title ? title : "Success",
    message: message,
    color: "teal",
    icon: <i className="pi pi-check"></i>,
    autoClose: 3500,
    classNames: {
      description: styles.notification,
      title: styles.notification,
    },
  });
};
