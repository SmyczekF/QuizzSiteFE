import { Button, Modal } from "@mantine/core"
import "primeicons/primeicons.css";
import styles from './Login.module.scss';
import { useDisclosure } from "@mantine/hooks";
import { useContext, useState } from "react";
import LoginForm from "./components/LoginForm";
import Register from "../register/Register";
import { CredentialsContext } from "../../shared/providers/credentialsProvider";
import LoggedUser from "./components/LoggedUser";
import { useTranslation } from 'react-i18next';

const Login = () => {

    const { t } = useTranslation('app');
    const [opened, { open, close }] = useDisclosure(false);
    const [register, setRegister] = useState(false);
    const credentialsContext = useContext(CredentialsContext);
    
    const handleModalOpen = () => {
        setRegister(false);
        open();
    }

    console.log(credentialsContext.user)

    return (
        <>
            <Modal opened={opened} onClose={close} classNames={{root: styles.loginModal}}>
                {
                    register 
                    ? <Register onAccountClick={() => setRegister(false)}/>
                    : <LoginForm onNoAccountClick={() => setRegister(true)} closeModal={close}/>
                }
            </Modal>
            {
                credentialsContext.isLoading
                ? null
                : !credentialsContext.user?.username 
                ? <Button color="yellow" onClick={handleModalOpen}>{t('login')}</Button>
                : <LoggedUser />   
            }
        </>
    )
}

export default Login;