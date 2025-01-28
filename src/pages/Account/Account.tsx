import { useContext, useState } from "react";
import styles from "./Account.module.scss";
import { CredentialsContext } from "../../shared/providers/credentialsProvider";
import { returnImage } from "../../shared/images/ImageReader";
import CustomNavLink from "../../navbar/CustomNavLink";
import AccountDetails from "./components/AccountDetails";
import { useParams } from "react-router-dom";
import { shownContent } from "./account.types";

const Account = () => {
  const credentialsContext = useContext(CredentialsContext);

  const userAvatar = returnImage(credentialsContext.user?.image);

  const { content } = useParams<{ content: shownContent }>();
  const [shownContentName, setShownContentName] = useState<shownContent>(
    content || shownContent.ACCOUNT_DETAILS
  );

  return (
    <div className={styles.view}>
      <div className={styles.header}>
        {userAvatar ? (
          <img
            src={userAvatar}
            alt="Author"
            className={styles.userIcon}
            style={{ padding: 0, borderRadius: "50%" }}
          />
        ) : (
          <i className={`pi pi-user ${styles.userIcon}`}></i>
        )}
        <h2 className={styles.title}>
          Welcome, {credentialsContext.user?.username}
        </h2>
      </div>
      <div className={styles.layout}>
        <div className={styles.menu}>
          <CustomNavLink
            href="/profile/account-details"
            onClick={() => setShownContentName(shownContent.ACCOUNT_DETAILS)}
            label="Account Details"
            leftSection={
              <i className="pi pi-user" style={{ fontSize: "1.5em" }} />
            }
          />
          <CustomNavLink
            href="/profile/qiuz-history"
            onClick={() => setShownContentName(shownContent.QUIZZ_HISTORY)}
            label="Quizz History"
            leftSection={
              <i className="pi pi-chart-bar" style={{ fontSize: "1.5em" }} />
            }
            disabled
          />
          <CustomNavLink
            href="/profile/create-quizz"
            onClick={() => setShownContentName(shownContent.CREATE_QUIZZ)}
            label="Create Quizz"
            leftSection={
              <i className="pi pi-plus" style={{ fontSize: "1.5em" }} />
            }
            disabled
          />
          <CustomNavLink
            href="/profile/my-quizzes"
            onClick={() => setShownContentName(shownContent.MY_QUIZZES)}
            label="My Quizzes"
            leftSection={
              <i className="pi pi-list" style={{ fontSize: "1.5em" }} />
            }
            disabled
          />
          <CustomNavLink
            href="/profile/statistics"
            onClick={() => setShownContentName(shownContent.STATISTICS)}
            label="Statistics"
            leftSection={
              <i className="pi pi-chart-line" style={{ fontSize: "1.5em" }} />
            }
            disabled
          />
        </div>
        <div className={styles.content}>
          {shownContentName === shownContent.ACCOUNT_DETAILS && (
            <AccountDetails />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
