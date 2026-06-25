import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IRecipeService } from '@application/culinary/contracts/recipe-service';
import {
  CreateRecipeRequest,
  RecipeSectionRequest,
} from '@application/culinary/requests/recipe-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { Category } from '@domain/culinary/entities/category';
import { ICategoryService } from '@application/culinary/contracts/category-service';
import { Section } from '../components/recipe-sections-field';

type Props = {
  recipeService: IRecipeService;
  categoryService: ICategoryService;
};

type Errors = {
  name: string;
  status: string;
};

export function useRecipeCreateForm({ recipeService, categoryService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const emptySection = (): Section => ({
    title: '',
    ingredients: [{ description: '' }],
    steps: [{ order: 1, instruction: '' }],
  });

  const initialState = {
    name: '',
    shortDescription: '',
    fullDescription: '',
    sections: [emptySection()],
    notes: [],
    prepTime: 0,
    cookTime: 0,
    restTime: 0,
    yieldTotal: '',
    difficulty: null,
    cuisine: '',
    metaTitle: '',
    metaDescription: '',
    status: '',
    categoryId: null,
  };

  const [request, setRequest] = useState(initialState);
  const [parent, setParent] = useState<string>('');
  const [categoriesParent, setCategoriesParent] = useState<Category[]>([]);
  const [categoriesChildren, setCategoriesChildren] = useState<Category[]>([]);
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    status: '',
  });

  const getAllCategoriesParent = async () => {
    try {
      setLoading(true);
      const result = await categoryService.getAllParents();

      setCategoriesParent(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategoriesParent();
  }, []);

  const getAllCategoriesChildren = async (parentId: string) => {
    try {
      setLoading(true);
      const result = await categoryService.getAllChildren(parentId);

      setCategoriesChildren(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (parent) getAllCategoriesChildren(parent);
  }, [parent]);

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

  const handleNotesChange = (notes: string[]) => {
    setRequest((old) => ({
      ...old,
      notes,
    }));

    setIsPristine(false);
  };

  const handleSectionsChange = (sections: RecipeSectionRequest[]) => {
    setRequest((old) => ({
      ...old,
      sections,
    }));

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
      await recipeService.create(
        new CreateRecipeRequest(
          request.name,
          request.shortDescription,
          request.fullDescription,
          request.sections,
          request.notes,
          request.prepTime,
          request.cookTime,
          request.restTime,
          request.yieldTotal,
          request.difficulty,
          request.cuisine,
          request.metaTitle,
          request.metaDescription,
          request.status === '1' ? status.active : status.inactive,
          request.categoryId,
        ),
      );
      toast.success(t('common.toast.success.created'));
      navigate('/culinary/recipes');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDirty =
    request.name !== initialState.name ||
    request.shortDescription !== initialState.shortDescription ||
    request.fullDescription !== initialState.fullDescription ||
    request.sections !== initialState.sections ||
    request.notes !== initialState.notes ||
    request.prepTime !== initialState.prepTime ||
    request.cookTime !== initialState.cookTime ||
    request.restTime !== initialState.restTime ||
    request.yieldTotal !== initialState.yieldTotal ||
    request.difficulty !== initialState.difficulty ||
    request.cuisine !== initialState.cuisine ||
    request.metaTitle !== initialState.metaTitle ||
    request.metaDescription !== initialState.metaDescription ||
    request.status !== initialState.status ||
    request.categoryId !== initialState.categoryId;

  return {
    request,
    categoriesParent,
    categoriesChildren,
    errors,
    hasError,
    isDirty,
    isPristine,
    loading,
    parent,
    setParent,
    handleSubmit,
    handleFieldChange,
    handleNotesChange,
    handleSectionsChange,
  };
}
