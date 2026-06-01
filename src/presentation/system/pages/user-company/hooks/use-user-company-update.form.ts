import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { useToast } from '@presentation/base/toast/hooks/use-toast';

import { IUserCompanyService } from '@application/system/contracts/user-company-service';
import { UpdateUserCompanyRequest } from '@application/system/requests/user-company-request';

import { status } from '@domain/base/enums/status';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { validate } from '@application/base/validation/validate';

type Props = {
  id: string;
  userCompanyService: IUserCompanyService;
};

type RequestState = {
  id: string;
  nickname: string;
  status: string;
};

type ViewState = {
  userName: string;
  userEmail: string;
  companyName: string;
  avatarUrl?: string;
};

type Errors = {
  nickname: string;
  status: string;
};

export function useUserCompanyUpdateForm({ id, userCompanyService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [initialState, setInitialState] = useState<RequestState | null>(null);
  const [view, setView] = useState<ViewState | null>(null);

  const [request, setRequest] = useState<RequestState>({
    id: '',
    nickname: '',
    status: '',
  });

  const [isPristine, setIsPristine] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    nickname: '',
    status: '',
  });

  const load = async (userId: string) => {
    try {
      setLoading(true);

      const userCompany = await userCompanyService.getById(userId);

      const nextState: RequestState = {
        id: userCompany.id,
        nickname: userCompany.nickname ?? '',
        status: userCompany.status.toString(),
      };

      setRequest(nextState);
      setInitialState(nextState);

      setView({
        userName: userCompany.user.name,
        userEmail: userCompany.user.email,
        companyName: userCompany.company?.name ?? '',
        avatarUrl: userCompany.avatarUrl,
      });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) load(id);
  }, [id]);

  const handleNicknameChange = (value: string) => {
    setRequest((old) => ({
      ...old,
      nickname: value,
    }));

    setErrors((old) => ({
      ...old,
      nickname: '',
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
    const nicknameError = validate(request.nickname, [new RequiredValidator()]);

    const statusError = validate(request.status, [new RequiredValidator()]);

    const nextErrors: Errors = {
      nickname: nicknameError ? t(nicknameError.key, nicknameError.params) : '',
      status: statusError ? t(statusError.key, statusError.params) : '',
    };

    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);

    if (hasError) return;

    try {
      setLoading(true);

      await userCompanyService.update(
        new UpdateUserCompanyRequest(
          request.id,
          request.nickname,
          request.status === '1' ? status.active : status.inactive,
        ),
      );

      toast.success(t('common.toast.success.updated'));
      navigate('/system/usercompanies');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isDirty =
    request.nickname !== initialState?.nickname ||
    request.status !== initialState?.status;

  const hasError = Object.values(errors).some(Boolean);

  return {
    request,
    view,

    errors,
    loading,

    isDirty,
    isPristine,
    hasError,

    handleNicknameChange,
    handleStatusChange,
    handleSubmit,
  };
}
