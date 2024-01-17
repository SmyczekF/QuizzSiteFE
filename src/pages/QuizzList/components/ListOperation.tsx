import { HoverCard, Text } from "@mantine/core";
import { ListOperationProps } from "../quizzes.types";
import styles from '../QuizzList.module.scss';

const ListOperation = (props: ListOperationProps) => {
    
    const { target, text } = props;

    return (
        <HoverCard width={100} shadow="md" openDelay={500} closeDelay={0} classNames={{
            dropdown: styles.listOperationDropdown,
        }}>
            <HoverCard.Target>
                {target}
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Text className={styles.listOperationDropdownText}>
                    {text}
                </Text>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}

export default ListOperation;
