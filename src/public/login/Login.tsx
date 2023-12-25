import { Button, Modal } from "@mantine/core"
import "primeicons/primeicons.css";
import styles from './Login.module.scss';
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Register from "../register/Register";

const Login = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const [register, setRegister] = useState(false);

    return (
        <>
            <Modal opened={opened} onClose={close} classNames={{root: styles.loginModal}}>
                {
                    register 
                    ? <Register onAccountClick={() => setRegister(false)}/>
                    : <LoginForm onNoAccountClick={() => setRegister(true)} closeModal={close}/>
                }
            </Modal>
            <Button color="yellow" onClick={open}>
                Login
            </Button>
        </>
    )
}

export default Login;