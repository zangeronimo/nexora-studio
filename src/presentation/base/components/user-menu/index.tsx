import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@presentation/base/components/avatar';
import { useAuthSession } from '@presentation/base/session/use-auth-session';

import { CompanySwitcher } from './company-switcher';

import * as styles from './styles.module.scss';

export function UserMenu() {
  const navigate = useNavigate();
  const { session, handleAvatarUpload, switchCompany } = useAuthSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        className={styles.userButton}
        onClick={() => setOpen((current) => !current)}
      >
        <div className={styles.avatar}>
          <Avatar
            name={session?.userCompany?.user?.name}
            avatarUrl={session?.userCompany?.avatarUrl}
            editable
            onUpload={handleAvatarUpload}
          />
        </div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {session?.userCompany?.user?.name}
          </span>

          <span className={styles.userCompany}>
            {session?.userCompany?.company?.name}
          </span>
        </div>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Empresa</span>

            <CompanySwitcher
              session={session}
              switchCompany={switchCompany}
              onCompleted={closeMenu}
            />
          </div>

          <div className={styles.divider} />

          <button className={styles.menuItem} disabled>
            Meu Perfil
          </button>

          <div className={styles.divider} />

          <button
            className={styles.menuItem}
            onClick={() => {
              closeMenu();
              navigate('/logout');
            }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
