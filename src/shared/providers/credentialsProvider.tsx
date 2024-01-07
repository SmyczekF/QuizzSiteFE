import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useState, ReactNode } from 'react';

interface CredentialsContextProps {
    username: string;
    isLoading?: boolean;
    isFetched?: boolean;
    refetch?: () => void;
}

export const CredentialsContext = createContext<CredentialsContextProps>({
    username: '',
    isLoading: false,
    refetch: () => {},
    isFetched: false,
});

export const CredentialsContextProvider = ({ children }: { children: ReactNode }) => {

    const [enabled, setEnabled] = useState(!!localStorage.getItem('loggedIn'));

    const { data: username, isLoading, refetch, isFetched} = useQuery({
        queryKey: ['credentials'],
        queryFn: () => 
            axios.get(`/auth/getLoggedUser`)
            .then((res) => res.data?.username || '').catch((err) => {
                setEnabled(false);
                return '';
            }),
        enabled: enabled,
    });
    

    return (
        <CredentialsContext.Provider value={{ username, isLoading, refetch, isFetched }}>
            {children}
        </CredentialsContext.Provider>
    );
};
