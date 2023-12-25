import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import styles from '../Register.module.scss';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { RegisterProps } from '../Register';
import { notifications } from '@mantine/notifications';

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormProps extends RegisterProps {
    onRegistered: () => void;
    setEmail: (email: string) => void;
}

const RegisterForm = (props: RegisterFormProps) => {

    const { onAccountClick, onRegistered, setEmail } = props;

    const registerMutation = useMutation({
        mutationFn: (values: RegisterFormData) => {
            return axios.post(`/auth/register`, values)
        },
        onSuccess: (data) => {
            notifications.show({
                title: 'Success',
                message: 'You have registered successfully',
                color: 'teal',
                icon: <i className="pi pi-check"></i>,
                autoClose: 2500,
                classNames: {description: styles.notification, title: styles.notification}
            });
            setEmail(data.data.email);
            onRegistered();
        },
        onError: (error) => {
            notifications.show({
                title: 'Error',
                message: 'This username or email is already taken',
                color: 'red',
                icon: <i className="pi pi-times"></i>,
                autoClose: 2500,
                classNames: {description: styles.notification, title: styles.notification}
            });
        }
    });

    const form: UseFormReturnType<RegisterFormData> = useForm({
        initialValues: { username: '', email: '', password: '', confirmPassword: ''},
        
        validate: {
            username: (value) => (/^\w{3,}$/.test(value) ? null : 'Username is too short'),
            password: (value) => {
                if(!(/^.{8,}$/.test(value))) return 'Password is too short';
                if(!(/[a-z]/.test(value))) return 'Password must contain at least one lowercase letter';
                if(!(/[A-Z]/.test(value))) return 'Password must contain at least one uppercase letter';
                if(!(/[0-9]/.test(value))) return 'Password must contain at least one number';
                return null;
            },
            email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Email is incorrect'),
            confirmPassword: (value) => (value === form.values.password ? null : 'Passwords do not match'),
        },
    });

    return(
        <form onSubmit={form.onSubmit((values: RegisterFormData) => registerMutation.mutate(values))}>
            <Text classNames={{root: styles.label}}>Register</Text>
            <Flex direction={'column'} gap={'20px'}>
                <TextInput
                    required
                    placeholder="Username"
                    leftSection={<i className='pi pi-user'></i>}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    required
                    placeholder="Email"
                    leftSection={<i className='pi pi-envelope'></i>}
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    required
                    placeholder="Password"
                    type="password"
                    leftSection={<i className='pi pi-lock'></i>}
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    required
                    placeholder="Confirm password"
                    type="password"
                    leftSection={<i className='pi pi-lock'></i>}
                    {...form.getInputProps('confirmPassword')}
                />
                <Button type="submit" color="yellow">
                    Register
                </Button>
            </Flex>
            <Flex justify={'space-between'} direction={'column'} m={'20 0 0 0'}>
                <Text className={styles.hyperlink} onClick={onAccountClick}>Already have an account? Log in!</Text>
            </Flex>
        </form>
    )
}

export default RegisterForm;