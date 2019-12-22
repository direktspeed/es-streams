/*
const isBrowser = window !== 'undefined'
const writable = fs.createWriteStream('./file');




const me = (async function () {
  for await (const chunk of iterator) {
    // Handle backpressure on write().
    if (!writable.write(chunk))
      await once(writable, 'drain');
  }
  writable.end();
  // Ensure completion without errors.
  await finished(writable);
})();
*/