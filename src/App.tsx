import { AppShell, Burger, Group, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Main from './Main';
import styles from './App.module.scss';
import 'primeicons/primeicons.css';
import CustomNavLink from './navbar/CustomNavLink';
import Login from './public/login/Login';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LanguageSelect from './public/language-select/LanguageSelect';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function CollapseDesktop() {
  const { t } = useTranslation('app');
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      bg={'#fefbed'}
    >
      <AppShell.Header bg={'var(--background)'} style={{borderBottom: '1px solid var(--primary)'}}>
        <Group h="100%" px="md" justify='space-between' className={styles.header}>
          <div className={styles.headerSection}>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <a href="/" className={styles.logoLink}>
              <img src="/logoIcon.png" alt='Logo Quizz World' className={styles.logo}/>
            </a>
          </div>
          <div className={`${styles.headerSection} ${styles.searchBarContainer}`}>
            <TextInput classNames={{
              root: styles.searchBar,
              input: styles.searchBarInput,
            }} 
            placeholder={`${t('search')}...`}
            ></TextInput>
          </div>
          <div className={styles.headerSection}>
            <LanguageSelect />
            <Login />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg={'var(--background)'} style={{borderRight: '1px solid var(--primary)'}}>
        <CustomNavLink
          href='/'
          label={t('home')}
          leftSection={<i className='pi pi-home'></i>}
        ></CustomNavLink>
        <CustomNavLink
          href='/quizz'
          label={t('quizzes')}
          leftSection={<i className='pi pi-question-circle'></i>}
        >
          <CustomNavLink
            href='/quizz/popular'
            label={t('popular')}
            leftSection={<i className='pi pi-star'></i>}
          ></CustomNavLink>
          <CustomNavLink
            href='/quizz/tv-shows'
            label={t('tvShows')}
            leftSection={<i className='pi pi-desktop'></i>}
          ></CustomNavLink>
          <CustomNavLink
            href='/quizz/music'
            label={t('music')}
            leftSection={<i className='pi pi-volume-up'></i>}
          ></CustomNavLink>
          <CustomNavLink
            href='/quizz/movies'
            label={t('movies')}
            leftSection={<i className='pi pi-ticket'></i>}
          ></CustomNavLink>
          <CustomNavLink
            href='/quizz/games'
            label={t('games')}
            leftSection={<i className='pi pi-prime'></i>}
          ></CustomNavLink>
          <CustomNavLink
            href='/quizz/trivia'
            label={t('trivia')}
            leftSection={<i className='pi pi-question'></i>}
          ></CustomNavLink>
          <CustomNavLink
            href='/quizz/books'
            label={t('books')}
            leftSection={<i className='pi pi-book'></i>}
          ></CustomNavLink>
          <CustomNavLink
            href='/quizz/other'
            label={t('other')}
            leftSection={<i className='pi pi-ellipsis-h'></i>}
          ></CustomNavLink>
        </CustomNavLink>
        <CustomNavLink
          href='/about'
          label={t('about')}
          leftSection={<i className='pi pi-info-circle'></i>}
        ></CustomNavLink>
        <CustomNavLink
          href='/contact'
          label={t('contact')}
          leftSection={<i className='pi pi-envelope'></i>}
        ></CustomNavLink>
      </AppShell.Navbar>
      <AppShell.Main style={{padding: 0}}>
        <Main />
      </AppShell.Main>
    </AppShell>
  );
}

export default CollapseDesktop;