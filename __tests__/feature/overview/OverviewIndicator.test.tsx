import React from "react";
import { render, screen } from "@testing-library/react-native";
import { OverviewIndicator } from "../../../src/feature/overview/components/overview-indicator";
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

describe("OverviewIndicator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o componente corretamente", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewIndicator currentSlide={0} />
      </NavigationContext.Provider>,
    );

    expect(screen.getByTestId("overview-indicator-container")).toBeTruthy();
  });

  it("exibe todos os indicadores de slides", () => {
    const { getAllByTestId } = render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewIndicator currentSlide={0} />
      </NavigationContext.Provider>,
    );

    // OVERVIEW_PAGES tem 3 elementos
    const indicators = getAllByTestId(/overview-indicator-dot/);
    expect(indicators).toHaveLength(3);
  });

  it("marca o slide atual como ativo", () => {
    const { getAllByTestId } = render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewIndicator currentSlide={1} />
      </NavigationContext.Provider>,
    );

    const indicators = getAllByTestId(/overview-indicator-dot/);
    // Slides 0 e 1 devem estar marked (index <= currentSlide)
    expect(indicators[0]).toHaveClass("bg-primary");
    expect(indicators[1]).toHaveClass("bg-primary");
    expect(indicators[2]).toHaveClass("bg-muted");
  });

  it("mostra o botão Pular quando não está no último slide", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewIndicator currentSlide={0} />
      </NavigationContext.Provider>,
    );

    const skipButton = screen.getByText("Pular");
    expect(skipButton).toBeTruthy();
  });

  it("esconde o botão Pular quando está no último slide", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewIndicator currentSlide={2} />
      </NavigationContext.Provider>,
    );

    const skipButton = screen.queryByText("Pular");
    expect(skipButton).toBeNull();
  });

  it("atualiza indicadores quando currentSlide muda", () => {
    const { rerender, getAllByTestId } = render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewIndicator currentSlide={0} />
      </NavigationContext.Provider>,
    );

    let indicators = getAllByTestId(/overview-indicator-dot/);
    expect(indicators[0]).toHaveClass("bg-primary");
    expect(indicators[1]).toHaveClass("bg-muted");

    rerender(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewIndicator currentSlide={1} />
      </NavigationContext.Provider>,
    );

    indicators = getAllByTestId(/overview-indicator-dot/);
    expect(indicators[0]).toHaveClass("bg-primary");
    expect(indicators[1]).toHaveClass("bg-primary");
    expect(indicators[2]).toHaveClass("bg-muted");
  });
});
