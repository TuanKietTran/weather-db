type SelectOption = {
  label: string
  value: string
}

type SelectProps = {
  className? : string,
  id?: string
  items: SelectOption[]
  
}

export default function Select({className, id = "id", items, onChange} : SelectProps) {

  return (

  )
}