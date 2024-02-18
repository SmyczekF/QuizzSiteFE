import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useState, ReactNode } from 'react';
import { User } from './credentials.types';

interface CredentialsContextProps {
    user: User | undefined;
    isLoading?: boolean;
    isFetched?: boolean;
    refetch?: () => void;
}

export const CredentialsContext = createContext<CredentialsContextProps>({
    user: { username: '', email: '' },
    isLoading: false,
    refetch: () => {},
    isFetched: false,
});

export const CredentialsContextProvider = ({ children }: { children: ReactNode }) => {

    const [enabled, setEnabled] = useState(!!localStorage.getItem('loggedIn'));

    const { data: user, isLoading, refetch, isFetched} = useQuery<User>({
        queryKey: ['credentials'],
        queryFn: () => 
            axios.get(`/auth/getLoggedUser`)
            .then((res) => res.data || '').catch((err) => {
                setEnabled(false);
                return '';
            }),
        enabled: enabled,
    });
    

    return (
        <CredentialsContext.Provider value={{ user, isLoading, refetch, isFetched }}>
            {children}
        </CredentialsContext.Provider>
    );
};
