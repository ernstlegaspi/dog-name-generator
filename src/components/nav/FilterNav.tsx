import { useState } from "react";
import categoriesData from "../../constants/categories.json";
import FilterSubcategoriesSection from "./FilterSubcategoriesSection";

const categoryNameById = new Map(
  categoriesData.data.map((category) => [category.id, category.name]),
);

const filterGroups = categoriesData.filterGroups.map((group) => ({
  ...group,
  categories: group.categoryIds
    .map((categoryId) => {
      const categoryName = categoryNameById.get(categoryId);

      if (!categoryName) {
        return null;
      }

      return {
        id: categoryId,
        name: categoryName,
      };
    })
    .filter((category): category is { id: string; name: string } => category !== null),
}));

function ChevronDownIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={[
        "h-4 w-4 text-brand-red transition-transform",
        isActive ? "rotate-180" : "",
      ].join(" ")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FilterNav() {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  function toggleCategory(categoryId: string) {
    setSelectedCategoryIds((currentSelection) => {
      if (currentSelection.includes(categoryId)) {
        return currentSelection.filter((id) => id !== categoryId);
      }

      return [...currentSelection, categoryId];
    });
  }

  const activeGroup = filterGroups.find((group) => group.id === activeOption) ?? null;

  return (
    <>
      <nav className="bg-white relative h-18 px-6 text-brand-text before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-brand-border after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand-border">
        <div className="no-scrollbar relative z-10 h-full overflow-x-auto overflow-y-hidden">
          <div className="mx-auto flex h-full min-w-max items-stretch justify-center gap-x-5 px-6">
            <span className="flex h-full shrink-0 items-center text-[16px] font-medium">
              Filters:
            </span>

            <div className="flex h-full self-stretch items-center gap-x-5 border-x border-brand-border">
              {filterGroups.map((group) => {
                const isActive = activeOption === group.id;

                return (
                  <button
                    key={group.id}
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActiveOption(isActive ? null : group.id)}
                    className={[
                      "relative inline-flex h-full shrink-0 cursor-pointer items-center gap-2 border-b-2 border-l border-r border-t px-4 text-[16px] font-light text-brand-text transition-colors",
                      isActive
                        ? "z-20 border-b-white border-l-brand-red border-r-brand-red border-t-brand-red bg-white after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-white after:content-['']"
                        : "border-transparent bg-transparent",
                    ].join(" ")}
                  >
                    <span>{group.label}</span>
                    <ChevronDownIcon isActive={isActive} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {activeGroup ? (
        <FilterSubcategoriesSection
          categories={activeGroup.categories}
          selectedCategoryIds={selectedCategoryIds}
          onToggleCategory={toggleCategory}
        />
      ) : null}
    </>
  );
}
