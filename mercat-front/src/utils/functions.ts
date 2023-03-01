import { Category } from './types/Category';

export function categoryInArray(
  category: Category,
  categories: Category[] | null,
): boolean {
  if (!categories) {
    return false;
  }
  categories.forEach((c) => {
    if (category.label === c.label) {
      return true;
    }
  });
  return false;
}
