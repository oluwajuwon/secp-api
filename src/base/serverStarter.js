export const startServer = (app) => {
  const PORT = process.env.PORT || 8001;

  app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
  });
};
