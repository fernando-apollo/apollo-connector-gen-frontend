export type OmitNull<T> = T extends object
  ? {
      [K in keyof T]: Exclude<T[K], null>;
    }
  : Exclude<T, null>;

declare const __brand: unique symbol;

export type Brand<K, T> = K & { [__brand]: T };

export type UploadInfo = { filename: string; md5: string; paths: string[] };

export type ResponseItem = {
  id: string;
  name: string;
  path: string;
  value: string;
};

export type Node = {
  title: string;
  key: string;
  isLeaf: boolean;
  children?: Node[];
  parent?: Node;
  disableCheckbox?: boolean;
  checked?: boolean;
};

export type Answers = { [key: string]: string };

export type TreeData = Node[];
