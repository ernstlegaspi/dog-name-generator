import { useState } from "react";

type PetGender = "male" | "female" | "both";

const genderOptions: PetGender[] = ["male", "female", "both"];

export default function Header() {
  const [activeGender, setActiveGender] = useState<PetGender>("male");

  return (
    <header className="flex h-[183px] w-full items-center justify-center bg-[#F9F8F5] text-brand-text">
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
                onClick={() => setActiveGender(option)}
                aria-pressed={isActive}
                className={[
                  "h-[44px] w-[70px] cursor-pointer rounded-[4px] border text-base font-medium capitalize transition-colors",
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
