import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICompanyService } from '@application/core/contracts/company-service';
import { UpdateCompanyRequest } from '@application/core/requests/company-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';

type Props = {
  id: string;
  companyService: ICompanyService;
};

type requestState = {
  id: string;
  name: string;
  status: string;
};

type Errors = {
  name: string;
  status: string;
};

export function useCompanyUpdateForm({ id, companyService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [initialState, setInitialState] = useState<requestState | null>(null);
  const [request, setRequest] = useState<requestState>({
    id: '',
    name: '',
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
      const company = await companyService.getById(id);

      const nextState = {
        id: company.id,
        name: company.name,
        status: company.status.toString(),
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

  const handleNameChange = (value: string) => {
    setRequest((old) => ({
      ...old,
      name: value,
    }));

    setErrors((old) => ({
      ...old,
      name: '',
    }));

    setIsPristine(false);
  };

  const handleStatusChange = (value: string) => {
    setRequest((old) => ({
      ...old,
      status: value,
    }));

    setErrors((old) => ({
      ...old,
      status: '',
    }));

    setIsPristine(false);
  };

  const handleSubmit = async () => {
    const nameError = validate(request.name, [
      new RequiredValidator(),
      new MaxLengthValidator(200),
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
      await companyService.update(
        new UpdateCompanyRequest(
          request.id,
          request.name,
          request.status === '1' ? status.active : status.inactive,
        ),
      );
      toast.success(t('common.toast.success.updated'));
      navigate('/core/companies');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDirty =
    request.name !== initialState?.name ||
    request.status !== initialState?.status;

  return {
    request,
    errors,
    hasError,
    isDirty,
    isPristine,
    loading,
    handleSubmit,
    handleNameChange,
    handleStatusChange,
  };
}
