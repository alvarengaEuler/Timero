// utils/colors.ts

// Utility function to determine the best contrast color (black or white)
const getContrastColor = (hexColor: string) => {
  // Convert hex color to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate brightness (formula that approximates human perception)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? '#000000' : '#FFFFFF';
};

// List of colors you want to display
export const colorsWithContrast = [
  '#e74c3c', '#1abc9c', '#3498db', '#f1c40f', '#9b59b6', '#34495e', '#e67e22', '#2980b9', '#2ecc71',
].map((color) => ({
  color,
  contrastColor: getContrastColor(color),
}));
