import "./style.css";
import { MultiSelect } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

interface ListItem {
  id: number;
  name: string;
}

interface SelectProps<T extends ListItem> {
  list: T[];
  placeholder: string;
  label: string;
  onChange: (value: string[]) => void; 
}

export default function CustomMultiSelectComponent<T extends ListItem>({
  list,
  placeholder,
  label,
  onChange,
}: SelectProps<T>) {
  const [value, setValue] = useState<string[]>([]);

  const combinedData = list.map((element) => ({
    value: element.id.toString(),
    label: element.name,
  }));

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    onChange(newValue);
};


  return (
    <MultiSelect
      placeholder={placeholder}
      classNames={{
        label: "custom-label",
        input: "custom-input",
        wrapper: "custom-wrapper",
      }}
      radius={8}
      rightSection={
        <IconChevronDown style={{ width: 24, height: 24, color: "#ACADB9" }} />
      }
      label={label}
      data={combinedData}
      value={value}
      onChange={handleChange}
      hidePickedOptions
    />
  );
}
