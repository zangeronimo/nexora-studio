import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICategoryService } from '@application/culinary/contracts/category-service';
import { CreateCategoryRequest } from '@application/culinary/requests/category-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';

type Props = {
  categoryService: ICategoryService;
};

type Errors = {
  name: string;
  status: string;
};

export function useCategoryCreateForm({ categoryService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const initialState = {
    name: '',
    description: '',
    parentId: null,
    displayOrder: 0,
    status: '',
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
  };

  const [request, setRequest] = useState(initialState);
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    status: '',
  });

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
      await categoryService.create(
        new CreateCategoryRequest(
          request.name,
          request.description,
          request.displayOrder,
          request.metaTitle,
          request.metaDescription,
          request.canonicalUrl,
          request.status === '1' ? status.active : status.inactive,
        ),
      );
      toast.success(t('common.toast.success.created'));
      navigate('/culinary/categories');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDirty =
    request.name !== initialState.name ||
    request.description !== initialState.description ||
    request.parentId !== initialState.parentId ||
    request.displayOrder !== initialState.displayOrder ||
    request.status !== initialState.status;
  request.metaTitle !== initialState.metaTitle ||
    request.metaDescription !== initialState.metaDescription ||
    request.canonicalUrl !== initialState.canonicalUrl;

  return {
    request,
    errors,
    hasError,
    isDirty,
    isPristine,
    loading,
    handleSubmit,
    handleFieldChange,
  };
}
