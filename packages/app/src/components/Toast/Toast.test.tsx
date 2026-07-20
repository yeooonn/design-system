import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import type { ReactElement } from "react";
import { Pressable, Text } from "react-native";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { ToastProvider, useToast } from "./index";

function ToastHarness() {
  const toast = useToast();

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="토스트 열기"
        onPress={() => {
          toast.open({ text: "저장되었습니다", duration: 0 });
        }}
      >
        <Text>열기</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="전체 닫기"
        onPress={() => toast.closeAll()}
      >
        <Text>닫기</Text>
      </Pressable>
    </>
  );
}

function renderToast(ui: ReactElement) {
  return render(
    <ThemeProvider>
      <ToastProvider>{ui}</ToastProvider>
    </ThemeProvider>,
  );
}

describe("useToast", () => {
  it("Provider 없이 useToast를 호출하면 throw한다", () => {
    expect(() => render(<ToastHarness />)).toThrow(
      "useToast는 ToastProvider 내에서 사용되어야 합니다.",
    );
  });

  it("open 호출 시 toast 메시지를 렌더한다", async () => {
    renderToast(<ToastHarness />);

    fireEvent.press(screen.getByLabelText("토스트 열기"));

    await waitFor(() => {
      expect(screen.getByText("저장되었습니다")).toBeTruthy();
    });
  });

  it("closeAll 호출 시 toast를 제거한다", async () => {
    renderToast(<ToastHarness />);

    fireEvent.press(screen.getByLabelText("토스트 열기"));
    await waitFor(() => {
      expect(screen.getByText("저장되었습니다")).toBeTruthy();
    });

    fireEvent.press(screen.getByLabelText("전체 닫기"));
    expect(screen.queryByText("저장되었습니다")).toBeNull();
  });
});
