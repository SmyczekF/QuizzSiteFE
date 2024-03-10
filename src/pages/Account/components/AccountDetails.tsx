import { Button, Grid, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { CredentialsContext } from "../../../shared/providers/credentialsProvider";
import TextInputWithEdit from "../../../shared/customInputs/TextInputWithEdit";
import styles from '../Account.module.scss';

const AccountDetails = () => {

    const credentialsContext = useContext(CredentialsContext);
    const [username, setUsername] = useState(credentialsContext.user?.username || '');
    
    const privatiseEmail = (email: string | undefined) => {
        if(!email) return ('');
        const [name, domain] = email.split('@');
        const stars = '*'.repeat(name.length - 2);
        return `${name[0]}${stars}${name[name.length - 1]}@${domain}`;
    }

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
                onClick={() => console.log('Save changes ', username)}
            >
                Save changes
            </Button>
        </>
    )
}

export default AccountDetails;