import "./style.css";
import { MultiSelect } from "@mantine/core";
import React, { CSSProperties } from "react";
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
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

  const combinedData = list.map((element) => ({
    value: element.id.toString(),
    label: element.name,
  }));

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    onChange(newValue);
  };

  const rightSectionStyles: CSSProperties = {
    width: 24,
    height: 24,
    color: dropdownOpened ? "#9854F6" : "#ACADB9",
    transform: `rotate(${dropdownOpened ? "180deg" : "0deg"})`,
    transition: "transform 0.3s ease, color 0.3s ease",
  };

  
  const RightSectionWithStyles = rightSection
  ? React.cloneElement(rightSection as React.ReactElement, { style: rightSectionStyles })
  : null;

  
  return (
    <MultiSelect
      className="multi-select"
      hiddenInputValuesDivider='*'
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
      styles={{
        pill: { 
          backgroundColor: 'red',
    

        },
        // Другие стили...
      }}
      onDropdownOpen={() => setDropdownOpened(true)}
      onDropdownClose={() => setDropdownOpened(false)}
      radius={8}
      rightSection={RightSectionWithStyles}
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
