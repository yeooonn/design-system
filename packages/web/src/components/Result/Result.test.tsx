import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Result } from "./index";
import { resolveResultStyles } from "./resultStyles";

describe("Result", () => {
  it("string title은 heading으로 렌더한다", () => {
    renderWithTheme(<Result title="완료되었습니다" />);

    expect(
      screen.getByRole("heading", { name: "완료되었습니다" }),
    ).toBeInTheDocument();
  });

  it("description과 button slot을 렌더한다", () => {
    renderWithTheme(
      <Result
        description="잠시 후 다시 시도해 주세요"
        button={<Result.Button>다시 시도</Result.Button>}
      />,
    );

    expect(screen.getByText("잠시 후 다시 시도해 주세요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다시 시도" })).toBeInTheDocument();
  });

  it("Result.Button 클릭 시 onClick을 호출한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <Result button={<Result.Button onClick={onClick}>확인</Result.Button>} />,
    );

    await user.click(screen.getByRole("button", { name: "확인" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("resolveResultStyles", () => {
  it("root layout 속성을 포함한다", () => {
    const styles = resolveResultStyles();

    expect(styles.root.display).toBe("flex");
    expect(styles.root.textAlign).toBe("center");
  });
});
