import "./style.css";
import { Select } from "@mantine/core";

interface CustomSelectProps {
  label?: string;
  placeholder: string;
}
export default function CustomSelectComponent({
  label,
  placeholder,
}: CustomSelectProps) {
  const dataInput = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
      data={dataInput}
      radius={8}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
    />
  );
}
