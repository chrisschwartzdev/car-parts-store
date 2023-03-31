
export const combineClasses = (...args: (string | undefined)[]) => args.filter(x => !!x).join(' ')

export const delay = (time: number) => new Promise(x => setTimeout(x, time));
