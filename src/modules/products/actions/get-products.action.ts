import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const GetProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?limit=${limit}&offset=${page * limit}`,
    );

    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Error getting products');
  }
};
