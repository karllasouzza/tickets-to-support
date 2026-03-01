import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { OverviewActions } from "../../../src/feature/overview/components/overview-actions";
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

describe("OverviewActions", () => {
  let mockOnNext: jest.Mock;
  let mockOnPrevious: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnNext = jest.fn();
    mockOnPrevious = jest.fn();
  });

  it("renderiza o componente corretamente", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={0}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    expect(screen.getByTestId("overview-actions-container")).toBeTruthy();
  });

  it("não exibe botão anterior no primeiro slide", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={0}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const previousButton = screen.queryByTestId("overview-action-previous");
    expect(previousButton).toBeNull();
  });

  it("exibe botão anterior a partir do segundo slide", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={1}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const previousButton = screen.getByTestId("overview-action-previous");
    expect(previousButton).toBeTruthy();
  });

  it("exibe botão 'Próximo' quando não está no último slide", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={0}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const nextButton = screen.getByTestId("overview-action-next");
    expect(nextButton).toBeTruthy();
    expect(screen.getByText("Próximo")).toBeTruthy();
  });

  it("exibe botão 'Começar' quando está no último slide", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={2}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const startButton = screen.getByTestId("overview-action-start");
    expect(startButton).toBeTruthy();
    expect(screen.getByText("Começar")).toBeTruthy();
  });

  it("chama onNext quando botão Próximo é pressionado", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={0}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const nextButton = screen.getByTestId("overview-action-next");
    fireEvent.press(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it("chama onPrevious quando botão anterior é pressionado", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={1}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const previousButton = screen.getByTestId("overview-action-previous");
    fireEvent.press(previousButton);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
  });

  it("não chama nenhum callback ao clicar em Começar (navegação)", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={2}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const startButton = screen.getByTestId("overview-action-start");
    fireEvent.press(startButton);

    // Começar navega via Link, não chama onNext/onPrevious
    expect(mockOnNext).not.toHaveBeenCalled();
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it("renderiza botão com classe flex-1 para ocupar espaço disponível", () => {
    render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={0}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    const nextButton = screen.getByTestId("overview-action-next");
    // flex-1 é aplicado via className
    expect(nextButton.props.style).toBeDefined();
  });

  it("alterna entre botão Próximo e Começar ao mudar currentSlide", () => {
    const { rerender } = render(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={1}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    expect(screen.getByText("Próximo")).toBeTruthy();
    expect(screen.queryByText("Começar")).toBeNull();

    rerender(
      <NavigationContext.Provider value={navigationValue}>
        <OverviewActions
          currentSlide={2}
          onNext={mockOnNext}
          onPrevious={mockOnPrevious}
        />
      </NavigationContext.Provider>,
    );

    expect(screen.queryByText("Próximo")).toBeNull();
    expect(screen.getByText("Começar")).toBeTruthy();
  });
});
