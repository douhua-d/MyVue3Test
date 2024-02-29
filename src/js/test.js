function limit(count, array, iterateFunc) {
  const tasks = [];
  const doingTasks = [];
  let i = 0;
  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve();
    }
    const task = Promise.resolve().then(() => iterateFunc[i++]);
    tasks.push(task);
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1));
    doingTasks.push(doing);
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve();
    return res.then(enqueue);
  };
  return enqueue().then(() => Promise.all(tasks));
}