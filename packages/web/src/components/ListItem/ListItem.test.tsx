import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { ListItem } from "./index";

describe("ListItem", () => {
  it("title과 description을 렌더한다", () => {
    renderWithTheme(
      <ListItem title="알림 설정" description="푸시 알림을 관리합니다" />,
    );

    expect(screen.getByText("알림 설정")).toBeInTheDocument();
    expect(screen.getByText("푸시 알림을 관리합니다")).toBeInTheDocument();
  });

  it("onClick이 있으면 button으로 렌더하고 클릭 시 호출한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <ListItem title="알림 설정" onClick={onClick} />,
    );

    await user.click(screen.getByRole("button", { name: /알림 설정/ }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("onClick이 없으면 button role이 아니다", () => {
    renderWithTheme(<ListItem title="알림 설정" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("disabled + onClick이면 클릭되지 않는다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(
      <ListItem title="알림 설정" disabled onClick={onClick} />,
    );

    const button = screen.getByRole("button", { name: /알림 설정/ });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
