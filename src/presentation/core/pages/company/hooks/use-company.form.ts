import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICompanyService } from '@application/core/contracts/company-service';
import { CreateCompanyRequest } from '@application/core/requests/company-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';

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

  const initialState = {
    name: '',
    status: '',
  };

  const [request, setRequest] = useState(initialState);
  const [isPristine, setIsPristine] = useState(true);
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

    const hasError = Object.values(nextErrors).some(Boolean);

    if (hasError) {
      return;
    }

    await companyService.create(
      new CreateCompanyRequest(
        request.name,
        request.status === '1' ? status.active : status.inactive,
      ),
    );

    navigate('/core/companies');
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDurty = JSON.stringify(request) !== JSON.stringify(initialState);

  return {
    request,
    errors,
    hasError,
    isDurty,
    isPristine,
    handleSubmit,
    handleNameChange,
    handleStatusChange,
  };
}
