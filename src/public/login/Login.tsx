import { Button, Flex, Group, Modal, PasswordInput, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import "primeicons/primeicons.css";
import styles from './Login.module.scss';
import { useDisclosure } from "@mantine/hooks";

const Login = () => {

    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: { login: '', password: '' },
        
        validate: {
            login: (value) => (/^\w{3,}$/.test(value) ? null : 'Username is too short'),
            password: (value) => {
                if(!(/^.{8,}$/.test(value))) return 'Password is too short';
                if(!(/[a-z]/.test(value))) return 'Password must contain at least one lowercase letter';
                if(!(/[A-Z]/.test(value))) return 'Password must contain at least one uppercase letter';
                if(!(/[0-9]/.test(value))) return 'Password must contain at least one number';
                return null;
            },
        },
    });

    return (
        <>
            <Modal opened={opened} onClose={close} classNames={{root: styles.loginModal}}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Text classNames={{root: styles.loginLabel}}>Login</Text>
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
                        <Text size="sm" classNames={{root: styles.orLogin}}>Or login with</Text>
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
                        <Text size="sm">Forgot password?</Text>
                        <Text size="sm">Don't have an account? Sign up!</Text>
                    </Flex>
                </form>
            </Modal>
            <Button color="yellow" onClick={open}>
                Login
            </Button>
        </>
    )
}

export default Login;