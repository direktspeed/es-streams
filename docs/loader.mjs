const baseURL = new URL('file://');
baseURL.pathname = `${process.cwd()}/`;

export async function resolve(specifier,
                              parentModuleURL = baseURL,
                              defaultResolver) {
  const url = new URL(specifier, parentModuleURL).href
  console.log('load: ', url)
  return { url, format: 'esm' };
}
