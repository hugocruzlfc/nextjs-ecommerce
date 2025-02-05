import { setProductQuantity } from "@/actions/set-product-quantity.action";
import { auth } from "@/auth";
import CartEntry from "@/components/CartEntry";
import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Your Cart - Flowmazon",
};

export default async function CartPage() {
  const cart = await getCart();
    const session = await auth()
  if (!session) return <div className="flex flex-col items-center text-center p-10"><h2 className="text-2xl">Not authorized</h2>
    <p>Please sign in.</p>
  </div>


  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
}