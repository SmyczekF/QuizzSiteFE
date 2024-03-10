import { Button, Grid, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { CredentialsContext } from "../../../shared/providers/credentialsProvider";
import TextInputWithEdit from "../../../shared/customInputs/TextInputWithEdit";
import styles from '../Account.module.scss';
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { showSuccessNotification } from "../../../shared/notifications/showSuccessNotification";
import { showErrorNotification } from "../../../shared/notifications/showErrorNotification";

const AccountDetails = () => {

    const credentialsContext = useContext(CredentialsContext);

    const [username, setUsername] = useState(credentialsContext.user?.username || '');
    const [resetIsEditing, setResetIsEditing] = useState(false);

    const privatiseEmail = (email: string | undefined) => {
        if(!email) return ('');
        const [name, domain] = email.split('@');
        const stars = '*'.repeat(name.length - 2);
        return `${name[0]}${stars}${name[name.length - 1]}@${domain}`;
    }

    const changeLoggedUserUsernameMutation = useMutation<AxiosResponse, AxiosError>({
        mutationFn: () => axios.post('/auth/changeLoggedUserUsername', {username: username}),
        onSuccess: (data: AxiosResponse) => {
            showSuccessNotification(`${credentialsContext.user?.username} updated successfully!.`);
            if(credentialsContext.refetch) credentialsContext.refetch();
            setResetIsEditing(true);
            // setResetIsEditing(false);
        },
        onError: (error) => {
            showErrorNotification(error.request.response || `${credentialsContext.user?.username} update failed.`);
        }
    })

    return (
        <>
            <Grid gutter={'xl'} >
                <Grid.Col span={12}>
                    <h1 className={styles.contentTitle}>Account Details</h1>
                    <p className={styles.contentDescription}>Here you can see your account details and change your password.</p>
                </Grid.Col>
                <Grid.Col span={4} className={styles.row}>
                    <p className={styles.rowText}>Username</p>
                </Grid.Col>
                <Grid.Col span={8}>
                    <TextInputWithEdit
                        initialValue={credentialsContext.user?.username || ''}
                        onChange={setUsername}
                        resetIsEditing={resetIsEditing}
                        startedEditionCallback={() => setResetIsEditing(false)}
                    />
                </Grid.Col>
                <Grid.Col span={4} className={styles.row}>
                    <p className={styles.rowText}>Email</p>
                </Grid.Col>
                <Grid.Col span={8}>
                    <TextInputWithEdit
                        initialValue={privatiseEmail(credentialsContext.user?.email) || ''}
                        onChange={(value) => console.log(value)}
                        editAction={() => console.log('Edit action')}
                    />
                </Grid.Col>
                <Grid.Col span={4} className={styles.row}>
                    <p className={styles.rowText}>Password</p>
                </Grid.Col>
                <Grid.Col span={8}>
                    <TextInputWithEdit
                        initialValue='*******************'
                        onChange={(value) => console.log(value)}
                        editAction={() => console.log('Edit action')}
                    />
                </Grid.Col>
            </Grid>
            <Button 
                color="yellow" 
                classNames={{root: styles.saveChangesBtn}} 
                disabled={username === credentialsContext.user?.username}
                onClick={() => changeLoggedUserUsernameMutation.mutate()}
            >
                Save changes
            </Button>
        </>
    )
}

export default AccountDetails;