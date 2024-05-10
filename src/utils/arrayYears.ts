export interface YearOption {
  value: string;
  label: string;
}

export const years: YearOption[] = [];

const startYear = 1900;
const endYear = new Date().getFullYear();

for (let year = startYear; year <= endYear; year++) {
  years.push({
    value: year.toString(),
    label: year.toString(),
  });
}