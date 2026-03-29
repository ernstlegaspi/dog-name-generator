type PetGender = "male" | "female" | "both";

const genderOptions: PetGender[] = ["male", "female", "both"];

type HeaderProps = {
  activeGender: PetGender;
  onGenderChange: (gender: PetGender) => void;
};

export default function Header({ activeGender, onGenderChange }: HeaderProps) {
  return (
    <header className="flex h-45.75 w-full items-center justify-center bg-brand-background text-brand-text">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h3 className="text-[25px] font-normal leading-none">
          Choose your pet&apos;s gender
        </h3>

        <div className="flex items-center gap-4">
          {genderOptions.map((option) => {
            const isActive = option === activeGender;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onGenderChange(option)}
                aria-pressed={isActive}
                className={[
                  "h-11 w-17.5 cursor-pointer rounded-sm border text-base font-medium capitalize transition-colors",
                  isActive
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-red bg-transparent text-brand-red hover:bg-brand-red hover:text-white",
                ].join(" ")}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
