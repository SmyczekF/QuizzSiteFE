import en from '../../shared/flags/gb-eng.svg';
import fr from '../../shared/flags/fr.svg';
import pl from '../../shared/flags/pl.svg';
import styles from './LanguageSelect.module.scss';
import { useTranslation } from 'react-i18next';

const DetermineFlag = () => {

    const { i18n } = useTranslation();

    return <img src={i18n.language === 'en' ? en : i18n.language === 'fr' ? fr : pl} alt='Flag' className={styles.flag}/>;
}

export default DetermineFlag;