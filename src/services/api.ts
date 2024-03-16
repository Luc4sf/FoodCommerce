const dbUrl = process.env.REACT_APP_DB_BASE_URL;

const snacks = fetch(`${dbUrl}`)
  .then((response) => response.json())
  .then((result) => {
    return result.snacks;
  });

export const getBurgers = async () => {
  const snackList = await snacks;
  return snackList.filter((n: { snack: string }) => n.snack == "burger" && n);
};

export const getPizzas = async () => {
  const snackList = await snacks;
  return snackList.filter((n: { snack: string }) => n.snack == "pizza" && n);
};

export const getDrinks = async () => {
  const snackList = await snacks;
  return snackList.filter((n: { snack: string }) => n.snack == "drink" && n);
};

export const getDesserts = async () => {
  const snackList = await snacks;
  return snackList.filter((n: { snack: string }) => n.snack == "dessert" && n);
};
