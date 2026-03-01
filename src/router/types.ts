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
  Home:
    | {
        createdTicketId?: string;
        refreshToken?: number;
      }
    | undefined;
  CreateTicket: undefined;
  DashboardScreen: undefined;
};

export type AuthenticatedRoutesParamList = {
  Tabs: undefined;
  TicketDetail: { ticketId: string };
};
