import { useDisclosure } from '@mantine/hooks';
import { Popover, Text, Button, Grid, Radio } from '@mantine/core';
import { SortProps } from '../../../quizzes.types';
import styles from '../ListOperation.module.scss';
import { useState } from 'react';
import { ESortType } from './sort.types';

const Sort = (props: SortProps) => {

    const [value, setValue] = useState<ESortType>(ESortType.NEWEST); 
    const { target } = props;

    const handleSort = (value: string) => {
        setValue(value as ESortType);
    }

    return (
        <Popover width={200} position="bottom" withArrow={false} shadow="md" classNames={{
            dropdown: styles.listOperationDropdown,
        }}>
        <Popover.Target>
            { target }
        </Popover.Target>
        <Popover.Dropdown>
            <Text className={styles.listOperationDropdownPopoverTitle}>Sort from</Text>
            <Radio.Group
                value={value}
                onChange={handleSort}
                name="favoriteFramework"
                withAsterisk
                >
                    <Radio size="lg" value={ESortType.NEWEST} label="newest" color='yellow' classNames={{label: styles.radioLabel, body: styles.radioBody}}/>
                    <Radio size="lg" value={ESortType.OLDEST} label="oldest" color='yellow' classNames={{label: styles.radioLabel, body: styles.radioBody}}/>
                    <Radio size="lg" value={ESortType.MOST_POPULAR} label="most popular" color='yellow' classNames={{label: styles.radioLabel, body: styles.radioBody}}/>
                    <Radio size="lg" value={ESortType.LEAST_POPULAR} label="least popular" color='yellow' classNames={{label: styles.radioLabel, body: styles.radioBody}}/>
                    <Radio size="lg" value={ESortType.MOST_LIKED} label="most liked" color='yellow' classNames={{label: styles.radioLabel, body: styles.radioBody}}/>
                    <Radio size="lg" value={ESortType.LEAST_LIKED} label="least liked" color='yellow' classNames={{label: styles.radioLabel, body: styles.radioBody}}/>
            </Radio.Group>


        </Popover.Dropdown>
        </Popover>
    );
}

export default Sort