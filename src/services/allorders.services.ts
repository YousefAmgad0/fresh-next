export async function GetUserOrders(userID: string) {
  const resposne =
    await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}
`);
  const data = await resposne.json();
  return data;
}
