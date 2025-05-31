export interface FactoryItem {
  label: string;
  type: string;
}

export interface IFactory<T extends FactoryItem = FactoryItem> {
  register(type: string, item: T): void;
  getRegistered(type: string): T | undefined;
  getAllRegistered(): T[];
  getFirstRegisteredItem(): T | undefined;
}
