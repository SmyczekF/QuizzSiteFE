import { AppShell, Burger, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Main from './Main';
import styles from './App.module.scss';

function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      bg={'#fefbed'}
    >
      <AppShell.Header bg={'var(--background)'} style={{borderBottom: '1px solid var(--primary)'}}>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <img src="/logoIcon.png" alt='Logo Quizz World' className={styles.logo}/>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg={'var(--background)'} style={{borderRight: '1px solid var(--primary)'}}>
        <Button color='var(--primary)' style={{fontFamily: 'Staatliches Regular', fontSize: '2rem', letterSpacing: '2px'}}>Navbar</Button>
      </AppShell.Navbar>
      <AppShell.Main style={{padding: 0}}>
        <Main />
      </AppShell.Main>
    </AppShell>
  );
}

export default CollapseDesktop;