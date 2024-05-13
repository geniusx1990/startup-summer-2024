import { useState } from "react";
import "./style.css";
import { ComboboxItem, Select } from "@mantine/core";
import { OptionInterface } from "../../utils/types";

interface CustomSelectProps {
  label?: string;
  defaultValue?: OptionInterface;
  placeholder?: string;
  arrayInput: OptionInterface[];
  onChange: (_value: string | null) => void;
}
export default function CustomSelectComponent({
  label,
  placeholder,
  arrayInput,
  defaultValue,
  onChange,
}: CustomSelectProps) {
  const [value, setValue] = useState<ComboboxItem | null>({
    label: "Most Popular",
    value: "popularity.desc",
  });

  const handleChange = (_value: string | null, option: ComboboxItem | null) => {
    setValue(option as OptionInterface);
    onChange(_value);
  };

  return (
    <Select
      className="filter-select"
      classNames={{
        label: "custom-label",
        input: "custom-input",
        wrapper: "custom-wrapper",
        section: "custom-section",
        option: "custom-option"
      }}
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
      data={arrayInput}
      defaultValue={defaultValue?.label}
      radius={8}
      value={value ? value.value : null}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
    />
  );
}
