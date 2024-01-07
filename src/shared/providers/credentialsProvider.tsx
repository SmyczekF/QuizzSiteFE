import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { showErrorNotification } from '../notifications/showErrorNotification';
import { showSuccessNotification } from '../notifications/showSuccessNotification';

interface CredentialsContextProps {
    username: string;
    setUsername: (username: string) => void;
}

export const CredentialsContext = createContext<CredentialsContextProps>({
    username: '',
    setUsername: () => {},
});

export const CredentialsContextProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if(loggedIn === 'true') {
            axios.get(`/auth/getLoggedUser`)
            .then((response) => {
                setUsername(response.data.username);
            })
            .catch((error) => {
                showErrorNotification(error.response.data.message);
                localStorage.removeItem('loggedIn');
            })
        }
    }, []);

    return (
        <CredentialsContext.Provider value={{ username, setUsername }}>
            {children}
        </CredentialsContext.Provider>
    );
};
