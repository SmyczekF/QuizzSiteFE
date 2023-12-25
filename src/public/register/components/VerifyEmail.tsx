import { Button, Flex, Text} from '@mantine/core';
import styles from '../Register.module.scss';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface VerifyEmailProps {
    onGoToLogin: () => void;
    onGoToRegister: () => void;
    email: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {

    const { onGoToLogin, onGoToRegister, email } = props;

    const [resendAllowed, setResendAllowed] = useState(true);

    const [timeLeft, setTimeLeft] = useState(30);

    const verifyEmailMutation = useMutation({
        mutationFn: (email: string) => {
            return axios.post(`/auth/sendActivationEmail`, {email: email})
        },
        onSuccess: (data) => {
            console.log(data);
        }
    });

    useEffect(() => {
        if (timeLeft > 0 && !resendAllowed) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !resendAllowed) {
            setResendAllowed(true);
        }
    }, [timeLeft, resendAllowed]);

    return(
        <>
            <Text classNames={{root: styles.label}}>Verify Email</Text>
            <Flex direction={'column'} gap={'20px'}>
                <Text>We have send the verification email to {email}</Text>
                <Text>Check your email and click the link to verify your account</Text>
                <Text>If you did not receive the email, click the button below to send it again</Text>
                <Button
                    color="yellow" 
                    onClick={() => {
                        verifyEmailMutation.mutate(email);
                        setResendAllowed(false);
                        setTimeLeft(30);
                    }}
                    disabled={!resendAllowed}
                >
                    {resendAllowed ? 'Send the confirmation email' : `Wait ${timeLeft} seconds before sending the email again`}
                </Button>
            </Flex>
            
            <Flex justify={'space-between'} direction={'column'} m={'20 0 0 0'}>
                <Text className={styles.hyperlink} onClick={onGoToLogin}>Already have an account? Log in!</Text>
                <Text className={styles.hyperlink} onClick={onGoToRegister}>There was an error in registration? Register again!</Text>
            </Flex>
        </>
    )
}

export default VerifyEmail;