import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IRecipeService } from '@application/culinary/contracts/recipe-service';
import {
  RecipeSectionRequest,
  UpdateRecipeRequest,
} from '@application/culinary/requests/recipe-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { recipeDifficulty } from '@domain/culinary/enums/recipe-difficulty';
import { Category } from '@domain/culinary/entities/category';
import { ICategoryService } from '@application/culinary/contracts/category-service';
import { RecipeImportJson } from '@presentation/culinary/models/recipe-import-json';
import { mapImportedRecipeToRequest } from '@presentation/culinary/mapping/imported-recipe-to-request';

type Props = {
  id: string;
  recipeService: IRecipeService;
  categoryService: ICategoryService;
};

type requestState = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  sections: RecipeSectionRequest[];
  notes: string[];
  prepTime: number;
  cookTime: number;
  restTime: number;
  yieldTotal: string;
  difficulty: recipeDifficulty;
  cuisine: string;
  metaTitle: string;
  metaDescription: string;
  status: string;
  categoryId: string;
  category: Category | null;
  imageUrl: string | null;
};

type Errors = {
  name: string;
  status: string;
};

export function useRecipeUpdateForm({
  id,
  recipeService,
  categoryService,
}: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [initialState, setInitialState] = useState<requestState | null>(null);
  const [request, setRequest] = useState<requestState>({
    id: '',
    name: '',
    shortDescription: '',
    fullDescription: '',
    sections: [],
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
    imageUrl: '',
    categoryId: null,
    category: null,
  });
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

  const load = async () => {
    try {
      setLoading(true);
      const recipe = await recipeService.getById(id);

      const nextState = {
        id: recipe.id,
        name: recipe.name,
        shortDescription: recipe.shortDescription,
        fullDescription: recipe.fullDescription,
        sections: recipe.sections,
        notes: recipe.notes,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        restTime: recipe.restTime,
        yieldTotal: recipe.yieldTotal,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        metaTitle: recipe.metaTitle,
        metaDescription: recipe.metaDescription,
        status: recipe.status.toString(),
        imageUrl: recipe.imageUrl,
        categoryId: recipe.categoryId,
        category: recipe.category,
      };

      setInitialState(nextState);
      setRequest(nextState);
      setParent(nextState.category?.parentId ?? nextState.categoryId);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
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

  const handleImageUpload = async (file: File) => {
    try {
      setLoading(true);
      const imageUrl = await recipeService.imageUpload(request.id, file);
      setRequest((old) => ({ ...old, imageUrl }));
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
      await recipeService.update(
        new UpdateRecipeRequest(
          request.id,
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
      toast.success(t('common.toast.success.updated'));
      navigate('/culinary/recipes');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImportJson = (data: RecipeImportJson) => {
    try {
      setLoading(true);

      const importedData = mapImportedRecipeToRequest(data);
      setRequest((old) => ({
        ...old,
        name: importedData.name,
        shortDescription: importedData.shortDescription,
        fullDescription: importedData.fullDescription,
        sections: importedData.sections,
        notes: importedData.notes,
        prepTime: importedData.prepTime,
        cookTime: importedData.cookTime,
        restTime: importedData.restTime,
        yieldTotal: importedData.yieldTotal,
        difficulty: importedData.difficulty,
        cuisine: importedData.cuisine,
        metaTitle: importedData.metaTitle,
        metaDescription: importedData.metaDescription,
      }));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      setIsPristine(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDirty =
    request.name !== initialState?.name ||
    request.shortDescription !== initialState?.shortDescription ||
    request.fullDescription !== initialState?.fullDescription ||
    request.sections !== initialState?.sections ||
    request.notes !== initialState?.notes ||
    request.prepTime !== initialState?.prepTime ||
    request.cookTime !== initialState?.cookTime ||
    request.restTime !== initialState?.restTime ||
    request.yieldTotal !== initialState?.yieldTotal ||
    request.difficulty !== initialState?.difficulty ||
    request.cuisine !== initialState?.cuisine ||
    request.metaTitle !== initialState?.metaTitle ||
    request.metaDescription !== initialState?.metaDescription ||
    request.status !== initialState?.status ||
    request.categoryId !== initialState?.categoryId;

  return {
    request,
    categoriesParent,
    categoriesChildren,
    errors,
    hasError,
    isDirty,
    isPristine,
    loading,
    setParent,
    handleSubmit,
    handleFieldChange,
    handleNotesChange,
    handleSectionsChange,
    handleImageUpload,
    handleImportJson,
  };
}
