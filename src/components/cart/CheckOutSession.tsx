import React, { useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShippingListType } from "@/interfaces/cart";
import { Loader } from "lucide-react";
import { checkoutType } from "@/app/_actions/cart.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartContext } from "@/providers/cart-provider";

export default function CheckOutSession({ cartId }: { cartId: string }) {
  const router = useRouter();
  const {handleCart} =useContext(CartContext)
  /************************************************************************ */
  // console.log(cartId, "cart id");

  const city = useRef<null | HTMLInputElement>(null);
  const details = useRef<null | HTMLInputElement>(null);
  const phone = useRef<null | HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<"stripe" | "cash">("cash"); // هنا نحدد نوع الدفع

  /************************************************************************ */
  async function checkOut() {
    try {
      setIsLoading(true);
      const shippingList: ShippingListType = {
        city: city?.current?.value as string,
        details: details?.current?.value as string,
        phone: phone?.current?.value as string,
      };

      const response = await checkoutType(cartId, shippingList, paymentType);

      // console.log(response, "Responseeee before Payment");

      if (paymentType === "stripe" && response.status === "success") {
        location.href = response.session.url;
      } else if (paymentType === "cash" && response.status === "success") {
        toast.success("Cash Order placed successfully!", {
          position: "top-center",
        });
        handleCart()
        router.push("/allorders"); // 🔹 نروح لصفحة الطلبات بعد نجاح الدفع
        // console.log(response, "Responseeee Cashhhhh");
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error, "Error From Checkout");
    } finally {
      setIsLoading(false);
    }
  }

  /************************************************************************ */
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-full mt-2">Proceed to Checkout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add Your Shipping Details</DialogTitle>
              <DialogDescription>
                Please, Enter Your Successful Details
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="city">City</Label>
                <Input ref={city} id="city" name="city" defaultValue="Cairo" />
              </Field>
              <Field>
                <Label htmlFor="details">Deatials</Label>
                <Input
                  ref={details}
                  id="details"
                  name="details"
                  defaultValue="Rod El-farag"
                />
              </Field>
              <Field>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  ref={phone}
                  id="phone"
                  name="phone"
                  defaultValue="01111293087"
                />
              </Field>
            </FieldGroup>

            {/* 🔹 اختيار طريقة الدفع */}
            <div className="flex gap-4 my-4">
              <Button
                variant={paymentType === "cash" ? "default" : "outline"}
                onClick={() => setPaymentType("cash")}
                type="button"
              >
                Cash
              </Button>
              <Button
                variant={paymentType === "stripe" ? "default" : "outline"}
                onClick={() => setPaymentType("stripe")}
                type="button"
              >
                Stripe
              </Button>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={isLoading} onClick={checkOut} type="submit">
                {isLoading && <Loader className="animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
