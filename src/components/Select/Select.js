import { FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import Selection from '@mui/material/Select'
import React, { useEffect, useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Select = ({ onChange, arr, placeholder, defaultValue = "" }) => {

    const [valueText, setValueText] = useState('')

    const handleChange = (event) => {
        let id = arr.filter(item => item.title === event.target.value)[0].id
        setValueText(event.target.value)
        onChange([id])
    }

    useEffect(() => {
        if (defaultValue.length && arr && !isNaN(defaultValue[0]))
            setValueText(arr.filter(item => item.id === Number(defaultValue[0]))[0].title)
    }, [defaultValue])

    return (
        <FormControl sx={{ width: '100%', mb: 2 }}>
            <Selection
                displayEmpty
                value={valueText}
                onChange={handleChange}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(value) => {
                    if (value.length === 0) {
                        return <span>{placeholder}</span>;
                    }

                    return value;
                }}
            >
                <MenuItem disabled value="">
                    <span>{placeholder}</span>
                </MenuItem>
                {arr.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item.title}
                    >
                        {item.title}
                    </MenuItem>
                ))}
            </Selection>
        </FormControl>
    );
};

export default Select;