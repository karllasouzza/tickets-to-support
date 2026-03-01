import React from "react";
import { render, screen } from "@testing-library/react-native";
import { OnboardingContainerItem } from "../../../src/feature/overview/components/onboarding-slide-item";
import { OVERVIEW_PAGES } from "../../../src/feature/overview/utils";

// Mock de useWindowDimensions
jest.mock("react-native", () => {
  const actual = jest.requireActual("react-native");
  return {
    ...actual,
    useWindowDimensions: () => ({
      width: 375,
      height: 812,
      scale: 1,
      fontScale: 1,
    }),
  };
});

describe("OnboardingContainerItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o componente corretamente", () => {
    render(<OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />);

    expect(screen.getByTestId("onboarding-item-container")).toBeTruthy();
  });

  it("renderiza a imagem com dimensões corretas", () => {
    const { getByTestId } = render(
      <OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />,
    );

    const image = getByTestId("onboarding-item-image");
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(OVERVIEW_PAGES[0].content.img);
    expect(image.props.resizeMode).toBe("contain");
  });

  it("renderiza o título do slide", () => {
    render(<OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />);

    const title = screen.getByText(OVERVIEW_PAGES[0].content.title);
    expect(title).toBeTruthy();
  });

  it("renderiza o subtítulo do slide", () => {
    render(<OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />);

    const subtitle = screen.getByText(OVERVIEW_PAGES[0].content.subtitle);
    expect(subtitle).toBeTruthy();
  });

  it("renderiza todos os slides corretamente", () => {
    OVERVIEW_PAGES.forEach((slide, index) => {
      const { getByText } = render(
        <OnboardingContainerItem item={slide} index={index} />,
      );

      expect(getByText(slide.content.title)).toBeTruthy();
      expect(getByText(slide.content.subtitle)).toBeTruthy();
    });
  });

  it("renderiza slide 1 - Gerencie seus tickets", () => {
    render(<OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />);

    expect(screen.getByText("Gerencie seus tickets")).toBeTruthy();
    expect(
      screen.getByText(
        "Acompanhe todos os chamados de suporte em um único lugar, organizados por data de abertura.",
      ),
    ).toBeTruthy();
  });

  it("renderiza slide 2 - Abra chamados rapidamente", () => {
    render(<OnboardingContainerItem item={OVERVIEW_PAGES[1]} index={1} />);

    expect(screen.getByText("Abra chamados rapidamente")).toBeTruthy();
    expect(
      screen.getByText(
        "Crie novos tickets com título, detalhes e prazo de encerramento em poucos segundos.",
      ),
    ).toBeTruthy();
  });

  it("renderiza slide 3 - Visualize sua performance", () => {
    render(<OnboardingContainerItem item={OVERVIEW_PAGES[2]} index={2} />);

    expect(screen.getByText("Visualize sua performance")).toBeTruthy();
    expect(
      screen.getByText(
        "Acompanhe métricas, status dos chamados e os tickets resolvidos mais rapidamente no dashboard.",
      ),
    ).toBeTruthy();
  });

  it("aplica width correta baseado em useWindowDimensions", () => {
    const { getByTestId } = render(
      <OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />,
    );

    const container = getByTestId("onboarding-item-container");
    expect(container.props.style[0].width).toBe(375);
  });

  it("tem gap consistente entre imagem e conteúdo de texto", () => {
    const { getByTestId } = render(
      <OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />,
    );

    const container = getByTestId("onboarding-item-container");
    // gap-6 é aplicado via className
    expect(container.props.className).toContain("gap-6");
  });

  it("texto está centralizado", () => {
    const { getByTestId } = render(
      <OnboardingContainerItem item={OVERVIEW_PAGES[0]} index={0} />,
    );

    const container = getByTestId("onboarding-item-container");
    expect(container.props.className).toContain("items-center");

    const textContent = getByTestId("onboarding-item-text-content");
    expect(textContent.props.className).toContain("items-center");
  });
});
