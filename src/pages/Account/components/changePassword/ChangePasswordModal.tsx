import {
  Button,
  Flex,
  Modal,
  ModalProps,
  PasswordInput,
  Text,
} from "@mantine/core";
import styles from "./ChangePasswordModal.module.scss";
import { useForm } from "@mantine/form";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { showSuccessNotification } from "../../../../shared/notifications/showSuccessNotification";
import { showErrorNotification } from "../../../../shared/notifications/showErrorNotification";

interface ChangePasswordValues {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

const ChangePasswordModal = (props: ModalProps) => {
  const form = useForm({
    initialValues: { oldPassword: "", newPassword: "", repeatNewPassword: "" },

    validate: {
      oldPassword: (value) =>
        value.length > 0 ? null : "Old password is required",
      newPassword: (value): string | null => {
        if (!/^.{8,}$/.test(value)) return "New password is too short";
        if (!/[a-z]/.test(value))
          return "New password must contain at least one lowercase letter";
        if (!/[A-Z]/.test(value))
          return "New password must contain at least one uppercase letter";
        if (!/[0-9]/.test(value))
          return "New password must contain at least one number";
        return null;
      },
      repeatNewPassword: (value): string | null =>
        value === form.values.newPassword ? null : "Passwords do not match",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (values: ChangePasswordValues) =>
      axios.post("/auth/changePassword", values),
    onSuccess: () => {
      showSuccessNotification(`Password updated successfully!.`);
    },
    onError: (error: AxiosError) => {
      showErrorNotification(
        error.request.response || `Password update failed.`
      );
    },
  });

  return (
    <Modal {...props}>
      <Text classNames={{ root: styles.label }}>Change password</Text>
      <form
        onSubmit={form.onSubmit((values) =>
          changePasswordMutation.mutate(values)
        )}
      >
        <Flex direction={"column"} gap={"20px"}>
          <PasswordInput
            required
            placeholder="Old password"
            type="password"
            leftSection={<i className="pi pi-lock"></i>}
            {...form.getInputProps("oldPassword")}
          />
          <PasswordInput
            required
            placeholder="New password"
            type="password"
            leftSection={<i className="pi pi-lock"></i>}
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            required
            placeholder="Repeat new password"
            type="password"
            leftSection={<i className="pi pi-lock"></i>}
            {...form.getInputProps("repeatNewPassword")}
          />
          <Button color="yellow" className={styles.button} type="submit">
            Change password
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
