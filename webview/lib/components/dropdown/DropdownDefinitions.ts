type DropdownOption = {
    id?: any,
    label?: string,
    icon?: string,
    divider?: boolean,
    children?: DropdownOption[]
    disabled?: boolean,
    noPadding?: boolean,
    onClick?: GenericVoidFunction
}
export {DropdownOption}
