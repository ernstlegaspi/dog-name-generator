import { useEffect, useMemo, useRef, useState } from "react";
import categoriesData from "../../constants/categories.json";
import useNamesData from "../../hooks/useNamesData";
import { filterNames } from "../../lib/names";
import SelectedNameDescription from "./SelectedNameDescription";

type SelectedLetterNamesSectionProps = {
  selectedLetter: string;
  selectedGender: "male" | "female" | "both";
  activeFilterGroupId: string | null;
  selectedCategoryIds: string[];
};

const filterGroupCategoryIdsById = new Map(
  categoriesData.filterGroups.map((group) => [group.id, group.categoryIds]),
);

function ArrowIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={[
        "h-12 w-12 text-brand-red",
        direction === "up" ? "" : "rotate-180",
      ].join(" ")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 29L24 17L36 29"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getDisplayClass(distanceFromCenter: number) {
  if (distanceFromCenter === 0) {
    return "text-[80px] font-normal text-brand-red opacity-100";
  }

  if (distanceFromCenter === 1) {
    return "text-[64px] font-light text-brand-text opacity-70";
  }

  if (distanceFromCenter === 2) {
    return "text-[54px] font-light text-brand-text opacity-45";
  }

  return "text-[44px] font-light text-brand-text opacity-20";
}

export default function SelectedLetterNamesSection({
  selectedLetter,
  selectedGender,
  activeFilterGroupId,
  selectedCategoryIds,
}: SelectedLetterNamesSectionProps) {
  const carouselViewportRef = useRef<HTMLDivElement | null>(null);
  const { names, status } = useNamesData(true);
  const fallbackCategoryIds = useMemo(
    () =>
      activeFilterGroupId
        ? (filterGroupCategoryIdsById.get(activeFilterGroupId) ?? [])
        : [],
    [activeFilterGroupId],
  );
  const appliedCategoryIds = useMemo(
    () =>
      selectedCategoryIds.length > 0
        ? selectedCategoryIds
        : fallbackCategoryIds,
    [fallbackCategoryIds, selectedCategoryIds],
  );
  const matchingNames = useMemo(
    () =>
      filterNames(names, {
        selectedLetter,
        selectedGender,
        appliedCategoryIds,
      }),
    [appliedCategoryIds, names, selectedGender, selectedLetter],
  );
  const displayCategoryIds = useMemo(() => {
    if (!activeFilterGroupId || selectedCategoryIds.length === 0) {
      return [];
    }

    const activeGroupCategoryIds =
      filterGroupCategoryIdsById.get(activeFilterGroupId) ?? [];

    return selectedCategoryIds.filter(
      (categoryId) =>
        activeGroupCategoryIds.includes(categoryId) &&
        matchingNames.some((name) => name.categories.includes(categoryId)),
    );
  }, [activeFilterGroupId, matchingNames, selectedCategoryIds]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (matchingNames.length === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex(Math.min(3, matchingNames.length - 1));
  }, [
    activeFilterGroupId,
    matchingNames.length,
    selectedGender,
    selectedLetter,
    selectedCategoryIds,
  ]);

  useEffect(() => {
    const carouselViewport = carouselViewportRef.current;

    if (!carouselViewport) {
      return;
    }

    const carouselElement = carouselViewport;

    function handleCarouselWheel(event: WheelEvent) {
      const eventTarget = event.target;

      if (!(eventTarget instanceof Node)) {
        return;
      }

      if (!carouselElement.contains(eventTarget)) {
        return;
      }

      if (matchingNames.length === 0) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();

      if (event.deltaY > 0) {
        setActiveIndex((currentIndex) =>
          Math.min(currentIndex + 1, matchingNames.length - 1),
        );
        return;
      }

      if (event.deltaY < 0) {
        setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0));
      }
    }

    document.addEventListener("wheel", handleCarouselWheel, {
      capture: true,
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", handleCarouselWheel, true);
    };
  }, [matchingNames.length]);

  function goToPreviousName() {
    setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  }

  function goToNextName() {
    setActiveIndex((currentIndex) =>
      Math.min(currentIndex + 1, matchingNames.length - 1),
    );
  }

  const visibleNames = Array.from({ length: 7 }, (_, offsetIndex) => {
    const nameIndex = activeIndex + offsetIndex - 3;

    if (nameIndex < 0 || nameIndex >= matchingNames.length) {
      return null;
    }

    return matchingNames[nameIndex];
  });
  const activeName =
    status === "loaded" ? (matchingNames[activeIndex] ?? null) : null;

  return (
    <section className="w-full py-4">
      <div className="flex flex-col items-center justify-center gap-8 2xl:flex-row 2xl:items-center 2xl:justify-center 2xl:gap-8">
        <img
          src="/papillon.webp"
          alt="Papillon dog"
          className="h-auto w-full max-w-[480px] shrink-0 object-contain xl:h-[606px] xl:w-[480px]"
        />

        <div className="flex flex-col items-center justify-center gap-6 xl:w-[568px] xl:min-w-[568px] xl:flex-row xl:items-center xl:gap-0">
          <div className="flex w-full max-w-[96px] shrink-0 items-center justify-center gap-8 xl:h-[606px] xl:w-12 xl:min-w-12 xl:flex-col xl:justify-between">
            <button
              type="button"
              onClick={goToPreviousName}
              disabled={activeIndex === 0}
              aria-label="Show previous name"
              className="cursor-pointer text-brand-red transition-opacity disabled:cursor-default disabled:opacity-30"
            >
              <ArrowIcon direction="up" />
            </button>

            <button
              type="button"
              onClick={goToNextName}
              disabled={activeIndex >= matchingNames.length - 1}
              aria-label="Show next name"
              className="cursor-pointer text-brand-red transition-opacity disabled:cursor-default disabled:opacity-30"
            >
              <ArrowIcon direction="down" />
            </button>
          </div>

          <div
            ref={carouselViewportRef}
            className="flex h-[606px] w-full max-w-[520px] shrink-0 items-center justify-center overflow-hidden overscroll-none xl:w-[520px] xl:min-w-[520px]"
          >
            {status === "loading" || status === "idle" ? (
              <p className="text-center text-[32px] font-light text-brand-text">
                Loading names...
              </p>
            ) : status === "error" ? (
              <p className="text-center text-[32px] font-light text-brand-text">
                Unable to load names
              </p>
            ) : matchingNames.length === 0 ? (
              <p className="text-center text-[32px] font-light text-brand-text">
                No names found
              </p>
            ) : (
              <div className="flex w-full flex-col items-center justify-center">
                {visibleNames.map((name, index) => {
                  const distanceFromCenter = Math.abs(index - 3);

                  return (
                    <div
                      key={`${name?.id ?? "empty"}-${index}`}
                      className="flex min-h-[86px] items-center justify-center text-center leading-none transition-all duration-300"
                    >
                      {name ? (
                        <span className={getDisplayClass(distanceFromCenter)}>
                          {name.title}
                        </span>
                      ) : (
                        <span className="invisible text-[44px]">.</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <SelectedNameDescription
          activeName={activeName}
          activeFilterGroupId={activeFilterGroupId}
          displayCategoryIds={displayCategoryIds}
          allNames={names}
        />
      </div>
    </section>
  );
}
