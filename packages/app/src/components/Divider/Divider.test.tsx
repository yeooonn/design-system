import { renderWithTheme } from "../../test/renderWithTheme";
import { Divider } from "./index";

describe("Divider", () => {
  it("horizontal divider를 렌더한다", () => {
    const { toJSON } = renderWithTheme(<Divider />);

    expect(toJSON()).toMatchObject({
      props: { accessibilityRole: "none" },
    });
  });

  it("vertical orientation을 렌더한다", () => {
    const { toJSON } = renderWithTheme(<Divider orientation="vertical" />);

    expect(toJSON()).toMatchObject({
      props: { accessibilityRole: "none" },
    });
  });
});
