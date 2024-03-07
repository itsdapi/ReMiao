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

export interface RespondErrorType {
  msg: string;
  status: number;
}

export interface CatDetail {
  info: CatInfo;
  selectedPhotos: SelectedPhoto[];
  tags: Tag[];
  coverPhoto: CoverPhoto;
}

export interface Tag {
  id: number;
  name: string;
  createdDate: Date;
}

export interface CatInfo {
  status: string;
  name: string;
  species: string;
  isNeuter: boolean;
  description: string;
  haunt: string;
}

export interface SelectedPhoto extends CoverPhoto {}

export interface SearchResult {
  id: number;
  name: string;
  description: string;
  haunt: string;
  coverPhoto: CoverPhoto;
}

export interface UserInfo {
  createdDate: Date;
  lastLoginDate: Date;
  role: string;
  nickName: string;
  avatarFileName: string;
  id: number;
  points: number;
}

export interface QrCode {
  image: string;
}

export interface UploadTokenRespond {
  url: string;
  params: object;
}
