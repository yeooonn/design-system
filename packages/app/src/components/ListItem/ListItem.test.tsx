import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { ListItem } from "./index";

describe("ListItem", () => {
  it("title과 description을 렌더한다", () => {
    renderWithTheme(
      <ListItem title="알림" description="새 메시지가 있습니다" />,
    );

    expect(screen.getByText("알림")).toBeTruthy();
    expect(screen.getByText("새 메시지가 있습니다")).toBeTruthy();
  });

  it("onPress가 있으면 press 시 호출한다", () => {
    const onPress = jest.fn();

    renderWithTheme(<ListItem title="알림" onPress={onPress} />);

    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("disabled이면 press되지 않는다", () => {
    const onPress = jest.fn();

    renderWithTheme(
      <ListItem title="알림" disabled onPress={onPress} />,
    );

    const item = screen.getByRole("button");
    expect(item).toBeDisabled();

    fireEvent.press(item);
    expect(onPress).not.toHaveBeenCalled();
  });
});
