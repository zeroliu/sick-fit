export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Recodify<T> = { [P in keyof T]: T[P] };
