import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { Company } from '@domain/core/entities/company';

import { ICompanyService } from '@application/core/contracts/company-service';
import { IModuleService } from '@application/core/contracts/module-service';
import { Module } from '@domain/core/entities/module';
import { GetModulesRequest } from '@application/core/requests/module-request';
import { UpdateCompanyModulesRequest } from '@application/core/requests/company-request';

type Props = {
  companyService: ICompanyService;
  moduleService: IModuleService;
};

export function useCompanyModules({ companyService, moduleService }: Props) {
  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useToast();

  const { t } = useTranslation();

  const [company, setCompany] = useState<Company | null>(null);

  const [modules, setModules] = useState<Module[]>([]);

  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const [initialModules, setInitialModules] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);

      const [companyResult, modulesResult] = await Promise.all([
        companyService.getById(id),
        moduleService.getAll(new GetModulesRequest(1, 100, 'Name')),
      ]);

      const companyModules = companyResult.modules?.map((x) => x.id) ?? [];
      setCompany(companyResult);
      setModules(modulesResult.items);
      setSelectedModules(companyModules);
      setInitialModules(companyModules);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleToggleModule = (moduleId: string) => {
    setSelectedModules((old) =>
      old.includes(moduleId)
        ? old.filter((x) => x !== moduleId)
        : [...old, moduleId],
    );
  };

  const handleSubmit = async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      const request = new UpdateCompanyModulesRequest(selectedModules);
      await companyService.updateModules(id, request);

      setInitialModules(selectedModules);
      toast.success(t('common.toast.success.updated'));
      navigate('/core/companies');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isDirty = useMemo(() => {
    return (
      JSON.stringify([...selectedModules].sort()) !==
      JSON.stringify([...initialModules].sort())
    );
  }, [selectedModules, initialModules]);

  const handleBack = () => {
    navigate('/core/companies');
  };

  return {
    company,
    modules,
    loading,
    isDirty,
    selectedModules,

    handleBack,
    handleSubmit,
    handleToggleModule,
  };
}
