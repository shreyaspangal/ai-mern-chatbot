import { TextField } from '@mui/material'

type Props = {
    name: string;
    type: string;
    label: string;
}

function CustomizedInput(props: Props) {
    return (
        <TextField
            margin='normal'
            name={props.name}
            label={props.label}
            type={props.type}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: "white", width: "400px", borderRadius: 10, fontSize: 20 } }}
        />
    )
}

export default CustomizedInput;