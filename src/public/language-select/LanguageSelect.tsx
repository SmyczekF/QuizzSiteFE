import { Select } from "@mantine/core";
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelect.module.scss';
import DetermineFlag from "./DetermineFlag";

const LanguageSelect = () => {

    const { i18n, t } = useTranslation('languages');

    return (
        <Select
            value={i18n.language}
            onChange={(value) => i18n.changeLanguage(value || 'en')}
            placeholder={t('language')}
            defaultValue='en'
            data={[
                { value: 'en', label: 'English' },
                { value: 'fr', label: 'Français' },
                { value: 'pl', label: 'Polski' },
            ]}
            classNames={{
                input: styles.languageSelect,
                dropdown: styles.languageSelectDropdown,
                option: styles.languageSelectOption,
            }}
            rightSection={<DetermineFlag />}
            leftSectionWidth={0}
        />
    )
}

export default LanguageSelect;