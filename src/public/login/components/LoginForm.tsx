import { Button, Flex, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import styles from '../Login.module.scss';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

interface LoginValues {
    username: string;
    password: string;
}
interface LoginFormProps {
    onNoAccountClick: () => void;
    closeModal: () => void;
}

const LoginForm = (props: LoginFormProps) => {

    const { onNoAccountClick, closeModal } = props;

    const form = useForm({
        initialValues: { username: '', password: '' },
        
        validate: {
            username: (value) => (/^\w{3,}$/.test(value) ? null : 'Username is too short'),
        },
    });

    const loginMutation = useMutation({
        mutationFn: (values: LoginValues) => {
            return axios.post(`/auth/login`, values)
        },
        onSuccess: (data) => {
            notifications.show({
                title: 'Success',
                message: 'You have logged in successfully',
                color: 'teal',
                icon: <i className="pi pi-check"></i>,
                autoClose: 2000,
                classNames: {description: styles.notification, title: styles.notification}
            });
            closeModal();
        },
        onError: (error) => {
            notifications.show({
                title: 'Error',
                message: 'Incorrect username or password',
                color: 'red',
                icon: <i className="pi pi-times"></i>,
                autoClose: 2500,
                classNames: {description: styles.notification, title: styles.notification}
            });
        }
    });

    return(
        <form onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}>
                    <Text classNames={{root: styles.label}}>Login</Text>
                    <Flex direction={'column'} gap={'20px'}>
                        <TextInput
                            required
                            placeholder="Username"
                            leftSection={<i className='pi pi-user'></i>}
                            {...form.getInputProps('username')}
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