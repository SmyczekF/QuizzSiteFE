import { Group, Popover } from "@mantine/core";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { CredentialsContext } from "../../../shared/providers/credentialsProvider";
import styles from '../Login.module.scss';
import { NavLink } from "react-router-dom";
import CustomNavLink from "../../../navbar/CustomNavLink";

const LoggedUser = () => {
    
    const credentialsContext = useContext(CredentialsContext);
    
    return (
        <Popover position="bottom" withArrow shadow="md" classNames={{dropdown: styles.loggedUserDropdown}} arrowSize={0}>
            <Popover.Target>
                <Group className={styles.loggedUserButton}>
                    <p>{credentialsContext.username}</p>
                    <i className="pi pi-user"></i>
                </Group>
            </Popover.Target>
            <Popover.Dropdown>
                <CustomNavLink href="/profile" label="Profile" leftSection={<i className="pi pi-user"></i>} accountLink={true}/>
                <CustomNavLink href="/profile/quizzes" label="My Quizzes" leftSection={<i className="pi pi-question-circle"></i>} accountLink={true}/>
                <CustomNavLink href="/profile/create-quizz" label="Create Quizz" leftSection={<i className="pi pi-plus"></i>} accountLink={true}/>
                <LogoutButton />
            </Popover.Dropdown>
        </Popover>
    );
}

export default LoggedUser