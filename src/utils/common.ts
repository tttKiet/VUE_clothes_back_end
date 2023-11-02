import moment from "moment";

export const expiryToISODate = (expiresIn: number): string => {
  const expiryDate = new Date(expiresIn * 1000);
  return moment(expiryDate).format("YYYY-MM-DD HH:mm:ss");
};
