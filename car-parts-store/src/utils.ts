
export const combineClasses = (...args: (string | undefined)[]) => args.filter(x => !!x).join(' ')