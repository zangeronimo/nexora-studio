import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICategoryService } from '@application/culinary/contracts/category-service';
import { UpdateCategoryRequest } from '@application/culinary/requests/category-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { Category } from '@domain/culinary/entities/category';

type Props = {
  id: string;
  categoryService: ICategoryService;
};

type requestState = {
  id: string;
  name: string;
  description: string;
  parentId: string;
  displayOrder: number;
  status: string;
  metaTitle: string;
  metaDescription: string;
  featuredImageUrl: string | null;
};

type Errors = {
  name: string;
  status: string;
};

export function useCategoryUpdateForm({ id, categoryService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [initialState, setInitialState] = useState<requestState | null>(null);
  const [request, setRequest] = useState<requestState>({
    id: '',
    name: '',
    description: '',
    parentId: null,
    displayOrder: 0,
    status: '',
    metaTitle: '',
    metaDescription: '',
    featuredImageUrl: '',
  });
  const [parents, setParents] = useState<Category[]>([]);
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    status: '',
  });

  const load = async () => {
    try {
      setLoading(true);
      const category = await categoryService.getById(id);

      const nextState = {
        id: category.id,
        name: category.name,
        description: category.description,
        parentId: category.parentId,
        displayOrder: category.displayOrder,
        status: category.status.toString(),
        metaTitle: category.metaTitle,
        metaDescription: category.metaDescription,
        featuredImageUrl: category.featuredImageUrl,
      };

      setInitialState(nextState);
      setRequest(nextState);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllParents = async () => {
    try {
      setLoading(true);
      const result = await categoryService.getAllParents();

      setParents(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    getAllParents();
  }, []);

  const handleFieldChange = (name: string, value: string) => {
    setRequest((old) => ({
      ...old,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((old) => ({
        ...old,
        [name]: '',
      }));
    }

    setIsPristine(false);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true);
      const imageUrl = await categoryService.imageUpload(request.id, file);
      setRequest((old) => ({ ...old, featuredImageUrl: imageUrl }));
      toast.success(t('common.toast.success.updated'));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const nameError = validate(request.name, [
      new RequiredValidator(),
      new MaxLengthValidator(150),
    ]);

    const statusError = validate(request.status, [new RequiredValidator()]);

    const nextErrors = {
      name: nameError ? t(nameError.key, nameError.params) : '',
      status: statusError ? t(statusError.key, statusError.params) : '',
    };

    setErrors(nextErrors);

    const hasSomeError = Object.values(nextErrors).some(Boolean);

    if (hasSomeError) {
      return;
    }

    try {
      setLoading(true);
      await categoryService.update(
        new UpdateCategoryRequest(
          request.id,
          request.name,
          request.description,
          request.parentId,
          request.displayOrder,
          request.metaTitle,
          request.metaDescription,
          request.status === '1' ? status.active : status.inactive,
        ),
      );
      toast.success(t('common.toast.success.updated'));
      navigate('/culinary/categories');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDirty =
    request.name !== initialState?.name ||
    request.description !== initialState?.description ||
    request.parentId !== initialState?.parentId ||
    request.displayOrder !== initialState?.displayOrder ||
    request.status !== initialState?.status ||
    request.metaTitle !== initialState?.metaTitle ||
    request.metaDescription !== initialState?.metaDescription ||
    request.featuredImageUrl !== initialState?.featuredImageUrl;

  return {
    request,
    parents,
    errors,
    hasError,
    isDirty,
    isPristine,
    loading,
    handleSubmit,
    handleFieldChange,
    handleImageUpload,
  };
}
