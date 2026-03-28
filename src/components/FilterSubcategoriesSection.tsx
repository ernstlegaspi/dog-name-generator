type FilterSubcategoriesSectionProps = {
  categories: Array<{
    id: string;
    name: string;
  }>;
  selectedCategoryIds: string[];
  onToggleCategory: (categoryId: string) => void;
};

export default function FilterSubcategoriesSection({
  categories,
  selectedCategoryIds,
  onToggleCategory,
}: FilterSubcategoriesSectionProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-6 text-brand-text">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-4 px-6">
        {categories.map((category) => {
          const isSelected = selectedCategoryIds.includes(category.id);

          return (
            <label
              key={category.id}
              className="inline-flex cursor-pointer items-center gap-3 text-[16px] font-light text-brand-text"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleCategory(category.id)}
                className="peer sr-only"
              />
              <span className="relative h-6 w-6 border border-brand-red bg-white transition-colors peer-checked:bg-brand-red peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-red after:absolute after:left-2 after:top-0.75 after:h-2.75 after:w-1.25 after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:opacity-0 after:content-[''] peer-checked:after:opacity-100" />
              <span className="select-none">{category.name}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
