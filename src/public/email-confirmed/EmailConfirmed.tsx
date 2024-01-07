import { notifications } from "@mantine/notifications"
import Home from "../../pages/Home/Home"
import { showSuccessNotification } from "../../shared/notifications/showSuccessNotification"

const EmailConfirmed = () => {
    return (
        <Home startNotification={
            () => showSuccessNotification('Your email has been confirmed successfully, you can now log in')
        }
        />
    )
}

export default EmailConfirmed