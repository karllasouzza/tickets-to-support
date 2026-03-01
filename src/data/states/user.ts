import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { generateId } from "../utils";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  remember?: boolean;
};

export const user$ = observable<User | null>(null);

syncObservable(user$, {
  persist: {
    name: "user",
    plugin: ObservablePersistMMKV,
  },
});

export function createUser(data: Omit<User, "id">): User {
  const newUser: User = { id: generateId(), ...data };
  user$.set(newUser);
  return newUser;
}

export function getUser(): User | null {
  return user$.get();
}

export function updateUser(data: Partial<Omit<User, "id">>): User | null {
  const current = user$.get();
  if (!current) return null;
  user$.set({ ...current, ...data });
  return user$.get();
}

export function deleteUser(): void {
  user$.set(null);
}
