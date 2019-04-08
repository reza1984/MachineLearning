using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using InstaSharper.API;
using InstaSharper.API.Builder;
using InstaSharper.Classes;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using R2.ML.DeepLearning.Database;
using R2.ML.DeepLearning.Helper;
using R2.ML.DeepLearning.Models;
namespace R2.ML.DeepLearning.Controllers {
  [Route ("api/[controller]")]
  public class InstagramController : Controller {

    private string profileImageDirectory;

    public IAppService appService { get; }

    // public IInstaApi InstaApi;
    public IInstagramHelper Instagram { get; }

    public InstagramController (
      IAppService appService,
      IInstagramHelper instagram,
      IHostingEnvironment env) {
      this.appService = appService;
      Instagram = instagram;
      Instagram.MachineLerningDirectory = Path.Combine (env.ContentRootPath, "MachineLearningData");
      profileImageDirectory = Path.Combine (instagram.MachineLerningDirectory, "ProfileImages");
    }

    [HttpPost ("Login")]
    public async Task<ActionResult<LoginStates>> Login ([FromBody] LoginViewModel model) {
      return await Instagram.LoginAsync (model);
    }

    [HttpPost ("TwoFactor")]
    public async Task<ActionResult<LoginStates>> TwoFactor ([FromBody] LoginViewModel model) {
      return await Instagram.CodeVerificationAsync (model);
    }

    // GET api/instagram
    [HttpGet ("")]
    public async Task<ActionResult<LoginStates>> CheckLoginState () {
      return await Instagram.CheckStateAsync ();
    }

    [HttpGet ("Followers")]
    public async Task<ActionResult<List<FollowerViewModel>>> Followers () {
      var result = await Instagram.GetFollowersAsync ();
      await appService.AddBulkUserAsync (result.Value);

      return result;
    }

    [HttpGet ("Follower/{userName}")]
    public async Task<List<ImageViewModel>> FollowerImages (string userName) {
      return await Instagram.GetFollowerImagesAsync (userName);
    }

    [HttpPost ("SaveFollowerImage")]
    public async Task<ActionResult<bool>> SaveFollowerImage ([FromBody] SaveImageViewModel image) {
      try {
        var wc = new System.Net.WebClient ();

        var SaveDirectoryPath = Path.Combine (profileImageDirectory, image.UserName);
        if (!System.IO.Directory.Exists (SaveDirectoryPath)) {
          System.IO.Directory.CreateDirectory (SaveDirectoryPath);
        }
        var filePath = Path.Combine (SaveDirectoryPath, $"{image.InstaIdentifier}.jpg");
        wc.DownloadFileAsync (new Uri (image.PictureUrl), filePath);

        await appService.AddImageAsync (new ImageDataSetViewModel {
          ImageFilePath = filePath,
            PictureUrl = image.PictureUrl,
            Identifier = image.InstaIdentifier,
            UserName = image.UserName
        });

        return true;
      } catch (System.Exception ex) {
        return BadRequest (ex);
      }
    }

    [HttpPost ("DeleteFollowerImage")]
    public async Task<ActionResult<bool>> DeleteFollowerImage ([FromBody] ImageViewModel image) {
      try {
        var SaveDirectoryPath = Path.Combine (profileImageDirectory, image.UserName);
        var filePath = Path.Combine (SaveDirectoryPath, $"{image.InstaIdentifier}.jpg");
        if (System.IO.File.Exists (filePath)) {
          System.IO.File.Delete (filePath);
        }

        // await Instagram.RemoveFromDataSet ();

        await appService.RemoveImageAsync (new ImageDataSetViewModel {
          Identifier = image.InstaIdentifier,
            UserName = image.UserName
        });

        return true;
      } catch (System.Exception ex) {
        return BadRequest (ex);
      }
    }

  }

  // // GET api/instagram/5
  // [HttpGet("{id}")]
  // public ActionResult<string> GetById(int id)
  // {
  //     return "value" + id;
  // }

  // // POST api/instagram
  // [HttpPost("")]
  // public void Post([FromBody] string value) { }

  // // PUT api/instagram/5
  // [HttpPut("{id}")]
  // public void Put(int id, [FromBody] string value) { }

  // // DELETE api/instagram/5
  // [HttpDelete("{id}")]
  // public void DeleteById(int id) { }
}