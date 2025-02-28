import { AppShell, Burger, Group, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Main from "./Main";
import styles from "./App.module.scss";
import "primeicons/primeicons.css";
import CustomNavLink from "./navbar/CustomNavLink";
import Login from "./public/login/Login";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./public/language-select/LanguageSelect";
import { useMediaQuery } from "react-responsive";
import { useCallback, useEffect, useRef } from "react";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function CollapseDesktop() {
  const { t } = useTranslation("app");
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop, close: closeDesktop }] =
    useDisclosure(false);
  const [searchBarVisible, { toggle: toggleSearchBar }] = useDisclosure(false);
  const isXS = useMediaQuery({ query: "(max-width: 450px)" });
  const mainRef = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        mainRef.current &&
        mainRef.current.contains(event.target as Node) &&
        desktopOpened
      ) {
        closeDesktop();
      }
    },
    [closeDesktop, desktopOpened]
  );

  const closeMenu = useCallback(() => {
    closeDesktop();
    closeMobile();
  }, [closeDesktop, closeMobile]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [desktopOpened, handleClickOutside]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      bg={"var(--background)"}
    >
      <AppShell.Header
        bg={"var(--background)"}
        style={{ borderBottom: "1px solid var(--primary)" }}
      >
        <Group
          h="100%"
          px="md"
          justify="space-between"
          className={styles.header}
          gap={"xs"}
          grow
        >
          <div
            className={styles.headerSection}
            style={isXS ? { display: searchBarVisible ? "none" : "flex" } : {}}
          >
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <a href="/" className={styles.logoLink}>
              <img
                src="/logoIcon.png"
                alt="Logo Quizz World"
                className={styles.logo}
              />
            </a>
          </div>
          <div
            className={`${styles.headerSectionMiddle} ${styles.searchBarContainer}`}
            style={isXS ? { maxWidth: searchBarVisible ? "100%" : "0px" } : {}}
          >
            <i
              className={`pi pi-arrow-left ${styles.disableSearch}`}
              onClick={toggleSearchBar}
              style={
                isXS
                  ? { display: searchBarVisible ? "flex" : "none" }
                  : { display: "none" }
              }
            ></i>
            <TextInput
              classNames={{
                root: styles.searchBar,
                input: styles.searchBarInput,
              }}
              styles={
                isXS
                  ? {
                      root: {
                        display: searchBarVisible ? "initial" : "none",
                      },
                    }
                  : {}
              }
              placeholder={`${t("search")}...`}
            ></TextInput>
          </div>
          <div
            className={styles.headerSectionRight}
            style={isXS ? { display: searchBarVisible ? "none" : "flex" } : {}}
          >
            <i
              className={`pi pi-search ${styles.searchIcon}`}
              onClick={toggleSearchBar}
            ></i>
            <LanguageSelect />
            <Login />
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        bg={"var(--background)"}
        style={{ borderRight: "1px solid var(--primary)" }}
      >
        <CustomNavLink
          href="/"
          label={t("home")}
          leftSection={<i className="pi pi-home"></i>}
          closeMenu={closeMenu}
        ></CustomNavLink>
        <CustomNavLink
          label={t("quizzes")}
          leftSection={<i className="pi pi-question-circle"></i>}
        >
          <CustomNavLink
            href="/quizz-list/popular"
            label={t("popular")}
            leftSection={<i className="pi pi-star"></i>}
            closeMenu={closeMenu}
          ></CustomNavLink>
          <CustomNavLink
            href="/quizz-list/tv-shows"
            label={t("tvShows")}
            leftSection={<i className="pi pi-desktop"></i>}
            closeMenu={closeMenu}
          ></CustomNavLink>
          <CustomNavLink
            href="/quizz-list/music"
            label={t("music")}
            leftSection={<i className="pi pi-volume-up"></i>}
            closeMenu={closeMenu}
          ></CustomNavLink>
          <CustomNavLink
            href="/quizz-list/movies"
            label={t("movies")}
            leftSection={<i className="pi pi-ticket"></i>}
            closeMenu={closeMenu}
          ></CustomNavLink>
          <CustomNavLink
            href="/quizz-list/games"
            label={t("games")}
            leftSection={<i className="pi pi-prime"></i>}
            closeMenu={closeMenu}
          ></CustomNavLink>
          <CustomNavLink
            href="/quizz-list/trivia"
            label={t("trivia")}
            leftSection={<i className="pi pi-question"></i>}
          ></CustomNavLink>
          <CustomNavLink
            href="/quizz-list/literature"
            label={t("literature")}
            leftSection={<i className="pi pi-book"></i>}
            closeMenu={closeMenu}
          ></CustomNavLink>
          <CustomNavLink
            href="/quizz-list/other"
            label={t("other")}
            leftSection={<i className="pi pi-ellipsis-h"></i>}
            closeMenu={closeMenu}
          ></CustomNavLink>
        </CustomNavLink>
        <CustomNavLink
          href="/about"
          label={t("about")}
          leftSection={<i className="pi pi-info-circle"></i>}
          closeMenu={closeMenu}
          disabled
        ></CustomNavLink>
        <CustomNavLink
          href="/contact"
          label={t("contact")}
          leftSection={<i className="pi pi-envelope"></i>}
          closeMenu={closeMenu}
          disabled
        ></CustomNavLink>
      </AppShell.Navbar>
      <AppShell.Main style={{ padding: 0 }} ref={mainRef}>
        <Main />
      </AppShell.Main>
    </AppShell>
  );
}

export default CollapseDesktop;
