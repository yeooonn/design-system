import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Select } from "./index";

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "disabled", label: "비활성", disabled: true },
];

describe("Select", () => {
  it("trigger press 시 옵션 시트를 연다", async () => {
    renderWithTheme(
      <Select label="과일" options={options} placeholder="선택" />,
    );

    fireEvent.press(screen.getByLabelText("과일"));

    await waitFor(() => {
      expect(screen.getAllByText("사과").length).toBeGreaterThan(0);
      expect(screen.getAllByText("바나나").length).toBeGreaterThan(0);
    });
  });

  it("option press 시 onValueChange를 호출한다", async () => {
    const onValueChange = jest.fn();

    renderWithTheme(
      <Select label="과일" options={options} onValueChange={onValueChange} />,
    );

    fireEvent.press(screen.getByLabelText("과일"));
    await waitFor(() => {
      expect(screen.getAllByText("바나나").length).toBeGreaterThan(0);
    });

    fireEvent.press(screen.getAllByText("바나나")[0]);
    expect(onValueChange).toHaveBeenCalledWith("banana");
  });

  it("errorMessage가 있으면 에러 메시지를 표시한다", () => {
    renderWithTheme(
      <Select
        label="과일"
        options={options}
        errorMessage="필수 선택입니다"
      />,
    );

    expect(screen.getByText("필수 선택입니다")).toBeTruthy();
  });

  it("placeholder를 trigger에 표시한다", () => {
    renderWithTheme(
      <Select label="과일" options={options} placeholder="선택하세요" />,
    );

    expect(screen.getByText("선택하세요")).toBeTruthy();
  });
});
