const useInitialDependencies = (app, bodyParser, helmet, cors, morgan) => {
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));
};

export { useInitialDependencies };
