import { Button, Modal } from "@mantine/core"
import { useForm } from "@mantine/form";
import "primeicons/primeicons.css";
import styles from './Login.module.scss';
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

const Login = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const [register, setRegister] = useState(false);

    return (
        <>
            <Modal opened={opened} onClose={close} classNames={{root: styles.loginModal}}>
                {
                    register 
                    ? <RegisterForm onAccountClick={() => setRegister(false)}/>
                    : <LoginForm onNoAccountClick={() => setRegister(true)}/>
                }
            </Modal>
            <Button color="yellow" onClick={open}>
                Login
            </Button>
        </>
    )
}

export default Login;