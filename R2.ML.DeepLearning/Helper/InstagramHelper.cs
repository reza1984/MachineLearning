using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using InstaSharper.API;
using InstaSharper.API.Builder;
using InstaSharper.Classes;
using InstaSharper.Classes.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using R2.ML.DeepLearning.Database;
using R2.ML.DeepLearning.Models;

namespace R2.ML.DeepLearning.Helper {
    public interface IInstagramHelper {
        string MachineLerningDirectory { get; set; }
        Task<ActionResult<LoginStates>> CheckStateAsync ();
        Task<ActionResult<LoginStates>> LoginAsync (LoginViewModel model);
        Task<ActionResult<LoginStates>> CodeVerificationAsync (LoginViewModel model);
        Task<ActionResult<List<FollowerViewModel>>> GetFollowersAsync ();
        Task<List<ImageViewModel>> GetFollowerImagesAsync (string userName);
        Task AddToDataSet (ImageDataSetViewModel data);
        Task RemoveFromDataSet (ImageDataSetViewModel data);
    }
    public class InstagramHelper : IInstagramHelper {
        public string MachineLerningDirectory { get; set; }
        private string DataSetPath {
            get { return Path.Combine (MachineLerningDirectory, "ImageDataSet.txt"); }
        }

        public IAppService appService { get; }

        private readonly string StateFile;
        private IInstaApi InstaApi;

        public InstagramHelper (IHostingEnvironment env, IAppService appService) {
            StateFile = Path.Combine (env.ContentRootPath, "instagramSession.bin");
            this.appService = appService;
        }

        public async Task<ActionResult<LoginStates>> CheckStateAsync () {
            try {
                var userSession = new UserSessionData {
                    UserName = "",
                    Password = ""
                };

                InstaApi = InstaApiBuilder.CreateBuilder ()
                    .SetUser (userSession)
                    .SetRequestDelay (RequestDelay.FromSeconds (1, 2))
                    .Build ();

                LoadSession ();

                if (!InstaApi.IsUserAuthenticated) {
                    var logInResult = await InstaApi.LoginAsync ();
                    if (logInResult.Succeeded) {
                        return LoginStates.LogedIn;
                    } else {
                        if (logInResult.Value == InstaLoginResult.TwoFactorRequired) {
                            return LoginStates.TwoFactorRequired;
                        }
                    }
                } else {
                    return LoginStates.LogedIn;
                }

            } catch (Exception e) {
                Console.WriteLine (e);
            }

            return LoginStates.NeedLogin;
        }

        public async Task<ActionResult<List<FollowerViewModel>>> GetFollowersAsync () {
            var user = await InstaApi.GetCurrentUserAsync ();
            var followers = await InstaApi.GetUserFollowersAsync (user.Value.UserName, PaginationParameters.MaxPagesToLoad (int.MaxValue));

            var result = followers.Value.Select (f => new FollowerViewModel {
                Pk = f.Pk,
                    FullName = f.FullName.Length > 0 ? f.FullName : f.UserName,
                    UserName = f.UserName,
                    PictureUrl = f.ProfilePicture
            }).ToList ();

            return result;
        }

        public async Task<List<ImageViewModel>> GetFollowerImagesAsync (string userName) {
            var ds = await appService.GetUserImagesAsync (userName);
            var followerMediaList = await InstaApi.GetUserMediaAsync (userName, PaginationParameters.MaxPagesToLoad (int.MaxValue));
            var result = followerMediaList.Value
                .Where (media => media.MediaType == InstaMediaType.Image)
                .Select (media => new ImageViewModel {
                    PictureUrl = media.Images.FirstOrDefault ().URI,
                        TakenAt = media.TakenAt.Date.ToString (),
                        InstaIdentifier = media.InstaIdentifier,
                        IsImageAdded = ds.Any (c => c.Identifier == media.InstaIdentifier)
                }).ToList ();

            return result;
        }

        #region  DataSet
        public async Task AddToDataSet (ImageDataSetViewModel image) {
            await appService.AddImageAsync (image);
        }
        public async Task RemoveFromDataSet (ImageDataSetViewModel model) {
            await appService.RemoveImageAsync (model);
        }
        #endregion
        #region Login
        public async Task<ActionResult<LoginStates>> LoginAsync (LoginViewModel model) {
            var userSession = new UserSessionData {
                UserName = model.UserName,
                Password = model.Password
            };
            InstaApi = InstaApiBuilder.CreateBuilder ()
                .SetUser (userSession)
                .SetRequestDelay (RequestDelay.FromSeconds (1, 2))
                .Build ();

            try {
                if (!InstaApi.IsUserAuthenticated) {
                    var logInResult = await InstaApi.LoginAsync ();
                    if (logInResult.Succeeded) {
                        // Save session
                        SaveSession ();
                        return LoginStates.LogedIn;
                    } else {
                        // two factor is required
                        if (logInResult.Value == InstaLoginResult.TwoFactorRequired) {
                            return LoginStates.TwoFactorRequired;
                        }
                    }
                }
            } catch (System.Exception) { }
            return LoginStates.NeedLogin;
        }

        public async Task<ActionResult<LoginStates>> CodeVerificationAsync (LoginViewModel model) {
            var twoFactorLogin = await InstaApi.TwoFactorLoginAsync (model.Code);
            if (twoFactorLogin.Succeeded) {
                SaveSession ();
                return LoginStates.LogedIn;
            }
            return LoginStates.NeedLogin;
        }
        #endregion

        #region Private Methods
        void LoadSession () {
            try {
                if (System.IO.File.Exists (StateFile)) {
                    using (var fs = System.IO.File.OpenRead (StateFile)) {
                        InstaApi.LoadStateDataFromStream (fs);
                    }
                }
            } catch (Exception) { }
        }

        void SaveSession () {
            if (InstaApi == null)
                return;
            var state = InstaApi.GetStateDataAsStream ();
            using (var fileStream = System.IO.File.Create (StateFile)) {
                state.Seek (0, SeekOrigin.Begin);
                state.CopyTo (fileStream);
            }
        }
        #endregion
    }
}