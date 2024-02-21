export interface LoginRespond {
  role: string;
  nickName: string;
  avatarFileName: string;
  id: number;
  points: number;
  token: string;
}

export interface CatList {
  id: number;
  name: string;
  description: string;
  haunt: string;
  coverPhoto?: CoverPhoto;
}

export interface CoverPhoto {
  id: number;
  rawFileName: string;
  fileName: string;
  createdDate: string;
  comment: string;
  userID: number;
  likeableEntityID: number;
  commentsAreaID: number;
}

export interface SettingQuery {
  key: string;
  nullable: boolean;
}

export interface Settings {
  [key: string]: string;
}
