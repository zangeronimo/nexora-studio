import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { useToast } from '@presentation/base/toast/hooks/use-toast';

import { IUserCompanyService } from '@application/system/contracts/user-company-service';
import { CreateUserCompanyRequest } from '@application/system/requests/user-company-request';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { validate } from '@application/base/validation/validate';

type Props = {
  userCompanyService: IUserCompanyService;
};

type Errors = {
  email: string;
};

export function useUserCompanyCreateForm({ userCompanyService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const initialState = {
    email: '',
  };

  const [request, setRequest] = useState(initialState);
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    email: '',
  });

  const handleEmailChange = (value: string) => {
    setRequest((old) => ({
      ...old,
      email: value,
    }));

    setErrors((old) => ({
      ...old,
      email: '',
    }));

    setIsPristine(false);
  };

  const handleSubmit = async () => {
    const emailError = validate(request.email, [new RequiredValidator()]);

    const nextErrors = {
      email: emailError ? t(emailError.key, emailError.params) : '',
    };

    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);

    if (hasError) return;

    try {
      setLoading(true);

      await userCompanyService.create(
        new CreateUserCompanyRequest(request.email),
      );

      toast.success(t('common.toast.success.created'));

      navigate('/system/usercompanies');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);

  const isDirty = request.email !== initialState.email;

  return {
    request,
    errors,
    hasError,
    isDirty,
    isPristine,
    loading,

    handleEmailChange,
    handleSubmit,
  };
}
