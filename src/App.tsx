import { AppShell, Burger, Button, Group, Image, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Main from './Main';

function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
          <img src="/logoFull.png" alt='Logo Quizz World' height={'100%'}/>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg={'var(--background)'} style={{borderRight: '1px solid var(--primary)'}}>
        <Button color='var(--primary)' style={{fontFamily: 'Staatliches Regular', fontSize: '2rem', letterSpacing: '2px'}}>Navbar</Button>
      </AppShell.Navbar>
      <AppShell.Main>
        <Main />
      </AppShell.Main>
      <AppShell.Footer bg={'var(--background)'} style={{borderTop: '1px solid var(--primary)'}}>
        <Group h="100%" px="md">
          <Text size="xl" style={{fontFamily: 'Staatliches Regular', fontSize: '2rem', letterSpacing: '2px'}}>Footer</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}

export default CollapseDesktop;