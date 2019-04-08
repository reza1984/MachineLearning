export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  productTotalCount: number | null;
  productGridSettings: ProductGridSettings | null;
  error: string;
}

export interface ProductGridSettings {
  pageNumber: number;
  pageSize: number;
}
export interface ProductList {
  data: Array<Product> | null;
  total: number | null;
}

export interface CustomProperties {
  Id?: string;
}

export interface AddPictureModel {
  ProductId: number;
  PictureId: number;
  PictureUrl?: any;
  DisplayOrder: number;
  Id: number;
  CustomProperties: CustomProperties;
}

export interface AddSpecificationAttributeModel {
  SpecificationAttributeId: number;
  SpecificationAttributeOptionId: number;
  AllowFiltering?: any;
  ShowOnProductPage?: any;
  DisplayOrder: number;
  AvailableAttributes: any[];
  AvailableOptions: any[];
  CustomProperties: CustomProperties;
}

export interface CopyProductModel {
  NumberOfCopies: number;
  Name?: any;
  CopyImages: boolean;
  Published: boolean;
  Id: number;
  CustomProperties: CustomProperties;
}

export interface Product {
  Id: number;
  PictureThumbnailUrl: string;
  NoThumb: boolean;
  ProductTypeId: number;
  ProductTypeName: string;
  ProductTypeLabelHint: string;
  ProductUrl?: any;
  AssociatedToProductId: number;
  AssociatedToProductName?: any;
  VisibleIndividually: boolean;
  ProductTemplateId: number;
  AvailableProductTemplates: any[];
  Name: string;
  ShortDescription?: any;
  FullDescription?: any;
  AdminComment?: any;
  ShowOnHomePage: boolean;
  HomePageDisplayOrder: number;
  MetaKeywords?: any;
  MetaDescription?: any;
  MetaTitle?: any;
  SeName?: any;
  AllowCustomerReviews: boolean;
  ProductTags?: any;
  AvailableProductTags?: any;
  Sku?: any;
  ManufacturerPartNumber?: any;
  Gtin?: any;
  CustomsTariffNumber?: any;
  CountryOfOriginId?: any;
  AvailableCountries: any[];
  IsGiftCard: boolean;
  GiftCardTypeId: number;
  RequireOtherProducts: boolean;
  RequiredProductIds?: any;
  AutomaticallyAddRequiredProducts: boolean;
  IsDownload: boolean;
  DownloadId?: any;
  UnlimitedDownloads: boolean;
  MaxNumberOfDownloads: number;
  DownloadExpirationDays?: any;
  DownloadActivationTypeId: number;
  HasSampleDownload: boolean;
  SampleDownloadId?: any;
  HasUserAgreement: boolean;
  UserAgreementText?: any;
  IsRecurring: boolean;
  RecurringCycleLength: number;
  RecurringCyclePeriodId: number;
  RecurringTotalCycles: number;
  IsShipEnabled: boolean;
  IsFreeShipping: boolean;
  AdditionalShippingCharge: number;
  IsEsd: boolean;
  IsTaxExempt: boolean;
  TaxCategoryId: number;
  AvailableTaxCategories: any[];
  ManageInventoryMethodId: number;
  AvailableManageInventoryMethods: any[];
  StockQuantity: number;
  DisplayStockAvailability: boolean;
  DisplayStockQuantity: boolean;
  MinStockQuantity: number;
  LowStockActivityId: number;
  NotifyAdminForQuantityBelow: number;
  BackorderModeId: number;
  AllowBackInStockSubscriptions: boolean;
  OrderMinimumQuantity: number;
  OrderMaximumQuantity: number;
  QuantityStep: number;
  QuantiyControlType: number;
  HideQuantityControl: boolean;
  AllowedQuantities?: any;
  DisableBuyButton: boolean;
  DisableWishlistButton: boolean;
  AvailableForPreOrder: boolean;
  CallForPrice: boolean;
  Price: number;
  OldPrice: number;
  ProductCost: number;
  SpecialPrice?: any;
  SpecialPriceStartDateTimeUtc?: any;
  SpecialPriceEndDateTimeUtc?: any;
  CustomerEntersPrice: boolean;
  MinimumCustomerEnteredPrice: number;
  MaximumCustomerEnteredPrice: number;
  Weight: number;
  Length: number;
  Width: number;
  Height: number;
  AvailableStartDateTimeUtc?: any;
  AvailableEndDateTimeUtc?: any;
  Published: boolean;
  CreatedOn: string;
  UpdatedOn: string;
  BundleTitleText?: any;
  BundlePerItemPricing: boolean;
  BundlePerItemShipping: boolean;
  BundlePerItemShoppingCart: boolean;
  PrimaryStoreCurrencyCode?: any;
  BaseDimensionIn?: any;
  BaseWeightIn?: any;
  Locales: any[];
  SubjectToAcl: boolean;
  AvailableCustomerRoles?: any;
  SelectedCustomerRoleIds?: any;
  LimitedToStores: boolean;
  AvailableStores?: any;
  SelectedStoreIds?: any;
  NumberOfAvailableCategories: number;
  NumberOfAvailableManufacturers: number;
  NumberOfAvailableProductAttributes: number;
  AddPictureModel: AddPictureModel;
  ProductPictureModels: any[];
  AvailableDiscounts?: any;
  SelectedDiscountIds?: any;
  AddSpecificationAttributeModel: AddSpecificationAttributeModel;
  CopyProductModel: CopyProductModel;
  BasePriceEnabled: boolean;
  BasePriceMeasureUnit?: any;
  BasePriceAmount?: any;
  BasePriceBaseAmount?: any;
  AvailableMeasureWeights: any[];
  AvailableMeasureUnits: any[];
  DeliveryTimeId?: any;
  AvailableDeliveryTimes: any[];
  QuantityUnitId?: any;
  AvailableQuantityUnits: any[];
  ProductSelectCheckboxClass?: any;
  IsSystemProduct: boolean;
  SystemName?: any;
  LoadedTabs?: any;
  CustomProperties: CustomProperties;
}
