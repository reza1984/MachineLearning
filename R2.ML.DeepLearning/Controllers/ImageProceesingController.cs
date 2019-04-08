using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using R2.ML.DeepLearning.Helper;
using R2.ML.DeepLearning.Models;
//using R2.ML.DeepLearning.Models;

namespace R2.ML.DeepLearning.Controllers {
    [Route ("api/[controller]")]
    public class ImageProceesingController : Controller {
        public ImageProceesingController (IImageProcessing imageProcessing) {
            ImageProcessing = imageProcessing;
        }

        public IImageProcessing ImageProcessing { get; }

        // GET api/imageproceesing/Train
        [HttpGet ("Train")]
        public async Task<ActionResult<List<TrainResultViewModel>>> Train () {
            var result = await ImageProcessing.StartTrain ();
            return result;
        }

        [HttpGet ("Predict/{fileName}")]
        public async Task<ActionResult<object>> Predict (string fileName) {
            return await ImageProcessing.ImageClassification ($@"D:\DeepLearning\R2.ML.DeepLearning\MachineLearningData\{fileName}.jpg");
        }
    }
}