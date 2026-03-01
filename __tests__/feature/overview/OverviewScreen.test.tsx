import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { OverviewScreen } from "../../../src/feature/overview/page";
import { NavigationContext } from "@react-navigation/native";

const mockNavigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  setOptions: jest.fn(),
  setParams: jest.fn(),
} as any;

const navigationValue = {
  navigation: mockNavigation,
  descriptors: {},
  state: { routes: [] },
} as any;

describe("OverviewScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o componente corretamente", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    expect(screen.getByTestId("overview-indicator-container")).toBeTruthy();
    expect(screen.getByTestId("overview-actions-container")).toBeTruthy();
  });

  it("inicia no primeiro slide (index 0)", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    // Verifica se está no primeiro slide (indicadores devem mostrar isto)
    const indicators = screen.getAllByTestId(/overview-indicator-dot/);
    expect(indicators[0]).toHaveClass("bg-primary");
  });

  it("não exibe botão anterior no primeiro slide", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    expect(screen.queryByTestId("overview-action-previous")).toBeNull();
  });

  it("avança para o próximo slide ao clicar em Próximo", async () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    const nextButton = screen.getByTestId("overview-action-next");
    fireEvent.press(nextButton);

    await waitFor(() => {
      const indicators = screen.getAllByTestId(/overview-indicator-dot/);
      expect(indicators[0]).toHaveClass("bg-primary");
      expect(indicators[1]).toHaveClass("bg-primary");
    });
  });

  it("volta para o slide anterior ao clicar em Anterior", async () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    // Avança para slide 1
    const nextButton = screen.getByTestId("overview-action-next");
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(screen.getByTestId("overview-action-previous")).toBeTruthy();
    });

    // Volta para slide 0
    const previousButton = screen.getByTestId("overview-action-previous");
    fireEvent.press(previousButton);

    await waitFor(() => {
      expect(screen.queryByTestId("overview-action-previous")).toBeNull();
    });
  });

  it("exibe todos os 3 slides do onboarding", async () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    // Slide 1
    expect(screen.getByText("Gerencie seus tickets")).toBeTruthy();

    // Avança para slide 2
    fireEvent.press(screen.getByTestId("overview-action-next"));

    await waitFor(() => {
      expect(screen.getByText("Abra chamados rapidamente")).toBeTruthy();
    });

    // Avança para slide 3
    fireEvent.press(screen.getByTestId("overview-action-next"));

    await waitFor(() => {
      expect(screen.getByText("Visualize sua performance")).toBeTruthy();
    });
  });

  it("mostra botão 'Começar' no último slide", async () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    // Avança para último slide (2)
    fireEvent.press(screen.getByTestId("overview-action-next"));
    fireEvent.press(screen.getByTestId("overview-action-next"));

    await waitFor(() => {
      expect(screen.getByTestId("overview-action-start")).toBeTruthy();
      expect(screen.getByText("Começar")).toBeTruthy();
    });
  });

  it("esconde botão Pular no último slide", async () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    expect(screen.getByText("Pular")).toBeTruthy();

    // Avança para último slide
    fireEvent.press(screen.getByTestId("overview-action-next"));
    fireEvent.press(screen.getByTestId("overview-action-next"));

    await waitFor(() => {
      expect(screen.queryByText("Pular")).toBeNull();
    });
  });

  it("navega através de múltiplos slides", async () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    // Sequência: 0 -> 1 -> 2 -> 1 -> 0
    let indicators = screen.getAllByTestId(/overview-indicator-dot/);
    expect(indicators[0]).toHaveClass("bg-primary");
    expect(indicators[1]).toHaveClass("bg-muted");
    expect(indicators[2]).toHaveClass("bg-muted");

    // Slide 1
    fireEvent.press(screen.getByTestId("overview-action-next"));
    await waitFor(() => {
      indicators = screen.getAllByTestId(/overview-indicator-dot/);
      expect(indicators[1]).toHaveClass("bg-primary");
    });

    // Slide 2
    fireEvent.press(screen.getByTestId("overview-action-next"));
    await waitFor(() => {
      indicators = screen.getAllByTestId(/overview-indicator-dot/);
      expect(indicators[2]).toHaveClass("bg-primary");
    });

    // Volta para slide 1
    fireEvent.press(screen.getByTestId("overview-action-previous"));
    await waitFor(() => {
      indicators = screen.getAllByTestId(/overview-indicator-dot/);
      expect(indicators[1]).toHaveClass("bg-primary");
      expect(indicators[2]).toHaveClass("bg-muted");
    });

    // Volta para slide 0
    fireEvent.press(screen.getByTestId("overview-action-previous"));
    await waitFor(() => {
      expect(screen.queryByTestId("overview-action-previous")).toBeNull();
    });
  });

  it("renderiza a barra superior (OverviewIndicator)", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    expect(screen.getByTestId("overview-indicator-container")).toBeTruthy();
  });

  it("renderiza a barra de ações inferior (OverviewActions)", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    expect(screen.getByTestId("overview-actions-container")).toBeTruthy();
  });

  it("renderiza o carrossel de slides (FlatList)", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    expect(screen.getByTestId("overview-screen-flatlist")).toBeTruthy();
  });

  it("mantém estado consistente ao navegar rápido", async () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewScreen />
      </NavigationContext.Provider>,
    );

    // Clica múltiplas vezes rapidamente
    const nextButton = screen.getByTestId("overview-action-next");
    fireEvent.press(nextButton);
    fireEvent.press(nextButton);
    fireEvent.press(nextButton);

    // Não deve exceder o número de slides
    await waitFor(() => {
      const indicators = screen.getAllByTestId(/overview-indicator-dot/);
      expect(indicators.length).toBe(3); // Apenas 3 slides existem
    });
  });
});
