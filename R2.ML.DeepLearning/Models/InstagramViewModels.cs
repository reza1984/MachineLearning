namespace R2.ML.DeepLearning.Models {
  public class LoginViewModel {
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Code { get; set; }
  }

  public class FollowerViewModel {
    public long Pk { get; set; }
    public string FullName { get; set; }
    public string PictureUrl { get; set; }
    public string UserName { get; set; }
  }

  public class ImageViewModel {
    public string PictureUrl { get; set; }
    public string TakenAt { get; set; }
    public string InstaIdentifier { get; set; }
    public string UserName { get; set; }
    public bool? IsImageAdded { get; set; }
  }

  public class SaveImageViewModel {
    public string InstaIdentifier { get; set; }
    public string UserName { get; set; }
    public string PictureUrl { get; set; }

  }



  public class ImageDataSetViewModel {
    public string ImageFilePath { get; set; }
    public string PictureUrl { get; set; }
    public string Identifier { get; set; }
    public string UserName { get; set; }
  }

  public enum LoginStates {
    NeedLogin,
    LogedIn,
    TwoFactorRequired
  }

}