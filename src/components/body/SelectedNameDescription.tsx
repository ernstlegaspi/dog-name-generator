import categoriesData from "../../constants/categories.json";
import {
  getPlainTextFromDefinition,
  getRelatedNames,
  type NameEntry,
} from "../../lib/names";

type SelectedNameDescriptionProps = {
  activeName: NameEntry | null;
  activeFilterGroupId: string | null;
  displayCategoryIds: string[];
  allNames: NameEntry[];
};

const filterGroupLabelById = new Map(
  categoriesData.filterGroups.map((group) => [group.id, group.label]),
);

const categoryNameById = new Map(
  categoriesData.data.map((category) => [category.id, category.name]),
);

function GenderIcon({ type }: { type: "male" | "female" }) {
  if (type === "male") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 52 52"
        className="h-[52px] w-[52px] text-brand-text"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="34"
          r="10.5"
          stroke="currentColor"
          strokeWidth="2.75"
        />
        <path
          d="M25.5 26.5L38.5 13.5"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
        <path
          d="M31 13.5H38.5V21"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 52 52"
      className="h-[52px] w-[52px] text-brand-text"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 10C24.6274 10 30 15.3726 30 22C30 28.6274 24.6274 34 18 34C11.3726 34 6 28.6274 6 22C6 15.3726 11.3726 10 18 10ZM18 34V44M13 39H23"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SelectedNameDescription({
  activeName,
  activeFilterGroupId,
  displayCategoryIds,
  allNames,
}: SelectedNameDescriptionProps) {
  if (!activeName) {
    return null;
  }

  const categoryLabel = activeFilterGroupId
    ? filterGroupLabelById.get(activeFilterGroupId) ?? null
    : null;
  const matchedSelectedCategoryLabels = displayCategoryIds
    .map((categoryId) => categoryNameById.get(categoryId) ?? null)
    .filter((categoryName): categoryName is string => categoryName !== null);
  const categoryText = categoryLabel
    ? matchedSelectedCategoryLabels.length > 0
      ? `${categoryLabel} - ${matchedSelectedCategoryLabels.join(", ")}`
      : categoryLabel
    : null;
  const descriptionText = getPlainTextFromDefinition(activeName.definition);
  const relatedNameText = getRelatedNames(activeName, allNames).join(" - ");

  return (
    <aside className="flex w-full max-w-[420px] flex-col gap-6 text-brand-text xl:h-[606px] xl:min-h-[606px] xl:overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {activeName.gender.includes("M") ? <GenderIcon type="male" /> : null}
          {activeName.gender.includes("F") ? <GenderIcon type="female" /> : null}
        </div>

        {categoryText ? (
          <p className="text-[30px] font-normal text-brand-text">{categoryText}</p>
        ) : null}
      </div>

      <div className="h-px w-full bg-brand-border" />

      <div className="min-h-0 xl:flex-1 xl:overflow-hidden">
        <div className="max-h-[320px] overflow-y-auto overscroll-contain pr-2 xl:h-full xl:max-h-none xl:no-scrollbar">
          <p className="text-[30px] font-light text-brand-text">
            {descriptionText}
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-brand-border" />

      <div className="flex flex-col gap-3">
        <p className="text-[20px] font-normal text-brand-text">Related name</p>
        <p className="text-[20px] font-light text-brand-text">
          {relatedNameText || "None"}
        </p>
      </div>
    </aside>
  );
}
