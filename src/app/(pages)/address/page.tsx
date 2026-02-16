"use client";
import React, { useEffect, useRef, useState } from "react";

import { ProfileI } from "@/interfaces/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  addAddress,
  getLoggedUserAddress,
  removeUserAddress,
} from "@/app/_actions/profile.action";

export default function Address() {
  const city = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDeleteIds, setLoadingDeleteIds] = useState<string[]>([]);
  const [address, setAddress] = useState<ProfileI[]>([]);
  const [loadingPage, setLoadingPage] = useState(true); // Loader أول ما الصفحة تتحمل

  // إضافة عنوان جديد
  async function addAddressUser(e: React.FormEvent) {
    e.preventDefault();
    setLoadingAdd(true);
    try {
      const profile: ProfileI = {
        city: city.current?.value || "",
        name: name.current?.value || "",
        details: details.current?.value || "",
        phone: phone.current?.value || "",
      };
      const res = await addAddress(profile);
      fetchLoggedUserAddress();
      if (res.status === "success") {
        toast.success(res.message, { position: "top-center" });
        name.current!.value = "";
        details.current!.value = "";
        phone.current!.value = "";
        city.current!.value = "";
      }
    } catch (error) {
      console.log(error, "Error From Address User");
      toast.error("Address Not Added", { position: "top-center" });
    } finally {
      setLoadingAdd(false);
    }
  }

  // جلب عناوين المستخدم
  async function fetchLoggedUserAddress() {
    try {
      const { data } = await getLoggedUserAddress();
      setAddress(data);
    } catch (error) {
      console.log(error, "Error To Fetch Logged User Address");
      toast.error("Failed to fetch addresses", { position: "top-center" });
    } finally {
      setLoadingPage(false);
    }
  }

  // حذف عنوان محدد
  async function removeAddress(id: string) {
    setLoadingDeleteIds((prev) => [...prev, id]); // add ID to loading
    try {
      const res = await removeUserAddress(id);
      fetchLoggedUserAddress();
      if (res.status === "success") {
        toast.success(res.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error, "Not Able to Delete User");
      toast.error("Failed to delete address", { position: "top-center" });
    } finally {
      setLoadingDeleteIds((prev) => prev.filter((item) => item !== id)); // remove ID
    }
  }

  useEffect(() => {
    fetchLoggedUserAddress();
  }, []);

  if (loadingPage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-4xl font-bold">ShopMart</p>
        <Loader className="animate-spin w-10 h-10 text-black" />
      </div>
    );
  }

  return (
    <main className="py-7">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Form + Button */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-black text-white"
          >
            {showForm ? "Hide Form" : "Add Address"}
          </Button>

          {showForm && (
            <form
              onSubmit={addAddressUser}
              className="flex flex-col space-y-3 p-4 border rounded-md shadow-sm bg-white h-auto"
            >
              <h2 className="text-lg font-semibold mb-3">Add New Address</h2>

              <Input
                ref={name}
                placeholder="Address Name"
                className="w-full"
                required
              />
              <Input
                ref={details}
                placeholder="Details"
                className="w-full"
                required
              />
              <Input
                ref={phone}
                type="tel"
                placeholder="Phone"
                className="w-full"
                required
                pattern="^\+?\d{10,15}$"
                title="Please enter a valid phone number (10-15 digits, optional +)"
              />
              <Input
                ref={city}
                placeholder="City"
                className="w-full"
                required
              />

              <Button
                disabled={loadingAdd}
                type="submit"
                className="bg-black text-white w-full flex justify-center items-center gap-2"
              >
                Add Address
                {loadingAdd && <Loader2 className="animate-spin w-4 h-4" />}
              </Button>
            </form>
          )}
        </div>

        {/* Right Column: Addresses List */}
        <div className="w-full lg:w-2/3">
          <div className="space-y-3 mt-6">
            {address.length === 0 && (
              <p className="text-gray-500 text-center">No addresses found.</p>
            )}
            {address.map((addr) => {
              const isDeleting = loadingDeleteIds.includes(addr._id!);
              return (
                <div
                  key={addr._id}
                  className="border p-3 rounded flex justify-between items-start bg-white relative"
                >
                  {/* Overlay عند الحذف */}
                  {isDeleting && (
                    <div className="absolute inset-0 bg-white/70 flex justify-center items-center rounded">
                      <Loader2 className="animate-spin w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-black">{addr.name}</p>
                    <p>{addr.details}</p>
                    <p>{addr.city}</p>
                    <p className="text-gray-500">{addr.phone}</p>
                  </div>

                  <Button
                    onClick={() => removeAddress(addr._id!)}
                    className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
