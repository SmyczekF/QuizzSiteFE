import { HoverCard, Text } from "@mantine/core";
import { ListOperationProps } from "../../quizzes.types";
import styles from './ListOperation.module.scss';
import { useDisclosure } from "@mantine/hooks";

const ListOperation = (props: ListOperationProps) => {
    
    const { target, text, openedContent } = props;
    const [opened, { close, open }] = useDisclosure(false);

    return (
        <HoverCard width={'fit-content'} position="bottom" shadow="md" openDelay={500} onClose={close} classNames={{
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
