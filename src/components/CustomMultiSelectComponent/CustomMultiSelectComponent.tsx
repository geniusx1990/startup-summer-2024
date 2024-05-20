import "./style.css";
import { MultiSelect } from "@mantine/core";
import { ReactNode, useState } from "react";

interface ListItem {
  id: number;
  name: string;
}

interface SelectProps<T extends ListItem> {
  list: T[];
  placeholder: string;
  label: string;
  rightSection?: ReactNode; 
  onChange: (value: string[]) => void;
}

export default function CustomMultiSelectComponent<T extends ListItem>({
  list,
  placeholder,
  label,
  rightSection,
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
      className="multi-select"
      placeholder={placeholder}
      classNames={{
        label: "custom-label",
        input: "custom-input",
        wrapper: "custom-wrapper",
        section: "custom-section",
        pill: "custom-pil",
        option: "custom-option",
        dropdown: "custom-dropdown",
      }}
      radius={8}
      rightSection={rightSection}
      label={label}
      data={combinedData}
      value={value}
      onChange={handleChange}
      clearable
      comboboxProps={{
        dropdownPadding: 4,
        transitionProps: {
          transition: "pop",
          duration: 200,
        },
      }}
    />
  );
}
