import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartButton from "./ShopingCartButton";
import { getCart } from "@/lib/cart";
import { searchProducts } from "@/actions/search-products.action";
import UserMenuButton from "./UserMenuButton";
import { auth } from "@/auth";


export default async function Navbar() {
  const session = await auth();
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input-bordered input w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}