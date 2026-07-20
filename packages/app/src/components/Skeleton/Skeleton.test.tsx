import { renderWithTheme } from "../../test/renderWithTheme";
import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("렌더한다", () => {
    const { toJSON } = renderWithTheme(<Skeleton />);

    expect(toJSON()).toBeTruthy();
  });
});
