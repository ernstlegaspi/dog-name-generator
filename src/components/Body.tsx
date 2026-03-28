import { useState } from "react";
import lettersData from "../constants/letters.json";
import AlphabetFilter from "./AlphabetFilter";

export default function Body() {
  const [activeLetter, setActiveLetter] = useState("A");

  return (
    <main className="min-h-0 w-full flex-1 bg-brand-background py-10">
      <div className="mx-auto flex w-[80%] flex-col gap-8">
        <h2 className="text-left text-[30px] font-normal text-brand-text">
          All pet names
        </h2>

        <AlphabetFilter
          activeLetter={activeLetter}
          letters={lettersData.data}
          onLetterSelect={setActiveLetter}
        />
      </div>
    </main>
  );
}
