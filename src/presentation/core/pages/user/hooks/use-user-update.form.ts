import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IUserService } from '@application/core/contracts/user-service';
import { UpdateUserRequest } from '@application/core/requests/user-request';

import { status } from '@domain/base/enums/status';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { MinLengthValidator } from '@application/base/validation/rules/min-length';

type Props = {
  id: string;
  userService: IUserService;
};

type requestState = {
  id: string;
  name: string;
  email: string;
  password?: string;
  status: string;
};

type Errors = {
  name: string;
  email: string;
  password: string;
  status: string;
};

export function useUserUpdateForm({ id, userService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [initialState, setInitialState] = useState<requestState | null>(null);
  const [request, setRequest] = useState<requestState>({
    id: '',
    name: '',
    email: '',
    password: '',
    status: '',
  });
  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    password: '',
    status: '',
  });

  const load = async () => {
    try {
      setLoading(true);
      const user = await userService.getById(id);

      const nextState = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: '',
        status: user.status.toString(),
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
    const passwordError = request.password
      ? validate(request.password, [
          new RequiredValidator(),
          new MinLengthValidator(8),
          new MaxLengthValidator(50),
        ])
      : '';
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
      await userService.update(
        new UpdateUserRequest(
          request.id,
          request.name,
          request.email,
          request.status === '1' ? status.active : status.inactive,
          request.password,
        ),
      );
      toast.success(t('common.toast.success.updated'));
      navigate('/core/users');
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
    handleEmailChange,
    handlePasswordChange,
    handleStatusChange,
  };
}
