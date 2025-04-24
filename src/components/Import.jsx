const importAll = (r) => {
  const images = {};
  Object.entries(r).forEach(([path, module]) => {
    const key = path.split('/').pop().replace(/\.(png|jpe?g|svg)$/, '');
    images[key] = module.default;
  });
  return images;
};

export const images = importAll(import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg}', { eager: true }));