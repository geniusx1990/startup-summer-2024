export interface YearOption {
  id: number;
  name: string;
}

export const years: YearOption[] = [];

const startYear = 1900;
const endYear = new Date().getFullYear();

for (let year = startYear; year <= endYear; year++) {
  years.push({
    id: year,
    name: year.toString(),
  });
}