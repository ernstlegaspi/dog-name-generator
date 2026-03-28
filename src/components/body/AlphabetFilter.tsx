type AlphabetFilterProps = {
  activeLetter: string;
  letters: string[];
  onLetterSelect: (letter: string) => void;
};

export default function AlphabetFilter({
  activeLetter,
  letters,
  onLetterSelect,
}: AlphabetFilterProps) {
  return (
    <div className="rounded-full bg-white px-6 py-5 shadow-[0_8px_24px_0_#3A35331A]">
      <div className="overflow-x-auto">
        <div className="flex w-max min-w-full items-center justify-center gap-2">
          {letters.map((letter) => {
            const isActive = letter === activeLetter;

            return (
              <button
                key={letter}
                type="button"
                onClick={() => onLetterSelect(letter)}
                aria-pressed={isActive}
                className={[
                  "flex h-14.5 min-w-14.5 cursor-pointer items-center justify-center rounded-full px-3 text-[37px] leading-none text-brand-text transition-colors",
                  isActive ? "bg-brand-red text-white" : "bg-transparent",
                ].join(" ")}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
