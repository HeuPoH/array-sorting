import type { FactoryItem, IFactory } from './types';

export class Factory<T extends FactoryItem = FactoryItem> implements IFactory<T> {
  private items = new Map<string, T>();

  register(type: string, item: T): void {
    if (this.items.has(type)) {
      throw new Error(`${type} уже зарегистрирован'`);
    }

    this.items.set(type, item);
  }

  getRegistered(type: string): T | undefined {
    const regItem = this.items.get(type);
    if (!regItem) {
      throw new Error(`${type} не зарегистрирован`);
    }

    return regItem;
  }

  getAllRegistered(): T[] {
    return [...this.items.values()];
  }

  getFirstRegisteredItem(): T | undefined {
    return this.items.values().next().value;
  }
}
