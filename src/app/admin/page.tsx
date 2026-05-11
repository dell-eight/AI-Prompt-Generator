import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  redirect("/dashboard/admin");
}
