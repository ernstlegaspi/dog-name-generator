import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/body/Body";
import FilterNav from "./components/nav/FilterNav";

export default function App() {
  const [activeGender, setActiveGender] = useState<"male" | "female" | "both">(
    "male",
  );
  const [activeFilterGroupId, setActiveFilterGroupId] = useState<string | null>(
    null,
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  function toggleCategory(categoryId: string) {
    setSelectedCategoryIds((currentSelection) => {
      if (currentSelection.includes(categoryId)) {
        return currentSelection.filter((id) => id !== categoryId);
      }

      return [...currentSelection, categoryId];
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Header
        activeGender={activeGender}
        onGenderChange={setActiveGender}
      />
      <FilterNav
        activeOption={activeFilterGroupId}
        onActiveOptionChange={setActiveFilterGroupId}
        selectedCategoryIds={selectedCategoryIds}
        onToggleCategory={toggleCategory}
      />
      <Body
        selectedGender={activeGender}
        activeFilterGroupId={activeFilterGroupId}
        selectedCategoryIds={selectedCategoryIds}
      />
    </div>
  );
}
