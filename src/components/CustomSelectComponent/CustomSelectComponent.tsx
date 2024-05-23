import { CSSProperties, ReactNode, useState } from "react";
import "./style.css";
import { ComboboxItem, Select } from "@mantine/core";
import { OptionInterface } from "../../utils/types";
import React from "react";

interface CustomSelectProps {
  label?: string;
  defaultValue?: OptionInterface;
  placeholder?: string;
  rightSection?: ReactNode;
  arrayInput: OptionInterface[];
  onChange: (_value: string | null) => void;
}
export default function CustomSelectComponent({
  label,
  placeholder,
  arrayInput,
  defaultValue,
  rightSection,
  onChange,
}: CustomSelectProps) {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

  const [value, setValue] = useState<ComboboxItem | null>({
    label: "Most Popular",
    value: "popularity.desc",
  });

  const rightSectionStyles: CSSProperties = {
    width: 24,
    height: 24,
    color: dropdownOpened ? "#9854F6" : "#ACADB9",
    transform: `rotate(${dropdownOpened ? "180deg" : "0deg"})`,
    transition: "transform 0.3s ease, color 0.3s ease",
  };


  const handleChange = (_value: string | null, option: ComboboxItem | null) => {
    setValue(option as OptionInterface);
    onChange(_value);
  };

  const RightSectionWithStyles = rightSection
  ? React.cloneElement(rightSection as React.ReactElement, { style: rightSectionStyles })
  : null;


  return (
    <Select
      className="filter-select"
      classNames={{
        label: "custom-label",
        input: "custom-input",
        wrapper: "custom-wrapper",
        section: "custom-section",
        option: "custom-option",
      }}
      onDropdownOpen={() => setDropdownOpened(true)}
      onDropdownClose={() => setDropdownOpened(false)}
      withCheckIcon={false}
      rightSection={RightSectionWithStyles}
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
