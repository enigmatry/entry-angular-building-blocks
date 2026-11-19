import { ProductType } from './product-type';

/**
 * TypeScript shape of `GetProductDetails.Response` in apps/demo-app/codegen/Products/GetProductDetails.cs.
 * The `I` prefix is the generator's: it imports `I` + the C# model's declaring name.
 */
export interface IGetProductDetailsResponse {
  id: string;
  name: string;
  type: ProductType;
  description: string;
  amount: number;
  expiresOn?: Date;
  freeShipping: boolean;
}
