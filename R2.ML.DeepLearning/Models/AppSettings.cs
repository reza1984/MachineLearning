namespace R2.ML.DeepLearning.Models
{
    public class AppSettings
    {
        public string Token { get; set; }
    }

    public class TrainResultViewModel {
        public string User { get; set; }
        public string ImageId { get; set; }
        public float Score { get; set; }
    }
}