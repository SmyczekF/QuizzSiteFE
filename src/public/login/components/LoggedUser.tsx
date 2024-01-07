import { Group, Popover } from "@mantine/core";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { CredentialsContext } from "../../../shared/providers/credentialsProvider";
import styles from '../Login.module.scss';

const LoggedUser = () => {
    
    const credentialsContext = useContext(CredentialsContext);
    
    return (
        <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Group className={styles.loggedUserButton}>
                    <p>{credentialsContext.username}</p>
                    <i className="pi pi-user"></i>
                </Group>
            </Popover.Target>
            <Popover.Dropdown>
                <LogoutButton />
            </Popover.Dropdown>
        </Popover>
    );
}

export default LoggedUser