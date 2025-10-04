import { ToggleTheme } from "@/modules/common/components/toggle-theme";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center">Home page</h1>
      <ToggleTheme />
    </div>
  );
}