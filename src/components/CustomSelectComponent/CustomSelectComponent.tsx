import { useState } from "react";
import "./style.css";
import { ComboboxItem, Select } from "@mantine/core";

interface CustomSelectProps {
  label?: string;
  placeholder: string;
  onChange: (_value: string | null) => void;
}
export default function CustomSelectComponent({
  label,
  placeholder,
  onChange
}: CustomSelectProps) {
  const [value, setValue] = useState<ComboboxItem | null>(null);

  const handleChange = (_value: string | null, option: ComboboxItem | null) => {
    setValue(option);
    onChange(_value);

  };

  const dataInput = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
    (value) => ({
      value,
      label: value,
    })
  );

  return (
    <Select
      className="filter-select"
      classNames={{
        label: "custom-label",
        input: "custom-input",
        wrapper: "custom-wrapper",
        section: "custom-section",
      }}
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
      data={dataInput}
      radius={8}
      value={value ? value.value : null}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
    />
  );
}
