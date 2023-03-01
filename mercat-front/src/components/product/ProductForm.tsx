import { FC, useEffect, useState } from 'react';
import { CollectType, Product } from '../../utils/types/Product';
import { GrProductHunt } from 'react-icons/all';
import { useForm } from '../../utils/hooks/useForm';
import DropdownMenuForm from '../form/DropdownMenuForm';
import InputIcon from '../form/InputIcon';
import TextAreaForm from '../form/TextAreaForm';
import InputForm from '../form/InputForm';
import { Image, UploadedImage, uploadImages } from '../../utils/uploadImages';
import { useAxios } from '../../utils/hooks/useAxios';
import { useGet } from '../../utils/hooks/useGet';
import { Seller } from '../../utils/types/Seller';
import { useHistory } from 'react-router-dom';
import { Category } from '../../utils/types/Category';
import { categoryInArray } from '../../utils/functions';
import PicturesUploader from '../picture/PicturesUploader';
import NoSubscriptionModal from '../subscription/NoSubscriptionModal';
import Loading from '../Loading';

export const ProductForm: FC<{ product?: Product; updateMode: boolean }> = ({
  product,
  updateMode,
}) => {
  console.log("product form")
  const axios = useAxios();
  const history = useHistory();
  const [seller, isPending] = useGet<Seller>('/sellers/profile');

  const [canAddProduct, setCanAddProduct] = useState<boolean>(true);

  const [showNoSubscriptionModal, setShowNoSubscriptionModal] =
    useState<boolean>(false);

  useEffect(() => {
    setCanAddProduct(
      !!seller &&
        !!seller.subscription &&
        seller.subscription.max_product > seller.products.length,
    );
    setShowNoSubscriptionModal(!updateMode && !canAddProduct);
  }, [seller, updateMode, canAddProduct]);

  const [categories] = useGet<Category[]>('/categories');
  const [picturesError, setPicturesError] = useState<string | null>(null);
  const [images, setImages] = useState<(Image | UploadedImage)[]>(
    product
      ? product.images.map((image, index) => {
          return {
            src: image,
            order: index,
          };
        })
      : [],
  );

  const handleUpload = async () => {
    if (images.length !== 0) {
      setImages((prevState) => {
        return prevState.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          } else {
            return 1;
          }
        });
      });
      const res = await uploadImages(axios, images, 'v1');
      if (res) {
        setPicturesError(null);
        return res;
      } else {
        setPicturesError("Problème durant l'upload");
      }
    } else {
      setPicturesError('Pas de fichiers');
    }
  };

  const submitProduct = async () => {
    const imagesPath = await handleUpload();
    if (!imagesPath) {
      return;
    }
    if (!seller) {
      return;
    }
    const newProduct: Product = {
      _id: updateMode ? product!._id : undefined,
      name: values.name,
      price: parseFloat(values.price),
      description: values.description,
      category: values.category,
      quantity: parseInt(values.quantity),
      collectType: values.collectType as CollectType,
      images: imagesPath,
      seller: {
        id: seller._id!,
        store: seller.store,
        address: seller.address,
        zipcode: seller.zipcode,
        city: seller.city,
      },
    };
    if (updateMode) {
      axios
        .patch(`/products/${newProduct._id!}`, newProduct)
        .then(() => history.push('/compte/produits'))
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post('/products', newProduct)
        .then(() => history.push('/compte/produits'))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const initialState: Record<string, any> = product
    ? {
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        collectType: product.collectType,
      }
    : {
        name: '',
        price: 0,
        description: '',
        category: '',
        quantity: 0,
        collectType: '',
      };
  const validateForm = (values: Record<string, any>) => {
    let errors: Record<string, string> = {};
    if (values.name.trim().length === 0) {
      errors.name = 'Le nom du produit ne doit pas être vide.';
    }
    const price = parseFloat(values.price);
    if (isNaN(price)) {
      errors.price = 'Le prix doit être un nombre.';
    } else if (values.price <= 0) {
      errors.price = 'Le prix doit être supérieur ou égal à 0.';
    }
    if (values.description.length < 20) {
      errors.description =
        'La description doit au moins contenir 20 caractères.';
    }
    if (categoryInArray(values.category, categories)) {
      errors.category = 'Vous devez choisir une catégorie.';
    }
    const quantity = parseInt(values.quantity);
    if (isNaN(quantity)) {
      errors.quantity = 'Le prix doit être un nombre.';
    } else if (quantity < 0) {
      errors.quantity = 'Le prix doit être supérieur ou égal à 0.';
    }
    if (!Object.values(CollectType).includes(values.collectType)) {
      errors.collectType = 'Vous devez choisir un type de collecte.';
    }
    return errors;
  };

  const { onChange, onSubmit, errors, values } = useForm(
    submitProduct,
    initialState,
    validateForm,
  );

  return (
    <>
      {/* <div
        style={{
          position: 'relative',
          margin: '30px auto',
          width: '500px',
          height: '300px',
        }}
      >
        <PictureCropper />
      </div> */}
      {isPending && Loading}
      {seller && (
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column">
            <NoSubscriptionModal
                show={showNoSubscriptionModal}
                onHide={() => setShowNoSubscriptionModal(false)}
            ></NoSubscriptionModal>
            {updateMode ? (
                <p className="title is-3">Modifier un produit</p>
            ) : (
                <p className="title is-3">Ajouter un produit</p>
            )}
            <p className="subtitle is-5">Détails de la fiche produit</p>
            <InputIcon
                value={values.name}
                title={'Nom du produit'}
                name="name"
                onChange={onChange}
                error={errors.name}
            >
              <GrProductHunt></GrProductHunt>
            </InputIcon>
            {categories && (
                <DropdownMenuForm
                    tab={categories.map((category) => category.label)}
                    title={'Catégorie'}
                    name="category"
                    onChange={onChange}
                    value={values.category}
                    error={errors.category}
                ></DropdownMenuForm>
            )}

            <p className="subtitle is-5">Vos photos</p>
            {picturesError && <p>{picturesError}</p>}
            <PicturesUploader
                images={images}
                setImages={setImages}
                setPicturesError={setPicturesError}
            />
            <p className="subtitle is-6">
              Ajoutez des photos qui mettent en avant votre produit
            </p>

            <TextAreaForm
                value={values.description}
                title={'Description'}
                onChange={onChange}
                name="description"
                placeholder={
                  'Décrivez les principales caractéristiques de votre produit'
                }
                error={errors.description}
            ></TextAreaForm>
            <p className="subtitle is-5">Stock et prix</p>
            <InputForm
                value={values.price}
                title="Prix"
                name="price"
                placeholder="Insérez le prix"
                onChange={onChange}
                error={errors.price}
            ></InputForm>

            <InputForm
                value={values.quantity}
                title="Quantité"
                name="quantity"
                placeholder="Nombre de produits que vous voulez vendre"
                onChange={onChange}
                error={errors.quantity}
            ></InputForm>
            <p className="subtitle is-5">Type de vente</p>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Titre</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                          onChange={onChange}
                          name="collectType"
                          value={values.collectType}
                      >
                        <option value="">-</option>
                        <option value={CollectType.DELIVERY}>A livrer</option>
                        <option value={CollectType.CLICKANDCOLLECT}>
                          En click and collect
                        </option>
                      </select>
                    </div>
                  </div>
                  {errors.collectType && (
                      <p className="help is-danger">{errors.collectType}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="columns is-mobile is-centered">
              <div className="column is-one-quarter">
                <button className="button">Aperçu</button>
              </div>
              <div className="column is-one-quarter">
                <button onClick={onSubmit} className="button is-black">
                  {updateMode
                      ? 'Modifier le produit'
                      : 'Enregistrer et continuer'}
                </button>
              </div>
            </div>
          </div>
          <div className="column is-2"></div>
        </div>
      )}
    </>
  );
};
export default ProductForm;
