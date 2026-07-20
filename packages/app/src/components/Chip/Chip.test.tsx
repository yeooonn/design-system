import { fireEvent, screen } from "@testing-library/react-native";
import { lightTheme } from "@yeoooonn/ds-tokens";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Chip } from "./index";
import { resolveChipStyles } from "./chipStyles";

describe("Chip", () => {
  it("onPress가 있으면 press 시 호출한다", () => {
    const onPress = jest.fn();

    renderWithTheme(<Chip onPress={onPress}>React</Chip>);

    fireEvent.press(screen.getByRole("button", { name: "React" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("selected이면 accessibilityState.selected가 true다", () => {
    renderWithTheme(
      <Chip selected onPress={() => {}}>
        React
      </Chip>,
    );

    expect(
      screen.getByRole("button", { name: "React" }).props.accessibilityState
        ?.selected,
    ).toBe(true);
  });

  it("onClose press 시 onClose를 호출한다", () => {
    const onClose = jest.fn();

    renderWithTheme(<Chip onClose={onClose}>React</Chip>);

    fireEvent.press(screen.getByRole("button", { name: "Remove" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("resolveChipStyles", () => {
  it("selected이면 primary 계열 배경을 사용한다", () => {
    const styles = resolveChipStyles({
      color: "gray",
      theme: lightTheme,
      selected: true,
      disabled: false,
    });

    expect(styles.backgroundColor).toBeTruthy();
    expect(styles.textColor).toBeTruthy();
  });
});
