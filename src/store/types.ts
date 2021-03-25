export interface UserProps {
  isLogin: boolean;
  _id?: number;
  nickName?: string;
  columnId?: number;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  fitUrl?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: number;
  title: string;
  description: string;
  avatar?: ImageProps
}

export interface PostProps {
  _id: number;
  title: string;
  image?: ImageProps | string;
  content?: string;
  columnId: number;
  createdAt?: string;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
