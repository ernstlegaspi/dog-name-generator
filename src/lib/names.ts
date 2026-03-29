export type NameEntry = {
  id: string;
  title: string;
  definition: string;
  gender: string[];
  categories: string[];
};

type NamesDataset = {
  data: NameEntry[];
};

type FilterNamesOptions = {
  selectedLetter: string;
  selectedGender: "male" | "female" | "both";
  appliedCategoryIds: string[];
};

let namesDataPromise: Promise<NameEntry[]> | null = null;

export function loadNamesData() {
  if (!namesDataPromise) {
    namesDataPromise = import("../constants/names.json").then(
      (module) => (module.default as NamesDataset).data,
    );
  }

  return namesDataPromise;
}

export function filterNames(
  names: NameEntry[],
  { selectedLetter, selectedGender, appliedCategoryIds }: FilterNamesOptions,
) {
  return names.filter((name) => {
    const trimmedTitle = name.title.trim();

    if (trimmedTitle.charAt(0).toUpperCase() !== selectedLetter) {
      return false;
    }

    if (selectedGender === "male" && !name.gender.includes("M")) {
      return false;
    }

    if (selectedGender === "female" && !name.gender.includes("F")) {
      return false;
    }

    if (
      appliedCategoryIds.length > 0 &&
      !name.categories.some((categoryId) =>
        appliedCategoryIds.includes(categoryId),
      )
    ) {
      return false;
    }

    return true;
  });
}

export function getPlainTextFromDefinition(definition: string) {
  if (typeof window === "undefined") {
    return definition
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const parsedDocument = new DOMParser().parseFromString(
    definition,
    "text/html",
  );

  return parsedDocument.body.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

export function getRelatedNames(activeName: NameEntry, allNames: NameEntry[]) {
  return allNames
    .filter((candidate) => {
      if (candidate.id === activeName.id) {
        return false;
      }

      return candidate.categories.some((categoryId) =>
        activeName.categories.includes(categoryId),
      );
    })
    .map((candidate) => candidate.title.trim())
    .sort((leftName, rightName) => leftName.localeCompare(rightName))
    .slice(0, 3);
}
