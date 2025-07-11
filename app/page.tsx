import { SidebarNav } from "@/components/sidebar-nav";
import HomePage from "./(authenticated)/Home/page";

export default function Page() {
  return (
      <main>
        <SidebarNav /> 
        <HomePage />
      </main>
  );
}
