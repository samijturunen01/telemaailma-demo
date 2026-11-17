/** Resolve a file in /public against the deployment base path. */
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`
