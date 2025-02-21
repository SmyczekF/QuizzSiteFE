import { useCallback, useContext, useEffect } from "react";
import styles from "./Account.module.scss";
import { CredentialsContext } from "../../shared/providers/credentialsProvider";
import { returnImage } from "../../shared/images/ImageReader";
import CustomNavLink from "../../navbar/CustomNavLink";
import AccountDetails from "./components/AccountDetails";
import { useNavigate, useParams } from "react-router-dom";
import { shownContent } from "./account.types";
import CreateQuiz from "./components/create-quiz/CreateQuiz";

const Account = () => {
  const credentialsContext = useContext(CredentialsContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!credentialsContext.user) {
      navigate("/");
    }
  }, [credentialsContext, navigate]);

  const userAvatar = returnImage(credentialsContext.user?.image);

  const { content } = useParams<{ content: shownContent }>();

  const renderContent = useCallback(() => {
    switch (content) {
      case shownContent.ACCOUNT_DETAILS:
        return <AccountDetails />;
      case shownContent.CREATE_QUIZZ:
        return <CreateQuiz />;
      default:
        return <AccountDetails />;
    }
  }, [content]);

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
            label="Account Details"
            leftSection={
              <i className="pi pi-user" style={{ fontSize: "1.5em" }} />
            }
          />
          <CustomNavLink
            href="/profile/qiuz-history"
            label="Quizz History"
            leftSection={
              <i className="pi pi-chart-bar" style={{ fontSize: "1.5em" }} />
            }
            disabled
          />
          <CustomNavLink
            href="/profile/create-quizz"
            label="Create Quizz"
            leftSection={
              <i className="pi pi-plus" style={{ fontSize: "1.5em" }} />
            }
          />
          <CustomNavLink
            href="/profile/my-quizzes"
            label="My Quizzes"
            leftSection={
              <i className="pi pi-list" style={{ fontSize: "1.5em" }} />
            }
            disabled
          />
          <CustomNavLink
            href="/profile/statistics"
            label="Statistics"
            leftSection={
              <i className="pi pi-chart-line" style={{ fontSize: "1.5em" }} />
            }
            disabled
          />
        </div>
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Account;
