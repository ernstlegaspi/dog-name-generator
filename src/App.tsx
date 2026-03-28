import Header from "./components/Header";
import Body from "./components/body/Body";
import FilterNav from "./components/nav/FilterNav";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Header />
      <FilterNav />
      <Body />
    </div>
  );
}
