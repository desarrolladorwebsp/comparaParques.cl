export interface ComparisonPoint {
  id: string;
  text: string;
}

export interface ComparisonColumn {
  id: string;
  label: string;
  tone: "traditional" | "preferred";
  points: ComparisonPoint[];
}
