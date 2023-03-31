import KeyedCollection from "./KeyedCollection";

type ResultSubscriber = (err?: Error) => void

export interface SubscriptionModel {
  subscribe: (fn: ResultSubscriber) => number;
  unsubscribe: (key: number) => void;
}

class SubscriptionManager implements SubscriptionModel {
  private subs = new KeyedCollection<ResultSubscriber>();
  private publishFn?: VoidFunction;

  constructor(publishFn?: VoidFunction) {
    this.publishFn = publishFn;
  }

  publishResult = (err?: Error) => {
    this.subs.iter(fn => fn(err));
    this.publishFn?.();
  }

  subscribe = (fn: ResultSubscriber) => {
    return this.subs.add(fn);
  }

  unsubscribe = (key: number) => {
    this.subs.remove(key);
  }

  getFunctions = () => {
    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe
    }
  }
}

export default SubscriptionManager;