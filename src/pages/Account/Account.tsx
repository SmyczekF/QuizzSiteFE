import { useContext } from 'react';
import styles from './Account.module.scss';
import { CredentialsContext } from '../../shared/providers/credentialsProvider';
import { returnImage } from '../../shared/images/ImageReader';

const Account = () => {

    const credentialsContext = useContext(CredentialsContext);
    
    const userAvatar = returnImage(credentialsContext.user?.image);

    return (
        <div className={styles.view}>
            <div className={styles.header}>
                {
                    userAvatar
                    ? <img src={userAvatar} alt="Author" className={styles.userIcon} style={{padding: 0, borderRadius: '50%'}}/>
                    : <i className={`pi pi-user ${styles.userIcon}`}></i>
                }
                <h2 className={styles.title}>Welcome, {credentialsContext.user?.username}</h2>
            </div>
        </div>
    );
}

export default Account;