import { Button } from "@mantine/core";
import styles from '../Quizz.module.scss';
import { ReplayButtonProps } from "../quizz.types";

const ReplayButton = (props: ReplayButtonProps) => {
    return(
        <Button 
            size="lg" 
            color='transparent' 
            classNames={{root: styles.quizzSectionButtonRoot, label: styles.quizzSectionButtonLabel}}
            onClick={props.onClick}
            >
                <h4 className={styles.quizzSectionButtonText}>Replay</h4>
                <i className={`pi pi-replay ${styles.quizzSectionButtonIcon}`}></i>
        </Button>
    )
}

export default ReplayButton;