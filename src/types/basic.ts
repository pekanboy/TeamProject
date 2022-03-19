import {Dispatch, SetStateAction} from 'react';

export type Nullable<T> = T | null;

// eslint-disable-next-line no-unused-vars
export type Setter<T> = Dispatch<SetStateAction<T>>;
