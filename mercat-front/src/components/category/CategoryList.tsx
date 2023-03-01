import { FC } from 'react';

const CategoryList: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <>
      {categories.map((category, index) => (
        <a href="#">{category}</a>
      ))}
    </>
  );
};
export default CategoryList;
