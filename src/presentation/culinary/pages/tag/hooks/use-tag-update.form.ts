import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ITagService } from '@application/culinary/contracts/tag-service';
import { UpdateTagRequest } from '@application/culinary/requests/tag-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';

type Props = {
  id: string;
  tagService: ITagService;
};

type requestState = {
  id: string;
  name: string;
  description: string;
  status: string;
};

type Errors = {
  name: string;
  status: string;
};

export function useTagUpdateForm({ id, tagService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [initialState, setInitialState] = useState<requestState | null>(null);
  const [request, setRequest] = useState<requestState>({
    id: '',
    name: '',
    description: '',
    status: '',
  });
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    status: '',
  });

  const load = async () => {
    try {
      setLoading(true);
      const tag = await tagService.getById(id);

      const nextState = {
        id: tag.id,
        name: tag.name,
        description: tag.description,
        status: tag.status.toString(),
      };

      setInitialState(nextState);
      setRequest(nextState);
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
  const handleSubmit = async () => {
    const nameError = validate(request.name, [
      new RequiredValidator(),
      new MaxLengthValidator(100),
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
      await tagService.update(
        new UpdateTagRequest(
          request.id,
          request.name,
          request.description,
          request.status === '1' ? status.active : status.inactive,
        ),
      );
      toast.success(t('common.toast.success.updated'));
      navigate('/culinary/tags');
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
    request.status !== initialState?.status;

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
