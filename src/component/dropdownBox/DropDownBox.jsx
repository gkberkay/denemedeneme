import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppContext from '../core/AppContext';

export default function BasicSelect({ dropDownBoxStyle }) {
    const { appState, dispatchAppStateAction } = React.useContext(AppContext)
    const [age, setAge] = useState('')

    const handleChange = (event) => {
        dispatchAppStateAction({ type: "SET_MAIN_PAGE_SELECTED_DATE", payload: event.target.value })
        setAge(event.target.value)
    };

    return (
        <div style={dropDownBoxStyle}>
            <Box sx={{ minWidth: 120, maxWidth: 240 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tarih</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age || "daily"}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"daily"}>Bugün</MenuItem>
                        <MenuItem value={"yesterday"}>Dün</MenuItem>
                        <MenuItem value={"last7days"}>Son 7 Gün</MenuItem>
                        <MenuItem value={"last28days"}>Son 28 Gün</MenuItem>
                        <MenuItem value={"last90days"}>Son 90 Gün</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
}