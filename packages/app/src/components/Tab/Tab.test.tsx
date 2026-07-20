import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Tab } from "./index";

describe("Tab", () => {
  it("tab item을 렌더한다", () => {
    renderWithTheme(
      <Tab>
        <Tab.Item selected>탭 1</Tab.Item>
        <Tab.Item>탭 2</Tab.Item>
      </Tab>,
    );

    expect(screen.getByText("탭 1")).toBeTruthy();
    expect(screen.getByText("탭 2")).toBeTruthy();
  });

  it("Tab.Item press 시 onChange를 호출한다", () => {
    const onChange = jest.fn();

    renderWithTheme(
      <Tab onChange={onChange}>
        <Tab.Item selected>탭 1</Tab.Item>
        <Tab.Item>탭 2</Tab.Item>
      </Tab>,
    );

    fireEvent.press(screen.getByText("탭 2"));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("disabled tab press 시 onChange를 호출하지 않는다", () => {
    const onChange = jest.fn();

    renderWithTheme(
      <Tab onChange={onChange}>
        <Tab.Item selected>탭 1</Tab.Item>
        <Tab.Item disabled>탭 2</Tab.Item>
      </Tab>,
    );

    fireEvent.press(screen.getByText("탭 2"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
