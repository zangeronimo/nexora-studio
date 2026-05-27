import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICompanyService } from '@application/core/contracts/company-service';
import { CreateCompanyRequest } from '@application/core/requests/company-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';

type Props = {
  companyService: ICompanyService;
};

type Errors = {
  name: string;
  status: string;
};

export function useCompanyForm({ companyService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const initialState = {
    name: '',
    status: '',
  };

  const [request, setRequest] = useState(initialState);
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    status: '',
  });

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
      await companyService.create(
        new CreateCompanyRequest(
          request.name,
          request.status === '1' ? status.active : status.inactive,
        ),
      );
      toast.success(t('common.toast.success.created'));
      navigate('/core/companies');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDurty = JSON.stringify(request) !== JSON.stringify(initialState);

  return {
    request,
    errors,
    hasError,
    isDurty,
    isPristine,
    loading,
    handleSubmit,
    handleNameChange,
    handleStatusChange,
  };
}
