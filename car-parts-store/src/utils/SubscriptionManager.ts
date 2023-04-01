import { useEffect, useRef } from "react";
import KeyedCollection from "./KeyedCollection";

type ResultSubscriber = (err?: Error) => void

export const useSubscriptionModel = (onComplete: VoidFunction, subscribe: (fn: ResultSubscriber) => number, unsubscribe: (key: number) => void) => {
  const error = useRef<Error | undefined>();
  useEffect(() => {
    const key = subscribe(err => {
      error.current = err;
      if (!err)
        onComplete();
    })
    return () => unsubscribe(key)
  }, [onComplete, subscribe, unsubscribe])
  return error;
}

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