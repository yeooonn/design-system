import { screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Modal } from "./index";

describe("Modal", () => {
  it("visible일 때 header와 content를 렌더한다", () => {
    renderWithTheme(
      <Modal visible accessibilityLabel="알림">
        <Modal.Header>
          <Text>제목</Text>
        </Modal.Header>
        <Modal.Content>
          <Text>내용</Text>
        </Modal.Content>
      </Modal>,
    );

    expect(screen.getByText("제목")).toBeTruthy();
    expect(screen.getByText("내용")).toBeTruthy();
    expect(screen.getByLabelText("알림")).toBeTruthy();
  });

  it("visible=false이면 내용을 렌더하지 않는다", () => {
    renderWithTheme(
      <Modal visible={false}>
        <Modal.Content>
          <Text>내용</Text>
        </Modal.Content>
      </Modal>,
    );

    expect(screen.queryByText("내용")).toBeNull();
  });
});
