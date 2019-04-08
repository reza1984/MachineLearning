using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using R2.Domain.Context;
using R2.Domain.Repository;
using R2.ML.DeepLearning.Models;

namespace R2.ML.DeepLearning.Database {
  public interface IAppService {
    Task AddBulkUserAsync (List<FollowerViewModel> model);
    Task AddImageAsync (ImageDataSetViewModel model);
    Task RemoveImageAsync (ImageDataSetViewModel model);
    Task<List<UserImage>> GetUserImagesAsync (string userName);
    Task<List<UserImage>> GetAllImagesAsync ();
    Task<string> GetImageFilePathAsync (string identifier);
  }

  public class AppService : IAppService {
    public AppService (IUnitOfWork unitOfWork) {
      UnitOfWork = unitOfWork;
      userRepository = UnitOfWork.GetRepository<User> ();
      imageRepository = UnitOfWork.GetRepository<UserImage> ();
    }

    public IUnitOfWork UnitOfWork { get; }
    private IRepository<User> userRepository;
    private IRepository<UserImage> imageRepository;

    public async Task AddBulkUserAsync (List<FollowerViewModel> model) {
      var newUsers = model.Where (c => !userRepository.Query (d => d.Pk == c.Pk.ToString (), false).Any ());
      var repo = UnitOfWork.GetRepository<User> ();

      await repo.InsertAsync (newUsers.Select (c => new User {
        Application = "INSTAGRAM",
          FullName = c.FullName,
          Pk = c.Pk.ToString (),
          UserName = c.UserName,
      }));
      await UnitOfWork.SaveChangesAsync ();
    }

    public async Task AddImageAsync (ImageDataSetViewModel image) {
      var user = await userRepository.Query (c => c.UserName == image.UserName).FirstOrDefaultAsync ();
      if (user != null) {
        if (user.Images.Any (c => c.Identifier == image.Identifier)) return;

        await imageRepository.InsertAsync (new UserImage {
          Identifier = image.Identifier,
            ImagePath = image.ImageFilePath,
            PictureUrl = image.PictureUrl,
            IsImageLoaded = true,
            UserId = user.Id
        });
        await UnitOfWork.SaveChangesAsync ();
      }
    }

    public async Task<List<UserImage>> GetAllImagesAsync () {
      return await imageRepository.Query (disableTracking: false).Include(c=>c.User).ToListAsync ();
    }

    public async Task<string> GetImageFilePathAsync (string identifier) {
      var image = await imageRepository.Query (c => c.Identifier == identifier, false).FirstOrDefaultAsync ();
      if (image == null) return "";

      return image.ImagePath;
    }

    public async Task<List<UserImage>> GetUserImagesAsync (string userName) {
      var images = imageRepository.Query (c => c.User.UserName == userName, true);
      return await images.ToListAsync () ?? new List<UserImage> ();
    }

    public async Task RemoveImageAsync (ImageDataSetViewModel model) {
      var image = await imageRepository.Query (c => c.User.UserName == model.UserName && c.Identifier == model.Identifier).FirstOrDefaultAsync ();
      if (image == null) return;
      imageRepository.Delete (image);
      await UnitOfWork.SaveChangesAsync ();
    }

  }
}