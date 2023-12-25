import { Button, Flex, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import styles from '../Login.module.scss';

interface LoginFormProps {
    onNoAccountClick: () => void;
}

const LoginForm = (props: LoginFormProps) => {

    const { onNoAccountClick } = props;

    const form = useForm({
        initialValues: { login: '', password: '' },
        
        validate: {
            login: (value) => (/^\w{3,}$/.test(value) ? null : 'Username is too short'),
        },
    });

    return(
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Text classNames={{root: styles.label}}>Login</Text>
                    <Flex direction={'column'} gap={'20px'}>
                        <TextInput
                            required
                            placeholder="Username"
                            leftSection={<i className='pi pi-user'></i>}
                            {...form.getInputProps('login')}
                        />
                        <PasswordInput
                            required
                            placeholder="Password"
                            type="password"
                            leftSection={<i className='pi pi-lock'></i>}
                            {...form.getInputProps('password')}
                        />
                        <Button type="submit" color="yellow">
                            Login
                        </Button>
                        <Text size="sm" classNames={{root: styles.orHyperLink}}>Or login with</Text>
                        <Group justify="center" grow>
                            <Button color="blue">
                                <i className='pi pi-facebook'></i>
                            </Button>
                            <Button color="blue">
                                <i className="pi pi-twitter"></i>
                            </Button>
                            <Button color="red">
                                <i className="pi pi-google"></i>
                            </Button>
                        </Group>
                    </Flex>
                    <Flex justify={'space-between'} direction={'column'} m={'20 0 0 0'}>
                        <Text className={styles.hyperlink}>Forgot password?</Text>
                        <Text className={styles.hyperlink} onClick={onNoAccountClick}>Don't have an account? Sign up!</Text>
                    </Flex>
                </form>
    )
}

export default LoginForm;