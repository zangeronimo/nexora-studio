import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { IUserCompanyService } from '@application/system/contracts/user-company-service';
import { UserCompanyRoles } from '@domain/system/entities/user-company-roles';

type Props = {
  id: string;
  userCompanyService: IUserCompanyService;
};

type ViewState = {
  userName: string;
  userEmail: string;
  companyName: string;
  avatarUrl?: string;
};

type State = {
  view: ViewState | null;
  modules: UserCompanyRoles[];
};

type Payload = {
  roles: {
    moduleid: string;
    roleid: string;
  }[];
};

export function useUserCompanyModules({ id, userCompanyService }: Props) {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState<State>({
    view: null,
    modules: [],
  });

  const load = async (userCompanyId: string) => {
    try {
      setLoading(true);

      const [userCompany, modules] = await Promise.all([
        userCompanyService.getById(userCompanyId),
        userCompanyService.getModules(userCompanyId),
      ]);

      setState({
        view: {
          userName: userCompany.user.name,
          userEmail: userCompany.user.email,
          companyName: userCompany.company?.name ?? '',
          avatarUrl: userCompany.avatarUrl,
        },
        modules,
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

  const handleRoleChange = (moduleId: string, roleId: string) => {
    setState((old) => ({
      ...old,
      modules: old.modules.map((m) =>
        m.module.id === moduleId ? { ...m, selectedRoleId: roleId } : m,
      ),
    }));
  };

  const payload = useMemo<Payload>(() => {
    return {
      roles: state.modules
        .filter((m) => m.selectedRoleId)
        .map((m) => ({
          moduleid: m.module.id,
          roleid: m.selectedRoleId!,
        })),
    };
  }, [state.modules]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await userCompanyService.updateRoles(id, payload.roles);

      toast.success(t('common.toast.success.updated'));

      navigate('/system/usercompanies');
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    view: state.view,
    modules: state.modules,

    handleRoleChange,
    handleSubmit,
  };
}
