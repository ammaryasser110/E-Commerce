// Maping
export function getIconColor(rating) {
  if (rating > 4) return "green";
  else if (rating > 3) return "#00b800";
  else if (rating > 2) return "#00dd00";
  else "#00ff00";
}
