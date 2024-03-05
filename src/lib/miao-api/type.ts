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
  info: Info;
  selectedPhotos: SelectedPhoto[];
  tags: SelectedPhoto[];
  coverPhoto: CoverPhoto;
}

export interface Info {
  status: string;
  name: string;
  species: string;
  isNeuter: boolean;
  description: string;
  haunt: string;
}

export interface SelectedPhoto {}

export interface SearchResult {
  id: number;
  name: string;
  description: string;
  haunt: string;
  coverPhoto: CoverPhoto;
}
