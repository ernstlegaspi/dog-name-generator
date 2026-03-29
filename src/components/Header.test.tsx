import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("marks the active gender button and calls back with the next selection", () => {
    const handleGenderChange = vi.fn();

    render(
      <Header
        activeGender="male"
        onGenderChange={handleGenderChange}
      />,
    );

    const maleButton = screen.getByRole("button", { name: "male" });
    const femaleButton = screen.getByRole("button", { name: "female" });

    expect(maleButton.getAttribute("aria-pressed")).toBe("true");
    expect(femaleButton.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(femaleButton);

    expect(handleGenderChange).toHaveBeenCalledTimes(1);
    expect(handleGenderChange).toHaveBeenCalledWith("female");
  });
});
