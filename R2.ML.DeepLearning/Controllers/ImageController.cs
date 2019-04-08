using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using R2.ML.DeepLearning.Database;
//using R2.ML.DeepLearning.Models;

namespace R2.ML.DeepLearning.Controllers {
    [Route ("api/[controller]")]
    public class ImageController : Controller {
        public IAppService appService { get; }

        public ImageController (IAppService appService) {
            this.appService = appService;
        }

        // GET api/image
        [HttpGet ("")]
        public ActionResult<IEnumerable<string>> Gets () {
            return new string[] { "value1", "value2" };
        }

        // GET api/image/5
        [HttpGet ("{id}")]
        public async Task<FileStreamResult> GetById (string id) {
            var imageFilePath = await appService.GetImageFilePathAsync (id);

            Stream stream = new MemoryStream (System.IO.File.ReadAllBytes (imageFilePath));
            return new FileStreamResult (stream, "image/jpeg");
        }

        // POST api/image
        [HttpPost ("")]
        public void Post ([FromBody] string value) { }

        // PUT api/image/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE api/image/5
        [HttpDelete ("{id}")]
        public void DeleteById (int id) { }
    }
}