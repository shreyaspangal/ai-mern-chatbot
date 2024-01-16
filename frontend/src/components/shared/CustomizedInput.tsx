import { TextField } from '@mui/material'

type Props = {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
}

function CustomizedInput(props: Props) {
    return (
        // <TextField
        //     margin='normal'
        //     name={props.name}
        //     label={props.label}
        //     type={props.type}
        //     InputLabelProps={{ style: { color: 'white' } }}
        //     InputProps={{ style: { color: "white", width: "400px", borderRadius: 10, fontSize: 20 } }}
        // />

        <div className="relative">
            <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-[#05101c] px-1 text-xs font-medium text-gray-100"
            >
                {props.label}
            </label>
            <input
                type={props.type}
                name={props.name}
                id="name"
                className="block bg-inherit outline-0 w-full rounded-md border-0 px-3 py-2 
                text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={props.placeholder || props.name}
            />
        </div>
    )
}

export default CustomizedInput;