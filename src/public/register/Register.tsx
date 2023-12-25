import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import VerifyEmail from "./components/VerifyEmail";

export interface RegisterProps {
    onAccountClick: () => void;
}

const Register = (props: RegisterProps) => {
    const [registered, setRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const { onAccountClick } = props;

    return(
        registered 
        ? <VerifyEmail 
            onGoToLogin={() => {
                setRegistered(false);
                onAccountClick();
            }}
            onGoToRegister={() => setRegistered(false)}
            email={email}
        />
        : <RegisterForm 
            onAccountClick={onAccountClick}
            onRegistered={() => setRegistered(true)}
            setEmail={setEmail}
        />
    )
}

export default Register;