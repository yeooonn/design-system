import { Text } from "react-native";
import { screen } from "@testing-library/react-native";
import { renderWithTheme } from "../../test/renderWithTheme";
import { Card } from "./index";

describe("Card", () => {
  it("header, content, footer를 렌더한다", () => {
    renderWithTheme(
      <Card>
        <Card.Header>
          <Text>헤더</Text>
        </Card.Header>
        <Card.Content>
          <Text>본문</Text>
        </Card.Content>
        <Card.Footer>
          <Text>푸터</Text>
        </Card.Footer>
      </Card>,
    );

    expect(screen.getByText("헤더")).toBeTruthy();
    expect(screen.getByText("본문")).toBeTruthy();
    expect(screen.getByText("푸터")).toBeTruthy();
  });
});
