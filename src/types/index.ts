export interface WithId {
  id: Id;
}

export type Id = (string | number) & { readonly Id: unique symbol };

export const toId = (id: Omit<Id, 'Id'>): Id => id as Id;

export type NotEmptyArray<T> = [T, ...Array<T>];

export type ObjectValue<TObject extends object> = TObject[keyof TObject];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArrayElement<TElements extends Array<any>> = TElements extends Array<infer TElement> ? TElement : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionCallback = (...args: Array<any>) => Promise<void> | void;

export type Nil = null | undefined;

export type AddTypeForFields<Object extends object, Keys extends keyof Object, AdditionalType> = {
  [Key in keyof Object]: Key extends Keys ? Object[Key] | AdditionalType : Object[Key];
};
