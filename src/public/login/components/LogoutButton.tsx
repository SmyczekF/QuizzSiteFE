import { Button } from "@mantine/core";
import { useContext } from "react";
import { CredentialsContext } from "../../../shared/providers/credentialsProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showErrorNotification } from "../../../shared/notifications/showErrorNotification";
import { showSuccessNotification } from "../../../shared/notifications/showSuccessNotification";

const LogoutButton = () => {
    
    const credentialsContext = useContext(CredentialsContext);

    const logoutMutation = useMutation({
        mutationFn: () => {
            return axios.post(`/auth/logout`)
        },
        onSuccess: (data) => {
            showSuccessNotification('Logged out successfully');
            if (credentialsContext.refetch) {
                credentialsContext.refetch();
            }
            localStorage.removeItem('loggedIn');
        },
        onError: (error) => {
            showErrorNotification('Something went wrong');
            console.log(error)
        }
    });

    return (
        <Button color="yellow" onClick={() => logoutMutation.mutate()}>
            Logout
        </Button>
    );
}

export default LogoutButton;