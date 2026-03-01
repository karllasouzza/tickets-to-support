export type RootStackParamList = {
  PublicRoutes: undefined;
  AuthenticatedRoutes: undefined;
};

export type PublicRoutesParamList = {
  Overview: undefined;
  Auth: undefined;
  CreateAccount: undefined;
  Login: undefined;
};

export type AuthenticatedTabsParamList = {
  Home: undefined;
  CreateTicket: undefined;
  DashboardScreen: undefined;
  Profile: undefined;
};

export type AuthenticatedRoutesParamList = {
  Tabs: undefined;
  TicketDetail: { ticketId: string };
};
