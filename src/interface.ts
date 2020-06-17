export interface User {
  name: string;
  userId: string;
  ip: string | null;
  memberIcon: number;
}

export interface Guest {
  name: string;
  password: string;
}

export interface GuestPassword {
  password: string;
}

export interface Member {
  userId: string;
}

export function isGuest(data: any): data is Guest {
  return data.userId === undefined;
}

export function isMember(data: any): data is Member {
  return data.userId !== undefined;
}
