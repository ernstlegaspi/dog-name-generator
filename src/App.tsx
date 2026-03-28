import Body from "./components/Body";
import Header from "./components/Header";
import FilterNav from "./components/FilterNav";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Header />
      <FilterNav />
      <Body />
    </div>
  );
}
