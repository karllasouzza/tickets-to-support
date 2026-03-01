# Tickets to Support

Aplicativo mobile em React Native para gestão de tickets de suporte com persistência local.

## Visão geral

Este projeto implementa um fluxo de autenticação local e um app autenticado com:

- Lista de tickets
- Criação de ticket
- Detalhes e encerramento de ticket
- Dashboard com métricas e visualizações

## Tecnologias

### Core

- React Native 0.82
- React 19
- TypeScript
- React Navigation (stack + bottom tabs)

### Estado e persistência

- Legend State
- MMKV (persistência local)

### Formulários e validação

- React Hook Form
- Zod

### UI e experiência

- NativeWind (Tailwind para React Native)
- rn-primitives
- Lucide React Native (ícones)
- Sonner Native (toasts)

### Dados e visualização

- react-native-gifted-charts (gráfico de pizza)
- FlatList/LegendList (listas e carrossel)

## Estrutura principal

- src/router: rotas públicas e autenticadas
- src/data/states: estados e persistência local
- src/feature: módulos por domínio (overview, auth, tickets, dashboard)
- src/components: componentes de UI e layouts compartilhados

## Como rodar

### Pré-requisitos

- Node >= 20
- Yarn
- Ambiente React Native configurado para Android/iOS

### Comandos

```bash
yarn
yarn start
yarn android
# ou
yarn ios
```

## Tabela de acompanhamento (status)

| Área         | Item                                                            | Status   | Observação                    |
| ------------ | --------------------------------------------------------------- | -------- | ----------------------------- |
| Arquitetura  | TypeScript + componentes funcionais + hooks                     | ✅ Feito | Estrutura modular por feature |
| Persistência | Dados locais sem API externa                                    | ✅ Feito | Legend State + MMKV           |
| Autenticação | Fluxo não autenticado + autenticado                             | ✅ Feito | Rotas separadas no router     |
| Tickets      | Listagem com ordenação por data (desc)                          | ✅ Feito | Ordenação por createdAt       |
| Tickets      | Criação de ticket                                               | ✅ Feito | Cria e redireciona para lista |
| Tickets      | Detalhe e alteração de status                                   | ✅ Feito | Atualização no estado local   |
| Encerramento | Descrição de encerramento obrigatória para status de fechamento | ✅ Feito | Validação com RHF + Zod       |
| Dashboard    | Pizza por status + métricas + top 5                             | ✅ Feito | Métricas e carrossel          |

## Registro de ações e decisões

### Arquitetura

Resumo da arquitetura adotada:

- Eu decidi implementar uma arquitetura baseada em funcionalidades principalmente pela organização e distribuição de responsabilidades entre cada uma das features. Decidi exandir algumas cosias alem do pedido e utilizar tecnologias novas e focadas em desenpenho que explicarei abaixo.

### Tecnologias

Principalmente eu trouxe o Legend State juntamente com o MMKV que trazem muita performance e possibilitam a sincronização fácil com qualquer banco ou api externa. Escolhi usar o Legend List na lista de ticks também focando em ganho de performance.
Utilizei o Nativewind junto com o react native reusables para padronizar o layout e permitir uma melhor consistência entre telas e componentes de UI.
Utilizei o zod junto com react hook forms para validar e garantir que os dados dos formulários sejam consistentes e que as regras de negócio sejam respeitadas.
Utilizei algumas imagens geradas por IA para dar uma cara mais realista ao app.

## Considerações finais

Adorei o desafio, gosto sempre de estar desenvolvendo, seja no front, back ou mobile. Espero que gostem do app e se quiserem conversar sobre ou tirar alguma duvida, fiquem a vontade.
