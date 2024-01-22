import { Select } from "@mantine/core";
import { PageSizePickerProps } from "../quizzes.types";
import { useState } from "react";
import styles from '../QuizzList.module.scss';

const PageSizePicker = (props: PageSizePickerProps) => {
    
    const { pageSize, setPageSize } = props;
    const [pageSizeString, setPageSizeString] = useState<string>(pageSize.toString());

    const handlePagePickerChange = (value: string | null) => {
        if(!value) return null;
        setPageSize(+value);
        setPageSizeString(value);
    }

    return (
        <Select
            type="number"
            data={[
                {value: '10', label: '10'},
                {value: '20', label: '20'},
                {value: '30', label: '30'},
                {value: '40', label: '40'},
                {value: '50', label: '50'},
                {value: '60', label: '60'},
                {value: '70', label: '70'},
                {value: '80', label: '80'},
                {value: '90', label: '90'},
                {value: '100', label: '100'},
            ]}
            value={pageSizeString}
            onChange={handlePagePickerChange}
            label='Page size'
            size='sm'
            radius='sm'
            classNames={{
                label: styles.pageSizePickerLabel,
                root: styles.pageSizePickerRoot,
                input: styles.pageSizePickerInput,
            }}
            style={{width: 'fit-content'}}
        />
    )
}

export default PageSizePicker