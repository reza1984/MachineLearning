namespace R2.ML.DeepLearning.TensorFlow.Train.Helpers {
    public interface ITrainLogger {
        void Log (string User, string ImageIdentifier, string PredictPercentage);
    }
}