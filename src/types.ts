export interface CursorPagination {
  currentCursor: number
  pageSize: number
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Provider {
  GOOGLE = 'google',
}

export enum FeedType {
  LOOK_FOR_MENTO = 'LOOK_FOR_MENTO',
  LOOK_FOR_MENTEE = 'LOOK_FOR_MENTEE',
}

export enum UserState {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
}

export enum UserLevel {
  NEWBIE = 'NEWBIE',
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
}
