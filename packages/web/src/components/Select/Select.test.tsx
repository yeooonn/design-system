import userEvent from "@testing-library/user-event";
import { fireEvent, screen } from "@testing-library/react";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Select } from "./index";
import { resolveSelectState } from "./selectStyles";

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "disabled", label: "비활성", disabled: true },
];

describe("Select", () => {
  it("trigger 클릭 시 listbox를 연다", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Select label="과일" options={options} placeholder="선택" />,
    );

    await user.click(screen.getByRole("combobox", { name: "과일" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "사과" })).toBeInTheDocument();
  });

  it("option 클릭 시 onChange를 호출하고 listbox를 닫는다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <Select label="과일" options={options} onChange={onChange} />,
    );

    await user.click(screen.getByRole("combobox", { name: "과일" }));
    await user.click(screen.getByRole("option", { name: "바나나" }));

    expect(onChange).toHaveBeenCalledWith({
      target: { value: "banana", name: undefined },
    });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("바깥 클릭 시 listbox를 닫는다", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <Select label="과일" options={options} />,
    );

    await user.click(screen.getByRole("combobox", { name: "과일" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("errorMessage가 있으면 aria-invalid과 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Select
        label="과일"
        options={options}
        errorMessage="필수 선택입니다"
      />,
    );

    expect(screen.getByRole("combobox", { name: "과일" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("필수 선택입니다")).toBeInTheDocument();
  });

  it("placeholder를 combobox label로 표시한다", () => {
    renderWithTheme(
      <Select label="과일" options={options} placeholder="선택하세요" />,
    );

    expect(screen.getByRole("combobox", { name: "과일" })).toHaveTextContent(
      "선택하세요",
    );
  });
});

describe("resolveSelectState", () => {
  it("error이면 error 상태를 반환한다", () => {
    expect(
      resolveSelectState({ disabled: false, error: true, focused: false }),
    ).toBe("error");
  });
});
