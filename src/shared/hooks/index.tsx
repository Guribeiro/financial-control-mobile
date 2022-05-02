import { AuthenticationProvider } from '@modules/authentication/hooks/authentication';
import { ThemeProvider } from '@shared/hooks/theme';
import { ReactNode } from 'react';
import { BillProvider } from '@modules/bills/hooks/bill';
import { ProfileProvider } from '@modules/profile/hooks/profile';
import { AlertProvider } from '@shared/hooks/alert';
import { DocumentProvider } from '@shared/hooks/document';
import { CalendarProvider } from '@modules/bills/hooks/calendar';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AuthenticationProvider>
          <DocumentProvider>
            <ProfileProvider>
              <CalendarProvider>
                <BillProvider>{children}</BillProvider>
              </CalendarProvider>
            </ProfileProvider>
          </DocumentProvider>
        </AuthenticationProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
