import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Tab } from "./index";

describe("Tab", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("tablist와 tab item을 렌더한다", () => {
    renderWithTheme(
      <Tab>
        <Tab.Item selected>탭 1</Tab.Item>
        <Tab.Item>탭 2</Tab.Item>
      </Tab>,
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "탭 1" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "탭 2" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("Tab.Item 클릭 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <Tab onChange={onChange}>
        <Tab.Item selected>탭 1</Tab.Item>
        <Tab.Item>탭 2</Tab.Item>
      </Tab>,
    );

    await user.click(screen.getByRole("tab", { name: "탭 2" }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("disabled tab 클릭 시 onChange를 호출하지 않는다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    renderWithTheme(
      <Tab onChange={onChange}>
        <Tab.Item selected>탭 1</Tab.Item>
        <Tab.Item disabled>탭 2</Tab.Item>
      </Tab>,
    );

    await user.click(screen.getByRole("tab", { name: "탭 2" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
