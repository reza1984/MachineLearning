using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using R2.ML.DeepLearning.Database;
using R2.ML.DeepLearning.Models;
using R2.ML.DeepLearning.TensorFlow.Predict;
using R2.ML.DeepLearning.TensorFlow.Train;
using R2.ML.DeepLearning.TensorFlow.Train.Models;

namespace R2.ML.DeepLearning.Helper {
    public interface IImageProcessing {
        Task<List<TrainResultViewModel>> StartTrain ();
        Task<ImageNetDataProbability> ImageClassification (string path);
    }

    public class ImageProcessing : IImageProcessing {

        public ImageProcessing (IInstagramHelper instagram, IAppService appService) {
            Instagram = instagram;
            this.appService = appService;
        }

        public IInstagramHelper Instagram { get; }
        public IAppService appService { get; }

        public async Task<ImageNetDataProbability> ImageClassification (string imagePath) {
            var imageClassifierZip = Path.Combine (Instagram.MachineLerningDirectory, "outputs", "imageClassifier.zip");
            var frontFace = Path.Combine (Instagram.MachineLerningDirectory, "FaceDetectionDatas", "haarcascade_frontalface_alt.xml");
            var eyeGlass = Path.Combine (Instagram.MachineLerningDirectory, "FaceDetectionDatas", "haarcascade_eye_tree_eyeglasses.xml");

            return await Task.Run (() => {
                var modelScorer = new ModelScorer (imageClassifierZip, frontFace, eyeGlass);
                return modelScorer.ClassifyImage (imagePath);
            });
        }

        public async Task<List<TrainResultViewModel>> StartTrain () {
            // var tagsTsv = Path.Combine (Instagram.MachineLerningDirectory, "images.tsv");
            var imagesFolder = Path.Combine (Instagram.MachineLerningDirectory, "ProfileImages");
            var inceptionPb = Path.Combine (Instagram.MachineLerningDirectory, "inception", "tensorflow_inception_graph.pb");
            var imageClassifierZip = Path.Combine (Instagram.MachineLerningDirectory, "outputs", "imageClassifier.zip");

            return await Task.Run (async () => {
                var tagsTsv = await CreatTsvFile ();
                var modelBuilder = new ModelBuilder (tagsTsv, imagesFolder, inceptionPb, imageClassifierZip);
                return modelBuilder.BuildAndTrain ()
                    .Select (c => new TrainResultViewModel {
                        User = c.Label,
                            ImageId = c.Identifier,
                            Score = c.Score.Max ()
                    }).ToList ();
            });
        }

        private async Task<string> CreatTsvFile () {
            var tagsTsv = Path.Combine (Instagram.MachineLerningDirectory, "images.tsv");

            var images = await appService.GetAllImagesAsync ();
            var sb = new StringBuilder ();
            images.ForEach (c => sb.AppendLine ($"{c.User.UserName}\\{c.Identifier}.jpg\t{c.User.FullName}\t{c.Identifier}"));
            await File.WriteAllTextAsync (tagsTsv, sb.ToString ());
            return (tagsTsv);
        }

    }

}