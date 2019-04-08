using System.IO;
using System.Linq;
using Microsoft.ML;
using Microsoft.ML.Core.Data;
using Microsoft.ML.Data;
using R2.ML.DeepLearning.TensorFlow.Train.Models;
using static R2.ML.DeepLearning.TensorFlow.Train.Helpers.ConsoleHelpers;

namespace R2.ML.DeepLearning.TensorFlow.Predict {
    public class ModelScorer {
        private readonly string dataLocation;
        private readonly string imagesFolder;
        private readonly string modelLocation;
        private readonly MLContext mlContext;
        private string openCVFrontFace;
        private string openCVEyeGlass;

        public ModelScorer (string modelLocation, string OpenCVFrontFace, string OpenCVEyeGlass) {
            this.openCVEyeGlass = OpenCVEyeGlass;
            this.openCVFrontFace = OpenCVFrontFace;
            this.modelLocation = modelLocation;
            mlContext = new MLContext (seed: 1);
        }

        public ImageNetDataProbability ClassifyImage (string imagePath) {
            ConsoleWriteHeader ("Loading model");
            System.Console.WriteLine ($"Model loaded: {modelLocation}");

            // var bgrFrame = VideoCapture.FromFile (imagePath);

            // bgrFrame.
            // Load the model
            ITransformer loadedModel;
            using (var f = new FileStream (modelLocation, FileMode.Open))
            loadedModel = mlContext.Model.Load (f);

            // Make prediction function (input = ImageNetData, output = ImageNetPrediction)
            var predictor = loadedModel.CreatePredictionEngine<ImageNetData, ImageNetPrediction> (mlContext);
            // Read csv file into List<ImageNetData>
            // var testData = ImageNetData.ReadFromCsv (dataLocation, imagesFolder).ToList ();
            ConsoleWriteHeader ("Making classifications");
            // There is a bug (https://github.com/dotnet/machinelearning/issues/1138),
            // that always buffers the response from the predictor
            // so we have to make a copy-by-value op everytime we get a response
            // from the predictor

            var predict = predictor.Predict (new ImageNetData { ImagePath = imagePath });
            return new ImageNetDataProbability {
                Label = predict.PredictedLabelValue,
                    Probability = predict.Score.Max ()
            };

        }
    }
}