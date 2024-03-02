export type FearAndGreedResponse = {
  name: string;
  data: FearAndGreedData[];
  metadata: {
    error: null | string;
  };
};

export type FearAndGreedData = {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update: string;
};
