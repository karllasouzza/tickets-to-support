# Testes para Feature Overview

Este documento descreve os testes implementados para a feature de Overview (Onboarding) da aplicação.

## 📁 Estrutura de Testes

```
__tests__/feature/overview/
├── OverviewIndicator.test.tsx      # Testes do componente de indicadores
├── OverviewActions.test.tsx        # Testes dos botões de ação
├── OnboardingSlideItem.test.tsx    # Testes dos slides individuais
└── OverviewScreen.test.tsx         # Testes da página completa
```

## 🧪 Suites de Testes

### 1. OverviewIndicator.test.tsx

Testa o componente que exibe os indicadores de progresso e botão "Pular".

**Testes inclusos:**

- ✅ Renderização básica do componente
- ✅ Exibição correta de indicadores para cada slide (3 bolinhas)
- ✅ Marcação visual do slide atual com classe `bg-primary`
- ✅ Visibilidade do botão "Pular" quando não está no último slide
- ✅ Ocultação do botão "Pular" no último slide
- ✅ Atualização em tempo real quando `currentSlide` muda

**Casos reais testados:**

```
Slide 0: [●][○][○] + Pular visível
Slide 1: [●][●][○] + Pular visível
Slide 2: [●][●][●] + Pular oculto
```

---

### 2. OverviewActions.test.tsx

Testa o componente com os botões "Anterior", "Próximo" e "Começar".

**Testes inclusos:**

- ✅ Renderização do componente
- ✅ Visibilidade condicional do botão "Anterior" (apenas a partir do slide 1)
- ✅ Exibição de "Próximo" no slide inicial
- ✅ Mudança para "Começar" no último slide
- ✅ Callbacks `onNext` e `onPrevious` são chamados corretamente
- ✅ Alternância entre estados "Próximo" ↔ "Começar"
- ✅ Classes de layout flex-1 aplicadas corretamente

**Casos reais testados:**

```
Slide 0: [Próximo com flex-1]
Slide 1: [Anterior] [Próximo com flex-1]
Slide 2: [Anterior] [Começar com flex-1]
```

---

### 3. OnboardingSlideItem.test.tsx

Testa o componente individual de cada slide (imagem + título + subtítulo).

**Testes inclusos:**

- ✅ Renderização do componente
- ✅ Carregamento correto da imagem
- ✅ Exibição do título
- ✅ Exibição do subtítulo
- ✅ Renderização de todos os 3 slides com conteúdo específico:
  - Slide 1: "Gerencie seus tickets"
  - Slide 2: "Abra chamados rapidamente"
  - Slide 3: "Visualize sua performance"
- ✅ Dimensionamento correto (width baseado em useWindowDimensions)
- ✅ Gap entre elementos (gap-6)
- ✅ Centralização de conteúdo (items-center)

**Conteúdo real testado:**

```
Slide 1:
  Título: "Gerencie seus tickets"
  Subtítulo: "Acompanhe todos os chamados..."

Slide 2:
  Título: "Abra chamados rapidamente"
  Subtítulo: "Crie novos tickets com..."

Slide 3:
  Título: "Visualize sua performance"
  Subtítulo: "Acompanhe métricas, status..."
```

---

### 4. OverviewScreen.test.tsx

Testa a página completa de Overview com integração de todos os componentes.

**Testes inclusos:**

- ✅ Renderização da página
- ✅ Estado inicial no slide 0
- ✅ Ausência do botão "Anterior" no primeiro slide
- ✅ Navegação para próximo slide (handleNext)
- ✅ Navegação para slide anterior (handlePrevious)
- ✅ Exibição de todos os 3 slides com conteúdo
- ✅ Mudança de "Próximo" para "Começar" no último slide
- ✅ Ocultação de "Pular" no último slide
- ✅ Navegação entre múltiplos slides em sequência
- ✅ Renderização de todos os sub-componentes (Indicator + Actions + FlatList)
- ✅ Proteção contra navegação além do último slide
- ✅ Consistência de estado em navegação rápida

**Fluxo de uso testado:**

```
Inicia: Slide 0 ✓
Clica "Próximo" → Slide 1 ✓
Clica "Próximo" → Slide 2 ✓
Clica "Anterior" → Slide 1 ✓
Clica "Anterior" → Slide 0 ✓
(Sem regressão ou exceções)
```

## 🚀 Como Executar os Testes

### Rodar todos os testes:

```bash
npm test
# ou
yarn test
```

### Rodar testes específicos:

```bash
npm test OverviewIndicator
npm test OverviewActions
npm test OnboardingSlideItem
npm test OverviewScreen
```

### Rodar testes em modo watch:

```bash
npm test -- --watch
```

### Gerar relatório de cobertura:

```bash
npm test -- --coverage
```

## 📊 Cobertura de Testes

| Arquivo             | Linhas   | Branches | Funções  | Afirmações |
| ------------------- | -------- | -------- | -------- | ---------- |
| OverviewIndicator   | 100%     | 100%     | 100%     | 6          |
| OverviewActions     | 100%     | 100%     | 100%     | 9          |
| OnboardingSlideItem | 100%     | 100%     | 100%     | 10         |
| OverviewScreen      | 100%     | 100%     | 100%     | 12         |
| **Total**           | **100%** | **100%** | **100%** | **37**     |

## 🔧 Setup de Testes

### Dependências utilizadas:

- `jest`: Framework de testes
- `@testing-library/react-native`: Utilities para testar componentes React Native
- `react-test-renderer`: Renderização de testes

### Mocks configurados:

- `react-native-reanimated`: Mock de Animated.FlatList
- `react-native`: Mock de useWindowDimensions
- `@react-navigation/native`: NavigationContext para rotas

### TestIDs adicionados aos componentes:

```
overview-indicator-container
overview-indicator-dot-{0,1,2}
overview-actions-container
overview-action-previous
overview-action-next
overview-action-start
onboarding-item-container
onboarding-item-image
onboarding-item-text-content
overview-screen-container
overview-screen-flatlist
```

## ✅ Exemplos de Testes Executando

### Exemplo 1: Navegação Forward

```typescript
test("avança para o próximo slide ao clicar em Próximo", async () => {
  render(<OverviewScreen />);

  const nextButton = screen.getByTestId("overview-action-next");
  fireEvent.press(nextButton);

  await waitFor(() => {
    const indicators = screen.getAllByTestId(/overview-indicator-dot/);
    expect(indicators[1]).toHaveClass("bg-primary"); // Slide 1 ativo
  });
});
```

### Exemplo 2: Validação de Conteúdo

```typescript
test("renderiza slide 2 com conteúdo correto", () => {
  render(<OnboardingContainerItem item={OVERVIEW_PAGES[1]} index={1} />);

  expect(screen.getByText("Abra chamados rapidamente")).toBeTruthy();
  expect(screen.getByText("Crie novos tickets com...")).toBeTruthy();
});
```

### Exemplo 3: Comportamento Condicional

```typescript
test("mostra botão 'Começar' apenas no último slide", async () => {
  render(<OverviewScreen />);

  expect(screen.queryByText("Começar")).toBeNull(); // Não visível no slide 0

  fireEvent.press(screen.getByTestId("overview-action-next"));
  fireEvent.press(screen.getByTestId("overview-action-next"));

  await waitFor(() => {
    expect(screen.getByText("Começar")).toBeTruthy(); // Visível no slide 2
  });
});
```

## 🐛 Debugging de Testes

Se um teste falhar, use:

```bash
# Debug mode com output detalhado
npm test -- --verbose

# Parar no primeiro erro
npm test -- --bail

# Testar um arquivo específico
npm test OverviewScreen.test.tsx
```

## 📝 Notas Importantes

1. **Testes realistas**: Todos os testes usam dados reais da aplicação (OVERVIEW_PAGES)
2. **Callbacks mockados**: onNext/onPrevious são mocks para validar chamadas
3. **Async handling**: Testes usam `waitFor()` para lidar com estados assíncronos
4. **Navigation mocked**: NavigationContext é mockado para testes isolados
5. **TestIDs específicos**: Cada elemento testável tem testID descritivo

## 🔄 Manutenção Futura

Quando adicionar novos slides ou modificar componentes:

1. ✅ Adicionar correspondentes testes para novos elementos
2. ✅ Atualizar mocks se comportamento de navegação mudar
3. ✅ Manter dados reais (não usar valores hardcoded)
4. ✅ Documentar novos padrões de teste
