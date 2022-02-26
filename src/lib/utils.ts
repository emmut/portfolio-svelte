export function mergeClasses(classesA: string, classesB: string): string {
  const a = classesA.split(' ');
  const b = classesB.split(' ');

  return a.concat(b).join(' ');
}
