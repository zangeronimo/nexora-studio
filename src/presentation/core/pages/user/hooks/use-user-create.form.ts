import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IUserService } from '@application/core/contracts/user-service';
import { CreateUserRequest } from '@application/core/requests/user-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { MinLengthValidator } from '@application/base/validation/rules/min-length';

type Props = {
  userService: IUserService;
};

type Errors = {
  name: string;
  email: string;
  password: string;
  status: string;
};

export function useUserCreateForm({ userService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const initialState = {
    name: '',
    email: '',
    password: '',
    status: '',
  };

  const [request, setRequest] = useState(initialState);
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    password: '',
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

  const handlePasswordChange = (value: string) => {
    setRequest((old) => ({
      ...old,
      password: value,
    }));

    setErrors((old) => ({
      ...old,
      password: '',
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
    const emailError = validate(request.email, [
      new RequiredValidator(),
      new MaxLengthValidator(200),
    ]);
    const passwordError = validate(request.password, [
      new RequiredValidator(),
      new MinLengthValidator(8),
      new MaxLengthValidator(50),
    ]);

    const statusError = validate(request.status, [new RequiredValidator()]);

    const nextErrors = {
      name: nameError ? t(nameError.key, nameError.params) : '',
      email: emailError ? t(emailError.key, emailError.params) : '',
      password: passwordError ? t(passwordError.key, passwordError.params) : '',
      status: statusError ? t(statusError.key, statusError.params) : '',
    };

    setErrors(nextErrors);

    const hasSomeError = Object.values(nextErrors).some(Boolean);

    if (hasSomeError) {
      return;
    }

    try {
      setLoading(true);
      await userService.create(
        new CreateUserRequest(
          request.name,
          request.email,
          request.password,
          request.status === '1' ? status.active : status.inactive,
        ),
      );
      toast.success(t('common.toast.success.created'));
      navigate('/core/users');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Object.values(errors).some(Boolean);
  const isDirty =
    request.name !== initialState.name ||
    request.status !== initialState.status;

  return {
    request,
    errors,
    hasError,
    isDirty,
    isPristine,
    loading,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleStatusChange,
  };
}
