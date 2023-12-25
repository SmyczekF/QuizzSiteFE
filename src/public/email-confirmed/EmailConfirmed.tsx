import { notifications } from "@mantine/notifications"
import Home from "../../pages/Home/Home"

const EmailConfirmed = () => {
    return (
        <Home startNotification={
            () => notifications.show({
                title: 'Success',
                message: 'Your email has been confirmed successfully, you can now log in',
                color: 'teal',
                icon: <i className="pi pi-check"></i>,
                autoClose: 2500,
                classNames: {description: 'notification', title: 'notification'}
            })}
        />
    )
}

export default EmailConfirmed