export const formatIndianPrice = (value) => {
  if (!value) return "";

  const numeric = value.replace(/\D/g, "");

  return new Intl.NumberFormat("en-IN").format(
    Number(numeric)
  );
};