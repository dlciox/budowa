const importAll = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    const key = item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
    images[key] = new URL(`../assets${item.replace('.')}`, import.meta.url).href;
  });
  return images;
};

export const images = importAll(import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true }));