const useInitialDependencies = (app, bodyParser, helmet, cors, morgan, swaggerUI, swaggerDocument) => {
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

export { useInitialDependencies };
